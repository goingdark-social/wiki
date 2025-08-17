---
title: Hosting Architecture
weight: 20
toc: true
reading_time: false
pager: true
---

goingdark.social runs on Talos-managed Kubernetes.

- **Storage:** Media files in R2 bucket `gds-media` (public). Backups in R2 bucket `gds-backups` (private).
- **Database:** PostgreSQL with PgBouncer connection pooling.
- **Cache and queues:** Redis.
- **Search:** Elasticsearch.
- **Backups:** Automated snapshots stored offsite.

Public endpoints are the web interface and API. Internal services stay on private networks.

The server runs on home hardware. It works reasonably well but has tradeoffs. A move to a provider happens when donations cover at least three months of costs to avoid any shutdown risk due to lack of funds.

