---
title: Spam
weight: 160
toc: true
reading_time: false
pager: true
---

# Spam playbook

## Scope
Covers unsolicited bulk messages or repetitive content.  
Linked rule: [Rule 5 - No spam](/docs/policies/rules/05_no-spam/).

## Immediate actions
- Delete spam posts.  
- Suspend accounts for persistent spam.

## Evidence to collect
- Account ID, post URLs, sample messages.

## Decision matrix
- First offense -> warn -> limit.  
- Persistent spam -> suspend.

## User notice template
"Spam isn't allowed. Your account is now limited."

## Federation actions
Silence or block servers that frequently send spam. Use 'Silence' for domain-wide blocks only.

## Logging
Record in moderation log with category = Spam.

## Appeals
Appeals require proof messages were solicited.

## Retention
Evidence retained for 90 days.
