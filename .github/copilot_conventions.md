## Core values

* Keep the community friendly and respectful. Privacy and good intent come first.
* Keep the service small, sustainable, and transparent.
* Be honest. If there are tradeoffs or limits, state them plainly.

## Documentation standards

* Always include standard front matter in every file:

  ```yaml
  ---
  title: "Title"
  weight: 10
  toc: true
  reading_time: false
  pager: true
  ---
  ```

* Write in short, clear sentences using plain words.

* Define terms the first time they appear.

* Avoid buzzwords and insider jargon unless explicitly defined.

* Use links relative to the site only (no external tracking parameters).

* Break long text into lists, tables, or headings instead of long paragraphs.

* Always add descriptive alt text to images.

* Include content warnings (`CW:`) for sensitive examples.

* Format handles, file paths, or commands as inline code.

* Don’t use em dashes or Unicode dashes. Use a hyphen `-`, double hyphen `--`, or parentheses.

## Verification requirements

* **Run Vale on all documentation:**

  ```shell
  pre-commit run --files path/to/file.md
  ```

* **Vale Checks**

  * After every change, run Vale on the modified files.
  * If Vale reports any errors or warnings, fix them before proceeding.
  * Repeat until Vale returns **0 errors and 0 warnings**.
  * Never stop checking until the documentation is free of errors and warnings.
  * Documentation must pass Vale checks with **zero errors and zero warnings** before commit.

* **Build Verification**
  Compile the site with Hugo extended `>= 0.134.1` to ensure it builds accurately.

* **Accuracy**
  Keep docs up to date. If behavior changes, update the docs (not just the changelog).