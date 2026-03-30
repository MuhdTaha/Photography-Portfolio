// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
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