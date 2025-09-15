# Going Dark Wiki

community wiki for [goingdark.social](https://goingdark.social).
We built this with [Hugo](https://gohugo.io) and the Hugo Blox theme.
The site loads in dark mode by default, and you can switch themes from the header.

## Local development

Install the extended version of Hugo, Node, and the Tailwind command line interface package. The theme builds its styles with Tailwind, so the interface has to be on your path.

```shell
npm install -g tailwindcss @tailwindcss/cli
hugo server
```

The site runs at `http://localhost:1313`.

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

