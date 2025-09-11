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

We host on Hetzner Cloud to provide reliable service for the community. All our infrastructure code is public on GitHub if you want to see how we've set things up.

