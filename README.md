# Going Dark Wiki

Community wiki for [goingdark.social](https://goingdark.social).
Built with [Hugo](https://gohugo.io) and the Hugo Blox documentation theme.

## Local development

Install the extended version of Hugo and run:

```bash
hugo server
```

The site will be served at `http://localhost:1313`.

## Linting

[Vale](https://vale.sh) checks the docs for style issues. Run `vale .` before committing. The workflow runs on each push and pull request.

## Deployment

Commits to `main` deploy to GitHub Pages via the included workflow.

