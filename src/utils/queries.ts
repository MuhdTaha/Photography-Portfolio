// src/utils/queries.ts
export const ALL_PHOTOS_QUERY = `*[_type == "photo"] | order(order asc) {
  title,
  category,
  order,
  "imageUrl": image.derived[0].secure_url,
  "publicId": image.public_id,
  "alt": title
}`;

export const CATEGORY_PHOTOS_QUERY = `*[_type == "photo" && lower(category) == $category] | order(order asc) {
  title,
  category,
  order,
  "publicId": image.public_id,
  "alt": title
}`;