import {getCliClient} from 'sanity/cli'

type LegacyPhoto = {
  _id: string
  _type: 'photo'
  title?: string
  order?: number
  image?: unknown
  category?: string
  featured?: boolean
}

type MigratedPhotoDoc = {
  _id: string
  _type: 'portraits' | 'nature' | 'automotive' | 'sports'
  title: string
  order: number
  image?: unknown
  category: 'portraits' | 'nature' | 'automotive' | 'sports'
  featured: boolean
}

const VALID_CATEGORIES = new Set(['portraits', 'nature', 'automotive', 'sports'])
const DEFAULT_ORDER = 9999

function normalizeCategory(value?: string): MigratedPhotoDoc['_type'] | null {
  const normalized = value?.trim().toLowerCase()
  if (!normalized || !VALID_CATEGORIES.has(normalized)) {
    return null
  }
  return normalized as MigratedPhotoDoc['_type']
}

function buildTargetId(sourceId: string, targetType: string): string {
  const isDraft = sourceId.startsWith('drafts.')
  const baseId = isDraft ? sourceId.slice('drafts.'.length) : sourceId
  const safeBaseId = baseId.replace(/[^a-zA-Z0-9._-]/g, '_')
  return `${isDraft ? 'drafts.' : ''}migrated.${targetType}.${safeBaseId}`
}

export default async function migratePhotoTypes() {
  const args = new Set(process.argv.slice(2))
  const writeMode = args.has('--write')

  const client = getCliClient({apiVersion: '2025-01-01'})
  const legacyPhotos = await client.fetch<LegacyPhoto[]>(
    `*[_type == "photo"]{_id, _type, title, order, image, category, featured}`,
  )

  if (legacyPhotos.length === 0) {
    console.log('No legacy "photo" documents found. Nothing to migrate.')
    return
  }

  const docsToCreate: MigratedPhotoDoc[] = []
  let skippedInvalidCategory = 0

  for (const legacy of legacyPhotos) {
    const targetType = normalizeCategory(legacy.category)

    if (!targetType) {
      skippedInvalidCategory += 1
      console.warn(`Skipping ${legacy._id}: invalid category "${legacy.category ?? ''}"`)
      continue
    }

    docsToCreate.push({
      _id: buildTargetId(legacy._id, targetType),
      _type: targetType,
      title: legacy.title ?? 'Untitled',
      order: typeof legacy.order === 'number' ? legacy.order : DEFAULT_ORDER,
      image: legacy.image,
      category: targetType,
      featured: Boolean(legacy.featured),
    })
  }

  if (docsToCreate.length === 0) {
    console.log('No migratable documents found after validation.')
    return
  }

  const sample = docsToCreate.slice(0, 5).map((doc) => `${doc._id} -> ${doc._type}`)
  console.log(`Found ${legacyPhotos.length} legacy photo documents.`)
  console.log(`Prepared ${docsToCreate.length} new category documents.`)
  console.log(`Skipped ${skippedInvalidCategory} documents with invalid/missing category.`)
  console.log('Sample mappings:')
  for (const line of sample) {
    console.log(`  ${line}`)
  }

  if (!writeMode) {
    console.log('\nDry run only. No documents were written.')
    console.log('Run with --write to create documents: npm run migrate:photos')
    return
  }

  const BATCH_SIZE = 100
  let createdCount = 0

  for (let i = 0; i < docsToCreate.length; i += BATCH_SIZE) {
    const batch = docsToCreate.slice(i, i + BATCH_SIZE)
    const tx = client.transaction()

    for (const doc of batch) {
      tx.createIfNotExists(doc)
    }

    await tx.commit({autoGenerateArrayKeys: true})
    createdCount += batch.length
    console.log(`Committed ${createdCount}/${docsToCreate.length} documents...`)
  }

  console.log('\nMigration complete.')
  console.log('Legacy "photo" docs were not deleted. Verify in Studio, then clean up manually if desired.')
}

migratePhotoTypes().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
