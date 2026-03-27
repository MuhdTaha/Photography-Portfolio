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
      type: 'cloudinary.asset', // This tells Sanity to use the Cloudinary picker
      title: 'Cloudinary Image',
      description: 'Upload or select your high-res photo from Cloudinary.'
    }
  ]
}