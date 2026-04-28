// Base photo schema shared by all category-specific schemas
export const createPhotoSchema = (category: string, displayName: string) => ({
  name: category,
  type: 'document',
  title: displayName,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Photo Title',
      description: 'The name of the photo for SEO and alt text.'
    },
    {
      name: 'image',
      type: 'cloudinary.asset',
      title: 'Cloudinary Image',
      description: 'Upload or select your high-res photo from Cloudinary.'
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category (Safety Check)',
      description: 'Safety check - this should always match the folder category.',
      options: {
        list: [
          { title: 'Portraits', value: 'portraits' },
          { title: 'Nature', value: 'nature' },
          { title: 'Automotive', value: 'automotive' },
          { title: 'Sports', value: 'sports' },
        ],
        layout: 'radio'
      }
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured on Homepage?',
      initialValue: false
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Lower numbers appear first (e.g., 1, 2, 3).'
    },
  ]
});
