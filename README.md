# goingdark.social Wiki

Documentation and wiki site for **goingdark.social** - a privacy-focused Mastodon instance.

## About

This wiki provides essential information about our Mastodon instance, including:

- Server rules and community guidelines
- Privacy policy and data handling
- Getting started guides
- Community resources

## Tech Stack

- **Astro** - Static site generator
- **MDX** - Markdown with JSX components
- **react** - Lightweight React alternative for interactive components
- **Tailwind CSS** - Utility-first CSS framework

## Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navigation.astro
│   │   └── mdx/         # MDX components (Card, Callout)
│   ├── layouts/         # Page layouts
│   │   └── WikiLayout.astro
│   ├── pages/           # Wiki pages (MDX)
│   │   ├── index.mdx    # Home page
│   │   ├── rules.mdx    # Server rules
│   │   └── privacy.mdx  # Privacy policy
│   └── styles/          # Global styles
│       └── global.css
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind configuration
└── package.json
```

## Adding Content

### Creating a New Page

1. Create a new `.mdx` file in `src/pages/`
2. Add frontmatter with layout and title:

```mdx
---
layout: ../layouts/WikiLayout.astro
title: Your Page Title
---

# Your Page Title

Your content here...
```

3. Add navigation link in `src/components/Navigation.astro` if needed

### Using MDX Components

Import and use custom components in your MDX files:

```mdx
import { Callout } from '../components/mdx/Callout';
import Card from '../components/mdx/Card.astro';

<Callout type="info">
  This is an info callout
</Callout>

<Card title="Card Title" icon="🎯">
  Card content
</Card>
```

## Deployment

This site can be deployed to:

- Netlify
- Vercel
- Cloudflare Pages
- GitHub Pages
- Any static hosting service

Configure your deployment to:
- Build command: `npm run build`
- Output directory: `dist`

## License

This wiki is maintained by the goingdark.social admin team.

## Contact

- **Instance**: https://goingdark.social
- **Email**: admin@goingdark.social
- **Mastodon**: @admin@goingdark.social
