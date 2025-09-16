---
title: "Cloudflare and privacy"
weight: 20
toc: true
reading_time: false
pager: true
---

We use Cloudflare as a shield between you and our server. It's like having a security guard at the front door (helpful for protection, but it means someone else sees who's coming and going).

## What stays on our servers vs. what goes to Cloudflare

**On our servers:** Your account information, posts, direct messages, followers, and all the social networking data lives in our PostgreSQL database. We also run Redis for caching, Elasticsearch for search, and all the core Mastodon application logic.

**At Cloudflare:** Media files (your uploaded images and videos) are stored in their R2 service, and all web traffic passes through their network via Cloudflare Tunnel. They also cache some static content and make JavaScript loading faster with Rocket Loader.

**Why this split:** Storing media at Cloudflare makes uploads much faster and cheaper for us to operate, while keeping the social networking data (your posts, messages, and social graph) on infrastructure we control.

**Direct messages:** Just so there's no confusion, Mastodon DMs aren't end-to-end encrypted like Signal or WhatsApp. Think of them more like private forum messages. Anyone running the server (including us) can technically read them if needed for moderation.

## The trade-offs we're making

**Protection vs. privacy:** Cloudflare helps us stay online when someone tries to attack the server, but it means adding another company to the privacy equation. We think the protection is worth it, but we want you to know what's happening.

**Their rules, not just ours:** If Cloudflare has an outage or changes their policies, it affects everyone on Mastodon. We've set things up to minimize this risk, but we can't eliminate it entirely.

## How we've configured things

We're not using Cloudflare's fancier features that would give them even more access to your data. Think of it as using them for basic security rather than letting them cache and analyze everything.

**Security settings:** We require proper encryption between Cloudflare and our server, and we've set up authentication so only Cloudflare can reach our actual server directly.

**What we skip:** Cloudflare offers lots of analytics and content optimization features. We avoid the ones that would mean more data processing on their end.

## Why this setup for Mastodon

**Real-time connections:** Mastodon uses WebSocket connections for your live timeline updates. These long-lived connections go through Cloudflare Tunnel just like regular web traffic, and they work reliably.

**Federation quirks:** When other Mastodon servers talk to ours, those conversations go through Cloudflare too. The messages use HTTP Signatures (cryptographic signatures that prove which server sent the message), but this only provides authentication (proving who sent it), not confidentiality (hiding the content from anyone in between).

**Media files:** Your uploaded images and videos are stored in Cloudflare's R2 service, not on our servers. This makes uploads faster and cheaper for us, and the files are still only accessible to people who should see them according to your privacy settings. R2 storage doesn't change Mastodon's privacy controls.

## Other options we considered

We looked at several alternatives before choosing this setup:

**Basic traffic forwarding:** This would give Cloudflare less visibility, but we'd lose the security features that protect the community from attacks.

**Direct messages:** Just so there's no confusion (Mastodon DMs aren't end-to-end encrypted like Signal or WhatsApp). Think of them more like private forum messages. Anyone with database access can technically read them if needed for moderation. Since your posts and messages go through Cloudflare's network, they can potentially access that content as well.

## Our trust model and why we chose this setup

We've made a deliberate choice to trust Cloudflare, and there are practical reasons why: they have a strong track record on privacy, transparent policies about not selling user data, and their free tier analytics are genuinely privacy-focused (no cookies, no cross-site tracking). Using their free tier also helps keep costs manageable for a community-funded instance.

**What "trust" means on Mastodon:** We're comfortable with Cloudflare having access to web traffic and media files because they're transparent about what they do with that data (basic analytics, security protection) and what they don't do (sell it, use it for advertising, track users across sites).

**If that changes, we'll change:** If Cloudflare's policies shift in ways that don't align with our values, or if we see evidence of data misuse, we'll reevaluate and move away from them. Our infrastructure can handle that transition if needed.

**You should make your own call:** Different people have different threat models. If Cloudflare's involvement doesn't work for your privacy needs, there are other Mastodon instances that take different approaches (some avoid CDNs entirely, others use different providers, or host everything themselves on Mastodon).