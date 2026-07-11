// src/utils/queries.ts
const CATEGORY_TYPES = ["portraits", "nature", "automotive", "sports", "graduation", "cityscape"];
const HOMEPAGE_CATEGORY_TYPES = ["automotive", "sports", "portraits", "nature", "graduation", "cityscape"];

export const ALL_PHOTOS_QUERY = `*[_type in ${JSON.stringify(CATEGORY_TYPES)}] | order(order asc) {
  title,
  "category": coalesce(category, _type),
  order,
  image,
  "alt": title
}`;

export const HOMEPAGE_PHOTOS_QUERY = `{
  ${HOMEPAGE_CATEGORY_TYPES.map((category) => {
    return `"${category}": *[_type in ${JSON.stringify(CATEGORY_TYPES)} && lower(coalesce(category, _type)) == "${category}"] | order(featured desc, order asc)[0...2] {
    title,
    "category": coalesce(category, _type),
    order,
    featured,
    image,
    "alt": title
  }`;
  }).join(',\n  ')}
}`;

export const CATEGORY_PHOTOS_QUERY = `*[_type in ${JSON.stringify(CATEGORY_TYPES)} && lower(coalesce(category, _type)) == $category] | order(lower(title) asc, order asc) {
  title,
  "category": coalesce(category, _type),
  order,
  image,
  "alt": title,
  featured
}`;