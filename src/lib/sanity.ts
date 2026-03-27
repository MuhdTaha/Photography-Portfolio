import { sanityClient } from "sanity:client";

export const client = sanityClient;

export async function getPhotos() {
  // This "GROQ" query asks Sanity for all documents of type 'photo'
  // and specifically grabs the Cloudinary URL from the nested object
  const query = `*[_type == "photo"]{
    title,
    category,
    featured,
    "imageUrl": image.derived[0].secure_url || image.secure_url
  }`;
  
  return await sanityClient.fetch(query);
}