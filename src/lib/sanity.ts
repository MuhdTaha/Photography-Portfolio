import { sanityClient } from "sanity:client";

export const client = sanityClient;

export async function getPhotos() {
  // Sanity query to fetch photos with necessary fields
  const query = `*[_type == "photo"] | order(order asc) {
    title,
    category,
    order,
    "publicId": image.public_id,
    "alt": title
  }`;
  
  return await sanityClient.fetch(query);
}