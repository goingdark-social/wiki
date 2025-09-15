# Going Dark Wiki
Going Dark Wiki is a Hugo-based documentation website for the goingdark.social Mastodon community. Built with Hugo extended and the HugoBlox documentation theme, using Tailwind CSS for styling.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively
- Bootstrap, build, and test the repository:
  - Download Hugo extended: `curl -L https://github.com/gohugoio/hugo/releases/download/v0.150.0/hugo_extended_0.150.0_linux-amd64.tar.gz | tar -xz hugo && chmod +x hugo`
  - Install Node.js dependencies: `npm init -y && npm install tailwindcss @tailwindcss/cli @tailwindcss/typography`
  - Install Vale for linting: `go install github.com/errata-ai/vale/v3/cmd/vale@latest`
  - Install pre-commit: `pip install pre-commit && pre-commit install`
- Build the site:
  - Development build: `PATH="$PWD:$PATH" hugo` -- takes 2 seconds. NEVER CANCEL.
  - Production build: `PATH="$PWD:$PATH" HUGO_ENVIRONMENT=production hugo --minify` -- takes 7 seconds on first run (includes module download). NEVER CANCEL. Set timeout to 15+ minutes.
- Run the development server:
  - `PATH="$PWD:$PATH" hugo server --bind 0.0.0.0 --port 1313` -- starts in 2 seconds. Site available at http://localhost:1313
- Generate search index (for production):
  - `npx pagefind --source "public"` -- takes 4 seconds. NEVER CANCEL.

## Validation
- Always run through at least one complete end-to-end scenario after making changes:
  - Navigate to homepage at http://localhost:1313
  - Click "Read the docs" button to verify documentation loads
  - Test navigation between different documentation sections
  - Verify search functionality if applicable
- ALWAYS test linting before committing:
  - Setup: `export PATH="$HOME/go/bin:$PATH"`
  - Single file: `vale README.md` -- takes 0.5 seconds per file
  - Pre-commit: `pre-commit run --files path/to/file.md` -- takes 0.6 seconds
  - Vale sync (first time): `vale sync` -- takes 0.1 seconds
- ALWAYS run production build to verify deployment readiness:
  - Clean and rebuild: `rm -rf public && PATH="$PWD:$PATH" HUGO_ENVIRONMENT=production hugo --minify`
  - Generate search index: `npx pagefind --source "public"`

## Dependencies and Timing
- **Hugo extended version 0.150.0+** (REQUIRED) - Download from GitHub releases
- **Node.js 20+ with npm** - For Tailwind CSS tooling  
- **Go 1.24+** - For Vale installation
- **Python 3 with pip** - For pre-commit hooks

**Timing expectations:**
- Development build: 2 seconds - NEVER CANCEL, use 30+ second timeout
- Production build: 7 seconds (first run with modules) - NEVER CANCEL, use 15+ minute timeout
- Development server startup: 2 seconds - NEVER CANCEL
- Search index generation: 4 seconds - NEVER CANCEL, use 5+ minute timeout
- Vale linting per file: 0.5 seconds - NEVER CANCEL
- Pre-commit linting: 0.6 seconds - NEVER CANCEL

## Critical Build Requirements
- **Tailwind CSS dependencies MUST be installed locally** in project root: `npm install tailwindcss @tailwindcss/cli @tailwindcss/typography`
- **Hugo binary MUST be in PATH** or use `PATH="$PWD:$PATH"` prefix
- **Vale MUST be in PATH** for linting: `export PATH="$HOME/go/bin:$PATH"`
- Build will fail without these dependencies - they are NOT optional

## Linting Requirements  
- Vale configuration in `.vale.ini` with custom Project rules
- ALWAYS run `vale sync` once before first use
- Pre-commit hooks automatically run Vale on markdown files
- CI workflow requires zero errors and zero warnings
- Manual linting: `vale path/to/file.md`
- Batch linting: `pre-commit run --files path/to/file.md`

## Common tasks
The following are outputs from frequently run commands. Reference them instead of viewing, searching, or running bash commands to save time.

### Repository structure
```
.
├── .github/           # GitHub workflows and copilot instructions
├── .vale/             # Vale linting rules and packages
├── assets/            # Theme assets (minimal, mostly in Hugo modules)
├── config/            # Hugo configuration files
├── content/           # Markdown content files
├── hugo               # Hugo binary (after download)
├── layouts/           # Custom layout overrides
├── package.json       # Node.js dependencies for Tailwind
├── static/            # Static assets
├── go.mod             # Hugo modules configuration
└── public/            # Generated site output (after build)
```

### Key files
- `.vale.ini` - Vale linting configuration with custom rules
- `config/_default/hugo.yaml` - Main Hugo configuration
- `go.mod` - Hugo modules (HugoBlox theme)
- `.github/workflows/publish.yaml` - Deployment workflow
- `.github/workflows/vale.yml` - Linting CI workflow
- `.pre-commit-config.yaml` - Git hooks configuration

### Common file patterns
- Documentation: `content/docs/section/page.md`
- User guides: `content/docs/user/*.md`
- Policies: `content/docs/policies/*.md`
- Moderation: `content/docs/mods/*.md`

### Vale linting results (typical)
```bash
vale content/docs/user/getting-started.md
# Output shows errors for spelling, style, and formatting issues
# Always resolve to 0 errors, 0 warnings before committing
```

### Development server output
```bash
PATH="$PWD:$PATH" hugo server --bind 0.0.0.0 --port 1313
# Server starts at http://localhost:1313
# Watch mode enabled for live reloading
# Built in ~2 seconds with 98 pages
```

### Production build output  
```bash
PATH="$PWD:$PATH" HUGO_ENVIRONMENT=production hugo --minify
# Downloads Hugo modules on first run (~5 seconds)
# Builds and minifies site (~2 seconds)
# Total: 98 pages, 5 processed images, 1 static file
```

## Deployment
- Commits to `main` trigger automatic deployment via GitHub Actions
- Workflow uses Hugo 0.150.0, Node.js 22, and Tailwind CSS CLI
- Build includes search index generation with Pagefind
- Site deploys to GitHub Pages at https://wiki.goingdark.social/

## Project Context
- **Community wiki** for goingdark.social Mastodon instance
- **Target audience**: Community members, moderators, new users
- **Content types**: Rules, guides, policies, moderation playbooks, FAQs
- **Writing style**: Conversational, welcoming, clear (see `.github/copilot_conventions.md`)
- **Dark mode default** with theme switching capability