import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages configuration
  site: 'https://goingdark-social.github.io',
  base: '/wiki',
  
  integrations: [react(), mdx()],
  
  vite: {
    plugins: [tailwindcss()],
  },
  
  // Ensure proper asset handling for GitHub Pages
  build: {
    assets: '_astro'
  }
});