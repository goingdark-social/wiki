## Community overview

Going Dark is a welcoming Mastodon community located in the EU, designed for adults seeking a friendly, low drama environment. The community emphasizes interests in privacy, digital rights, and technology, while being inclusive of all individuals. The wiki serves as a resource for clear, friendly explanations of community operations.

## Project purpose

The wiki provides user guides, community rules, moderator playbooks, and legal information. The tone should be inviting and calm, ensuring newcomers feel at home.

## Voice and tone guidelines

Write like a helpful neighbor. Keep sentences short, use everyday language, and aim for an eighth grade reading level. Use contractions, favor active voice, and communicate with kindness and clarity. Assume everyone means well. Reports and appeals happen **in-app**; don’t suggest DMs or email. Legal pages list a single contact address. Feature ideas belong in **GitHub Discussions**: [https://github.com/goingdark-social/wiki/discussions](https://github.com/goingdark-social/wiki/discussions). Casual chat is fine elsewhere, but decisions live in Discussions.

## Documentation standards

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

Use sentence case for headings and define terms the first time they appear. Avoid jargon or slang unless you explain it. Prefer internal links over external tracking links. Break long stretches into shorter segments, and add descriptive alt text to images. Precede sensitive examples with `CW:`. Format usernames, file paths, and commands as inline code. Use a hyphen `-`, two hyphens `--`, or parentheses instead of em dashes or Unicode dashes. Refer to the moderation action as “Limit” instead of “Silence”.

## Accuracy and scope maintenance

Keep pages current. When community behavior changes, update the relevant page. Link to the source document instead of duplicating policies.

## Verification before merging changes

Run Vale on each modified file and resolve issues until you reach **0 errors and 0 warnings**:

```shell
pre-commit run --files path/to/file.md
```

Then verify the site compiles using Hugo extended version 0.134.1 or later.

## Contribution process

Start a GitHub Discussion for suggestions or significant changes. Submit a focused pull request that links to the related discussion. Keep commit messages clear and use the imperative mood (`docs: clarify appeals flow`).

## Language and style checks

Always write out “for example.” Use “information” instead of the word `info`, and choose precise terms over ambiguous ones like `may` or `might`. If a necessary term triggers Vale because it’s new terminology or an unusual hyphenation, pause and request its addition to the allowed list. Treat current rules as accurate until they’re officially updated.
