---
title: Bots / automated activity
weight: 10
toc: true
reading_time: false
pager: true
---

# Bots / automated activity playbook

## Scope
Covers unapproved bots, automation, or fake engagement.  
Linked rule: [Rule 13 - No unapproved bots](/docs/policies/rules/13_bots/).

## Immediate actions
- Suspend unapproved bots without notice.
- Warn or limit approved bots that misbehave.

## Evidence to collect
- Account ID, bot flag setting, example posts.

## Decision matrix
- Unapproved bot → suspend immediately.
- Approved but misused → warn → limit → suspend.

## User notice template
"Automated accounts require prior approval. Your bot was suspended for operating outside the policy."

## Federation actions
Limit or block noisy remote bots.

## Logging
Record in moderation log with category = Bots.

## Appeals
Bot operators may appeal with corrected proposal.

## Retention
Evidence retained for 90 days.
