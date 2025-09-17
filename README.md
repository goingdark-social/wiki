# Going Dark Wiki

community wiki for [goingdark.social](https://goingdark.social).
We built this with [Hugo](https://gohugo.io) and the Hugo Blox theme.
The site loads in dark mode by default, and you can switch themes from the header.

## Navigation

The HugoBlox documentation sidebar handles all navigation for us. We keep it focused on section-level pages by setting `docs.sidebar.depth` to `1` in `config/_default/params.yaml`, and we rely on the theme for the responsive menu.

## Local development

Install the extended version of Hugo and Node. Run `npm install` to grab the local build tools like Tailwind and Pagefind so everything stays inside this repository. The commands below add `node_modules/.bin` to your path so Hugo and Pagefind work the same way as the workflow.

```shell
npm install
PATH="$PWD/node_modules/.bin:$PATH" hugo server
```

The site runs at `http://localhost:1313`. Keeping the local `node_modules/.bin` directory on your path lets Hugo find the Tailwind binary while it watches for changes.

## Testing

All pull requests are automatically validated through comprehensive testing. You can run the same tests locally:

```shell
# Run all validation tests
npm run test

# Or run the test script directly
./scripts/test-pr.sh
```

This validates Hugo builds, search index generation, site structure, and content quality.

## Linting

[Vale](https://vale.sh) checks our writing. It has project rules in `.vale/Project`, friendly rules in `.vale/friendly`, and the Alex and Write Good packages. They cover Fediverse terms, encourage casual language, require alt text, and prefer code formatting for handles. Docs in `content/docs/legal/` are excluded.

1. Run `vale sync` once to download the external packages.
2. Install the `pre-commit` tool with `pre-commit install`.
3. It runs `vale` on staged Markdown files.

Use `pre-commit run --files path/to/file.md` to lint a file manually. The workflow still lints all Markdown files in `content/` and the root README on each push and pull request.

## Deployment

Commits to `main` publish to GitHub Pages through the included workflow.

## Funding

The server runs at home, and personal funds pay the hosting costs. Help keep it running at <https://ko-fi.com/goingdark>.

