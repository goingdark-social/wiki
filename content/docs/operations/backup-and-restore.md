---
title: Backup and Restore
weight: 10
toc: true
reading_time: false
pager: false
---

### What is backed up

- PostgreSQL databases.
- Redis snapshots.
- Media stored in R2.
- Configuration files.

### Schedule and retention

Daily encrypted backups retained for 30 days. Weekly backups kept for 6 months.

### Restore

Test restores run quarterly. Our target is to restore service within 4 hours of a failure.

### Offsite copies

Backups replicate to a separate R2 bucket and a physical drive held by the admin team. Credentials are stored in a hardware password vault.

