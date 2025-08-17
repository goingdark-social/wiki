# Copilot conventions

## Values
- Keep the community friendly and respectful. Privacy and good intent come first.
- Keep the service small, sustainable, and transparent.
- Be honest. If there are tradeoffs or limits, say so plainly.

## Writing documentation
- Use the standard front matter:

  ```yaml
  ---
  title: "Title"
  weight: 10
  toc: true
  reading_time: false
  pager: true
  ---
  ```
- Write in short sentences with plain words. Explain terms the first time they appear.
- Avoid buzzwords and insider jargon unless you define it.
- Use site relative links. Don't add tracking parameters.
- Break information into lists or headings instead of long paragraphs.
- Add alt text to images.
- Include content warnings for sensitive examples and show the CW label.
- Format handles or commands as code.
- Don't use the em dash or similar Unicode dashes. Use a hyphen, two hyphens, or parentheses.
- Run `pre-commit run --files path/to/file.md` before committing. It lints docs with Vale.
- Build the site with the extended Hugo 0.134.1 or later to verify the docs compile.
- Keep docs accurate. When behavior changes, update the docs instead of just the changelog.
