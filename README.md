# Going Dark Wiki

Community wiki for [goingdark.social](https://goingdark.social).
Built with [Hugo](https://gohugo.io) and the Hugo Blox documentation theme.
The site loads in dark mode by default, and you can switch themes from the header.

## Local development

Install the extended version of Hugo and run:

```shell
hugo server
```

The site runs at `http://localhost:1313`.

## Linting

[Vale](https://vale.sh) checks the docs with project-specific rules in `.vale/Project` along with the Write Good, Microsoft, and Google packages. These rules cover Fediverse terms, require alt text, and prefer code formatting for handles. Run `vale sync` once to download the external packages, then `vale .` before committing. The workflow runs on each push and pull request, linting all Markdown files in `content/` and the root README.

## Deployment

Commits to `main` deploy to GitHub Pages via the included workflow.

## Funding

The server runs at home, and we cover the costs personally. Help keep it running at <https://ko-fi.com/goingdark>.

