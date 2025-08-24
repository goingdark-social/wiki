## Community Overview

Going Dark is a welcoming Mastodon community located in the EU, designed for adults seeking a friendly, low drama environment. The community emphasizes interests in privacy, digital rights, and technology, while being inclusive of all individuals. Our wiki serves as a resource for clear, friendly explanations of community operations.

## Project Purpose

This wiki provides user guides, community rules, moderator playbooks, and legal information. The tone should be inviting and calm, ensuring newcomers feel at home.

## Voice and Tone Guidelines

- Write as if you are a helpful neighbor.
- Utilize short sentences and everyday language.
- Target an eighth grade reading level.
- Use contractions (don’t, isn’t, can’t).
- Favor active voice.
- Communicate with kindness and clarity.
- Assume positive intentions from all users.
- Reports should be made **in-app** only; don't suggest DMs or email for reporting issues.
- Appeals must also be conducted **in-app**.
- Legal pages should contain a single legal contact address; don't list emails on other pages.
- Feature ideas and inquiries should be directed to **GitHub Discussions**: [https://github.com/goingdark-social/wiki/discussions](https://github.com/goingdark-social/wiki/discussions). Casual conversations are welcome, but decisions should occur in Discussions.

## Documentation Standards

Include the following front matter for every document:

```yaml
---
title: "Title"
weight: 10
toc: true
reading_time: false
pager: true
---
```

Adhere to these writing rules:

- Use sentence case for all headings.
- Define terms upon their first use.
- Avoid jargon and slang unless those terms are defined.
- Prefer internal links over external tracking links.
- Break lengthy sections into shorter segments or lists.
- Provide descriptive alt text for all images.
- Precede sensitive examples with `CW:`.
- Format usernames, file paths, and commands as inline code.
- Use a hyphen `-`, two hyphens `--`, or parentheses instead of em dashes or Unicode dashes.
- Refer to the moderation action as “Limit” instead of “Silence”.

## Accuracy and Scope Maintenance

Keep all pages current. When community behavior alters, ensure the relevant page is updated. Avoid duplicating policies; link to the source document instead.

## Verification Before Merging Changes

- **Vale:** Run on each modified file and resolve issues until achieving **0 errors and 0 warnings**.

  ```shell
  pre-commit run --files path/to/file.md
  ```
- **Build:** Verify that the site compiles using Hugo extended version 0.134.1 or later.

## Contribution Process

- Initiate a GitHub Discussion for suggestions or significant changes.
- Submit a focused pull request linking to the related Discussion.
- Maintain clarity in commit messages and use the imperative mood ( `docs: clarify appeals flow`).

## Language and Style Checks

- Always write out “for example” instead of abbreviations like `e.g.`.
- Use “information” instead of “info”.
- Avoid ambiguous terms like “may” and “might”; be precise.
- If a necessary term causes issues with Vale ( new terminology or hyphenation), pause and request its addition to the allowed list. Current rules should be considered accurate until officially approved.