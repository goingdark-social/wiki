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
* **CSI volumes:** Container Storage Interface volumes act as cloud disks for the database and logs. We keep 30 GB and pay **€1.32 per month** at €0.044 per GB.
* **Cloudflare R2 storage:** roughly 300 GB of media stored at $0.015 per GB, which is about **$4.50 per month**.

All in, the cluster idles at **€9.54 + $4.50** each month.

When the timeline wakes up the autoscaler, a tool that adds or removes workers based on demand, adds extra CX22 machines. Most bursts settle at two or three workers total, nudging the Hetzner slice toward **€16.44 per month** while the rush lasts.

If this space matters to you and you want to chip in, our [Ko-fi](https://ko-fi.com/goingdark) jar is open. Your support keeps the server independent.

## Our goals

We aim for a straightforward setup: pay little when quiet, add capacity only when people need it, and manage everything with Talos, a minimal OS for Kubernetes, and GitOps, meaning every change goes through a pull request we can track.

## Where we're at today

Mastodon currently lives on a small Talos cluster in the homelab. There's one control plane node and one worker. Cilium handles encrypted networking over WireGuard, Argo CD keeps things in sync, and Bitwarden supplies secrets. App data sits on local disks with backups off the box. Media files head to R2 and add up to about 300 GB. Outside of power, that's the only real cost right now.

## Where donations go

During the homelab phase donations mostly pay the R2 bill, about $4.50 each month. Once we move to Hetzner, that changes. One control node and one worker add up to about €8.22 a month. Their 30 GB of volumes tack on another €1.32. R2 stays the same. If the autoscaler spins up two more CX22 workers during busy hours, that can double the compute cost while they run. Donations let us keep that headroom. If support drops, we scale back until the math works again.

## Looking toward Hetzner

The plan is a small footprint in the HEL1 region: one fixed CX22 for control, one fixed CX22 worker, and an autoscaler group that can add two more on demand. We'll layer in Cilium, encrypted volumes, metrics, Prometheus operator bits, Gateway API, and External Secrets. When all three workers are online with the control node, the compute line sits near **€16.44 per month**.

## Getting ready to move

We'll switch over only after the Hetzner test cluster proves itself. It needs a day of clean health, verified networking, working autoscaling, and restored database snapshots. We'll also test routing and TLS behind Cloudflare or a public IP. On move day we'll freeze deploys, snapshot Postgres and Redis, bring Mastodon up in read-only mode on Hetzner, run one last sync, switch DNS or Tunnel routes, and watch latency and queues for an hour. The homelab will stay up for a day as a fallback.

## Handling busy times

One worker stays on at all times. The Cluster Autoscaler, which adds or removes workers for us, waits five minutes before scaling down after an addition, one minute after a removal, and three minutes before marking a node as unused.

If pods are left waiting, if CPU or memory stays high for about five minutes, if Sidekiq, the job queue, piles up past 500 jobs, or if web requests slow to p95 (meaning the slowest 5 percent) above 400 milliseconds, the cluster spins up another worker. When the backlog clears and usage drops under 40 percent CPU, 60 percent memory, and 50 jobs with p95 under 200 milliseconds, the extra node steps away.

Kubernetes horizontal pod autoscalers keep the pod counts tidy. Web pods scale between two and eight replicas at 60 percent CPU. Streaming pods run one to four at the same target. Sidekiq starts with two workers and adds another for every 300 jobs until a node fills up, which nudges the Cluster Autoscaler. The ingress proxy sticks to two replicas. We cap day to day use at three workers; a short jump to four needs a quick pull request and falls back after a day.

## Where your photos live

Media sits in Cloudflare R2, an object store. We're well under the one terabyte ceiling we set for ourselves, so the standard tier works fine. The bill comes out to one and a half cents per gigabyte stored, the same for data sent out, and about 36 cents per million GET requests. Storage and egress drive the total.

We'll switch to a self-managed MinIO setup, an open source server that speaks the S3 protocol, if we store a terabyte for two months straight or if R2 costs more than running a dedicated box with room to grow.

If that day comes, we'd set up a server with fast NVMe, run MinIO with TLS and versioning, sync R2 to it with `rclone`, write to both for a day, point Mastodon at MinIO while keeping R2 read only for a week, then decide whether to retire R2 or move it to cold storage.

Hetzner volumes cost €0.044 per GB each month. Our baseline is a 20 GB Postgres volume (about €0.88) and a 10 GB logs volume (about €0.44). Each extra gig adds €0.044.

## When we might buy a bigger box

At some point a dedicated worker server becomes cheaper. Divide the price of that server in euros by 4.11 to see how many always-on CX22 nodes would match it. A 35 EUR box breaks even around nine CX22 instances. We'll move sooner if high CPU slows the site, pods need more than four gigabytes of RAM, the app wants high IOPS (input/output operations per second) local storage, or background jobs keep the cluster busy. A good middle ground is one AX class server doing the heavy lifting with a couple of CX22 instances for bursts.

## In short

Right now we run on a homelab Talos cluster with about three hundred gigabytes of media in R2. We're aiming for a lean Hetzner setup that keeps one worker online and briefly adds two more when folks show up. Idle compute costs around €8.22 each month, storage adds a little over €1 on Hetzner and about $4.50 on R2, and autoscaling saves us from paying for idle gear. We'll stay with R2 until a terabyte of media or a rising bill nudges us to host our own MinIO. If you enjoy the space and want to help keep it humming, our [Ko-fi](https://ko-fi.com/goingdark) jar is always open. We're grateful for every contribution.
