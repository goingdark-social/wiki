---
title: "Current infrastructure costs"
weight: 30
toc: true
reading_time: false
pager: true
---

Last updated: 2025 Aug 25

## Current monthly cost and donate link

Even when nothing big is happening we still have a small bill.

- Hetzner compute: one CX22 control node and one CX22 worker. €4.11 each, so **€8.22 per month**.
- CSI volumes for the database and logs: **30 GB** total. €0.044 per GB, so **€1.32 per month**.
- Cloudflare R2 storage: about **300 GB** of media. $0.015 per GB, so **$4.50 per month**.

Total idle cost: **€9.54 + $4.50**.

When the timeline gets busy the autoscaler spins up extra CX22 workers. In practice we sit at two or three workers during those windows, which bumps the Hetzner total toward **€16.44 per month**.

Donate: [https://ko-fi.com/goingdark](https://ko-fi.com/goingdark)

## What we're aiming for

- Keep the idle cost low.
- Let the cluster grow when we need it and shrink when we don't.
- Manage everything with Talos and GitOps so we can repeat builds.

## Where we stand today

- Small Talos cluster on a Proxmox box at home.
- One control plane node and one worker.
- Cilium handles networking with WireGuard encryption.
- Argo CD keeps the cluster in sync. Secrets come from Bitwarden.
- App data sits on local disks. Backups live off the cluster.
- Media lives in Cloudflare R2 and is about **300 GB**.

Right now the only cost is home power.

## What donations cover

**Homelab phase**

- Personal hardware and power.
- Cloudflare R2 storage: about $4.50 per month.

**Hetzner phase at idle**

- One CX22 control node and one CX22 worker: about €8.22 per month.
- 30 GB of volumes for Postgres and logs: about €1.32 per month.
- Same R2 storage as above.

**Hetzner phase at peak**

- Autoscaler may add two more CX22 workers. That can add about €8.22 per month while those nodes run.
- Volume cost grows with size. For example, a 50 GB database volume is about €2.20 per month.

Donations through Ko-fi keep all of this going. If donations drop below the monthly bill, we would have to scale back.

## Target state on Hetzner

- Region HEL1.
- One CX22 control node.
- One base CX22 worker.
- Autoscaler pool of CX22 nodes, min 0 and max 2.

Extras include Cilium, encrypted CSI volumes, metrics, Prometheus CRDs, Gateway API, and External Secrets. At cap, three workers plus the control node cost about **€16.44 per month**.

## Migration plan

We will stand up a test cluster at Hetzner and only cut over once everything checks out.

1. Let the test cluster run for a day with no component restarts.
2. Verify networking, autoscaling, and data restore.
3. Make sure HTTPRoutes and TLS work behind Cloudflare or a public IP.
4. Freeze deploys, snapshot Postgres and Redis, and deploy Mastodon in read-only mode at Hetzner.
5. Do a final sync, switch DNS or Tunnel routes, and watch latency, errors, and queues for an hour.
6. Keep the homelab online for a day as fallback.

## How we scale compute

Goals:

- Always keep one worker on.
- Add workers fast when pods wait or queues pile up.
- Drop extra nodes soon after the rush ends.

Cluster Autoscaler settings:

```
scale-down-delay-after-add = 5m
scale-down-delay-after-delete = 1m
scale-down-unneeded-time = 3m
```

Scale out when any of these hold for a minute:

- Pods are pending for CPU or memory.
- All workers at 70% CPU or 80% memory for five minutes.
- Sidekiq queue above 500 jobs.
- Web p95 latency over 400 ms while pods have CPU requests.

Scale in when all of these hold for a few minutes:

- No pending pods.
- Average worker under 40% CPU and under 60% memory.
- Sidekiq queue under 50 jobs and falling.
- Web p95 latency under 200 ms.

Horizontal Pod Autoscalers:

- Web: 2 to 8 replicas, target 60% CPU.
- Streaming: 1 to 4 replicas, target 60% CPU.
- Sidekiq: start at 2 workers and add 1 per 300 jobs. If a node can't host more, scale nodes.
- Ingress proxy: 2 replicas.

We cap steady state at three workers. A short burst to four needs a PR and reverts after a day.

## Object storage

- Media sits in Cloudflare R2. We store about **300 GB**, well under the 1 TB limit we set for ourselves.
- Monthly R2 cost formula:

```
R2_cost = 0.015 * storage_GB + 0.015 * egress_GB + 0.36 * (GET_requests / 1_000_000)
```

Requests are cheap. Storage and egress are what matter.

We would switch to self-managed MinIO if we cross 1 TB for two months or if R2 costs more than a dedicated box with room to grow.

Migration steps:

1. Bring up a server with enough NVMe and bandwidth.
2. Deploy MinIO with TLS and versioning.
3. Sync R2 to MinIO with `rclone`.
4. Dual write for a day.
5. Point Mastodon at MinIO and keep R2 read-only for a week.
6. Shut down R2 or move it to cold storage.

For volumes:

- Hetzner charges €0.044 per GB each month.
- Postgres: 20 GB (~€0.88).
- Logs: 10 GB (~€0.44).
- Add €0.044 for each extra GB.

## When a dedicated worker makes sense

The break-even point for always-on CX22 workers is:

```
CX22_count_break_even = D / 4.11
```

If a dedicated box costs 35 EUR a month, it's cheaper than running around nine CX22 all day.

Move sooner if:

- High CPU slows the site.
- Pods need more than 4 GB RAM.
- You need high IOPS local storage.
- Background jobs keep the cluster busy.

A good path is one AX class server plus a couple of CX22 nodes for bursts.

## Summary

- Today we run on a homelab Talos cluster and store about 300 GB of media in R2.
- We plan to move to Hetzner with one control node, one base worker, and an autoscaler that often settles at two or three workers.
- Idle compute costs about €8.22 a month. Volumes add about €1.32. R2 storage adds about $4.50.
- Autoscaling lets us handle spikes without paying for idle nodes.
- We'll stay on R2 until we store 1 TB for two months or a dedicated MinIO box becomes cheaper.
- Donations at [https://ko-fi.com/goingdark](https://ko-fi.com/goingdark) keep the lights on and fund these upgrades.
