---
title: Inauthentic behavior
weight: 90
toc: true
reading_time: false
pager: true
---

# Inauthentic behavior playbook

## Scope
Covers coordinated or deceptive actions to mislead users.  
Linked rule: [Rule 9 - Honest identity](/docs/policies/rules/09_honest-identity/).

## Immediate actions
- Limit reach of suspected networks.
- Suspend accounts for clear manipulation.

## Evidence to collect
- Account IDs, related domains, coordination signals.

## Decision matrix
- Minor coordination → warn → limit.
- Clear deception → suspend.

## User notice template
"Coordinated manipulation isn't allowed. Your account was restricted."

## Federation actions
Limit or block networks engaging in manipulation.

## Logging
Record in moderation log with category = Inauthentic behavior.

## Appeals
Operators may appeal with proof of authenticity.

## Retention
Evidence retained for 90 days.
