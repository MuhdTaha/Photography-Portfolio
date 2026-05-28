export default {
  name: 'misc',
  type: 'document',
  title: 'Misc Photos',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Photo Title',
      description: 'The name of the photo for SEO and alt text.'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Photo',
      description: 'Upload your high-res photo.',
      options: {
        hotspot: true,
      },
    }
  ]
}