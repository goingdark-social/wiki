---
title: Backup and Restore
weight: 10
toc: true
reading_time: false
pager: true
---

### What's backed up

- PostgreSQL databases
- Media stored in R2
- Configuration files live in Git

### Schedule and retention

Encrypted backups run each day and remain for 30 days. Backups run each week and stay for 6 months.

### Restore

Test restores run quarterly. The target is to restore service in 4 hours after a failure.

### Offsite copies

A separate R2 bucket and a physical drive held by the administrators store backups. A hardware password vault stores the credentials.

