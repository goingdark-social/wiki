---
title: Hosting Architecture
weight: 20
toc: true
reading_time: false
pager: true
---

goingdark.social runs on Talos-managed Kubernetes.

- **Network:** Cilium with BGP advertising prefix 192.0.2.0/24. Load balancers expose 192.0.2.10.
- **Ingress:** Kubernetes Gateway API behind Cloudflared tunnels.
- **Storage:** Media files in R2 bucket `gds-media` (public). Backups in R2 bucket `gds-backups` (private).
- **Database:** PostgreSQL with PgBouncer connection pooling.
- **Cache and queues:** Redis.
- **Search:** Elasticsearch.
- **Backups:** Automated snapshots stored offsite.

Public endpoints are the web interface and API. Internal services stay on private networks.

