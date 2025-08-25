---
title: "Current infrastructure costs"
weight: 30
toc: true
reading_time: false
pager: true
---

Last updated: 2025 Aug 25

## What we pay each month

Running a quiet Mastodon server still comes with a tab. Right now the core bill is three parts:

* **Hetzner compute:** one CX22 control node and one CX22 worker. They cost €4.11 each, so together they land at **€8.22 per month**.
* **CSI volumes:** we keep 30 GB for the database and logs. At €0.044 per GB that's **€1.32 per month**.
* **Cloudflare R2 storage:** roughly 300 GB of media stored at $0.015 per GB, which is about **$4.50 per month**.

All in, the cluster idles at **€9.54 + $4.50** each month.

When the timeline wakes up the autoscaler adds CX22 workers. Most bursts level out at two or three workers total, nudging the Hetzner slice toward **€16.44 per month** while the rush lasts.

If you'd like to help cover those costs, we keep a tip jar at [Ko-fi](https://ko-fi.com/goingdark). Every bit keeps the server independent.

## Our goals

We aim for a straightforward setup: pay little when quiet, add capacity only when people need it, and manage everything with Talos and GitOps so we can rebuild the stack anytime.

## Where we're at today

Mastodon currently lives on a small Talos cluster in the homelab. There's one control plane node and one worker. Cilium handles networking over WireGuard, Argo CD keeps things in sync, and Bitwarden supplies secrets. App data sits on local disks with backups off the box. Media files head to R2 and add up to about 300 GB. Outside of power, that's the only real cost right now.

## Where donations go

During the homelab phase donations mostly pay the R2 bill, about $4.50 each month. Once we move to Hetzner, that changes. One control node and one worker add up to about €8.22 a month. Their 30 GB of volumes tack on another €1.32. R2 stays the same. If the autoscaler spins up two more CX22 workers during busy hours, that can double the compute cost while they run. Donations let us keep that headroom. If support drops, we scale back until the math works again.

## Looking toward Hetzner

The plan is a small footprint in the HEL1 region: one fixed CX22 for control, one fixed CX22 worker, and an autoscaler group that can add two more on demand. We'll layer in Cilium, encrypted volumes, metrics, Prometheus CRDs, Gateway API, and External Secrets. When all three workers are online with the control node, the compute line sits near **€16.44 per month**.

## Getting ready to move

We'll switch over only after the Hetzner test cluster proves itself. It needs a day of clean health, verified networking, working autoscaling, and restored database snapshots. We'll also test HTTPRoutes and TLS behind Cloudflare or a public IP. On move day we'll freeze deploys, snapshot Postgres and Redis, bring Mastodon up in read-only mode on Hetzner, run one last sync, switch DNS or Tunnel routes, and watch latency and queues for an hour. The homelab will stay up for a day as a fallback.

## Handling busy times

One worker stays on at all times. The Cluster Autoscaler watches for trouble with these settings:

```
scale-down-delay-after-add = 5m
scale-down-delay-after-delete = 1m
scale-down-unneeded-time = 3m
```

It adds a node when pods sit pending for CPU or memory, when workers run over 70% CPU or 80% memory for five minutes, when the Sidekiq queue tops 500 jobs, or when web p95 latency goes over 400 ms while pods have CPU requested. Once things calm down (no pending pods, workers under 40% CPU and 60% memory, Sidekiq under 50 jobs and dropping, web p95 under 200 ms) the extra nodes disappear.

Horizontal Pod Autoscalers keep the pod counts tidy. Web pods scale between two and eight replicas at 60% CPU. Streaming pods run one to four at the same target. Sidekiq starts with two workers and adds another for every 300 jobs until a node fills up, which then nudges the Cluster Autoscaler. The ingress proxy sticks to two replicas. We cap day to day use at three workers; a short jump to four needs a quick PR and falls back after a day.

## Where your photos live

Media sits in Cloudflare R2. We're well under the 1 TB ceiling we set for ourselves, so the standard tier works fine. The monthly bill follows this formula:

```
R2_cost = 0.015 * storage_GB + 0.015 * egress_GB + 0.36 * (GET_requests / 1_000_000)
```

Requests are cheap; storage and egress drive the total. We'll switch to a self-managed MinIO setup if we store a terabyte for two months straight or if R2 costs more than running a dedicated box with room to grow.

Moving would look like this: provision a server with fast NVMe, deploy MinIO with TLS and versioning, sync R2 to it with `rclone`, dual write for a day, point Mastodon at MinIO while keeping R2 read only for a week, then decide whether to retire R2 or move it to cold storage.

Hetzner volumes cost €0.044 per GB each month. Our baseline is a 20 GB Postgres volume (about €0.88) and a 10 GB logs volume (about €0.44). Each extra gig adds €0.044.

## When we might buy a bigger box

At some point a dedicated worker server becomes cheaper. The rough break-even for always-on CX22 nodes is:

```
CX22_count_break_even = D / 4.11
```

If a server costs 35 EUR a month, nine CX22 instances running 24/7 would match that price. We'll move sooner if high CPU slows the site, pods need more than 4 GB of RAM, the app craves high IOPS local storage, or background jobs keep the cluster busy. A good middle ground is one AX class server doing the heavy lifting with a couple of CX22 instances for bursts.

## In short

Right now we run on a homelab Talos cluster with about 300 GB of media in R2. We're aiming for a lean Hetzner setup that keeps one worker online and briefly adds two more when folks show up. Idle compute costs around €8.22 each month, storage adds a little over €1 on Hetzner and about $4.50 on R2, and autoscaling saves us from paying for idle gear. We'll stay with R2 until a terabyte of media or a rising bill nudges us to host our own MinIO. If you enjoy the space and want to chip in, [Ko-fi](https://ko-fi.com/goingdark) keeps the lights on.
