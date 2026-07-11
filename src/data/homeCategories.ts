export const homeCategories = [
  {
    name: 'Automotive',
    slug: 'automotive',
    orientation: 'portrait',
    tagline: 'Lines, power, and sculpted motion',
    copy: 'Clean lines, motion, and the kind of frame that makes horsepower feel sculpted.',
  },
  {
    name: 'Sports',
    slug: 'sports',
    orientation: 'landscape',
    tagline: 'Timing that catches the decisive second',
    copy: 'Agile movement, sharp timing, and the split-second energy that turns a play into a story.',
  },
  {
    name: 'Portraits',
    slug: 'portraits',
    orientation: 'portrait',
    tagline: 'Personality just under the surface',
    copy: 'Confident, honest, and shaped around the personality that lives just under the surface.',
  },
  {
    name: 'Nature',
    slug: 'nature',
    orientation: 'landscape',
    tagline: 'Quiet light and wide open air',
    copy: 'Quiet light, wide air, and the details that make the outdoors feel cinematic.',
  },
  {
    name: 'Graduation',
    slug: 'graduation',
    orientation: 'landscape',
    tagline: 'Pride locked into a lasting frame',
    copy: 'Milestone energy, sharp pride, and the frames that lock in a chapter closing.',
  },
  {
    name: 'Cityscape',
    slug: 'cityscape',
    orientation: 'portrait',
    tagline: 'Glass, grit, and night glow',
    copy: 'Glass, grit, and night glow — the city as architecture, rhythm, and atmosphere.',
  },
] as const;

export type HomeCategorySlug = (typeof homeCategories)[number]['slug'];
export type HomeCategory = (typeof homeCategories)[number];
