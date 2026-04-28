import { sanityClient } from "sanity:client";

export const client = sanityClient;

export async function getPhotos() {
  const query = `*[_type in ["portraits", "nature", "automotive", "sports"]] | order(order asc) {
    title,
    "category": coalesce(category, _type),
    order,
    "publicId": image.public_id,
    "alt": title
  }`;
  
  return await sanityClient.fetch(query);
}