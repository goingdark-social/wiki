import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Custom domain configuration for GitHub Pages
  site: 'https://wiki.goingdark.social',
  // No base path needed with custom domain
  
  integrations: [react(), mdx()],
  
  vite: {
    plugins: [tailwindcss()],
  },
  
  // Ensure proper asset handling for GitHub Pages
  build: {
    assets: '_astro'
  }
});