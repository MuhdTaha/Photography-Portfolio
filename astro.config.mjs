// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL,
  output: 'server',
  adapter: vercel(),
  devToolbar: {
    enabled: false,
  },
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