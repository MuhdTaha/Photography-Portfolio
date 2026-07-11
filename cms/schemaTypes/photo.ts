export default {
  name: 'photo',
  type: 'document',
  title: 'Gallery Photos',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Photo Title',
      description: 'The name of the photo for SEO and alt text.'
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Lower numbers appear first (e.g., 1, 2, 3).'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Photo',
      description: 'Upload your high-res photo.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Portraits', value: 'portraits' },
          { title: 'Nature', value: 'nature' },
          { title: 'Automotive', value: 'automotive' },
          { title: 'Sports', value: 'sports' },
          { title: 'Graduation', value: 'graduation' },
          { title: 'Cityscape', value: 'cityscape' },
        ],
        layout: 'radio' // Display options as radio buttons
      }
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured on Homepage?',
      initialValue: false
    }
  ]
}