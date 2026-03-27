// @ts-check
import { defineConfig } from 'astro/config';

import sanity from '@sanity/astro';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [sanity(
    {
      projectId: 'sthyuhqk',
      dataset: 'production',
      useCdn: true,
      apiVersion: '2024-06-01',
    }
  )],

  vite: {
    plugins: [tailwindcss()]
  }
});