#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://wiki.goingdark.social';
const OUTPUT_FILE = 'public/sitemap.xml';

const docsDir = path.join(__dirname, '../src/content/docs');

function getAllMdxFiles(dir, baseDir = dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath, baseDir));
    } else if (entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
      const relativePath = path.relative(baseDir, fullPath);
      let slug = relativePath.replace(/\.(mdx|md)$/, '');

      // Handle index files - these become section pages or homepage
      if (slug.endsWith('/index') || slug === 'index') {
        slug = slug.replace(/\/index$/, '');
        if (slug === '') {
          slug = ''; // This is the homepage/index page
        }
      }

      const url = slug ? `docs/${slug}` : '';
      files.push({ url, file: relativePath });
    }
  }

  return files;
}

function generateSitemap() {
  const files = getAllMdxFiles(docsDir);

  // Deduplicate and filter
  const seen = new Set();
  const uniqueUrls = [];

  for (const f of files) {
    // Skip _index pages (these are auto-generated section pages)
    if (f.file.includes('_index')) {
      continue;
    }

    // Normalize docs/index to just homepage (empty string)
    let normalizedUrl = f.url;
    if (normalizedUrl === 'docs/index') {
      normalizedUrl = '';
    }

    if (!seen.has(normalizedUrl)) {
      seen.add(normalizedUrl);
      uniqueUrls.push({ ...f, url: normalizedUrl });
    }
  }

  const urls = uniqueUrls.map(f => {
    const loc = f.url ? `${SITE_URL}/${f.url}` : SITE_URL;
    return `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${f.url === '' ? 1.0 : 0.8}</priority>
  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  fs.writeFileSync(OUTPUT_FILE, sitemap);
  console.log(`Generated sitemap with ${uniqueUrls.length} URLs at ${OUTPUT_FILE}`);
}

generateSitemap();
