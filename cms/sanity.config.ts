import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { cloudinaryAssetSourcePlugin } from 'sanity-plugin-cloudinary'
import { cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Ali1_Visuals Portfolio',

  projectId: 'sthyuhqk',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), cloudinaryAssetSourcePlugin(), cloudinarySchemaPlugin()],

  schema: {
    types: schemaTypes,
  },
})
