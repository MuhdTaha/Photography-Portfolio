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
      type: 'cloudinary.asset', // This tells Sanity to use the Cloudinary picker
      title: 'Cloudinary Image',
      description: 'Upload or select your high-res photo from Cloudinary.'
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