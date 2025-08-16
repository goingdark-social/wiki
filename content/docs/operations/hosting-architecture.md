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

Our server is currently running on hardware in my home. This works decent but has some cons. Until we see justifications of moving it with donations atleast covering 3 months of uptime on a provider. This is to ensure that we wont need to shutdown in the future due to lack of funds.

