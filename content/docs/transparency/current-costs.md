---
title: "Current infrastructure costs"
weight: 30
toc: true
reading_time: false
pager: true
---

Last updated: 2025 Aug 25

Running Mastodon isn't free. Right now the whole setup costs about €25 to €35 each month, depending on how busy things are.

## Monthly breakdown

* **Servers:** about €15 to €20 for a small control node and a worker on Hetzner. When timelines spike, Kubernetes can spin up one or two extra workers, so the total leans toward the high end.
* **Storage:** roughly $7 to $10 to keep around 300 GB of media on Cloudflare R2. Egress is free.
* **Backups and misc:** around €3 to €5 for volumes and other odds and ends.

## How scaling works

The cluster runs Talos and Kubernetes. It keeps one worker ready and adds more when posts pile up. Busy windows usually run two or three workers, then it shrinks back as soon as things calm down.

## Why we share this

We want folks to see what it really costs to keep this place online. These numbers aren't huge, but they add up. Sharing them builds trust and shows where donations go.

## Future plans

If media climbs past a terabyte, self-hosting storage might beat paying Cloudflare every month. If the community grows enough that extra workers stay on all the time, a dedicated server could save money.

## How to help

If you'd like to keep this space humming, you can chip in at [Ko-fi](https://ko-fi.com/goingdark). Even a small donation makes a difference.

