// src/utils/queries.ts
const CATEGORY_TYPES = ["portraits", "nature", "automotive", "sports"];

export const ALL_PHOTOS_QUERY = `*[_type in ${JSON.stringify(CATEGORY_TYPES)}] | order(order asc) {
  title,
  "category": coalesce(category, _type),
  order,
  "publicId": image.public_id,
  "alt": title
}`;

export const CATEGORY_PHOTOS_QUERY = `*[_type in ${JSON.stringify(CATEGORY_TYPES)} && lower(coalesce(category, _type)) == $category] | order(order asc) {
  title,
  "category": coalesce(category, _type),
  order,
  "publicId": image.public_id,
  "alt": title,
  featured
}`;