---
title: "Cloudflare and privacy"
weight: 20
toc: true
reading_time: false
pager: true
---

This instance uses Cloudflare as a reverse proxy in front of the origin. Cloudflare ends TLS at its edge, applies shielding features, then connects to the origin over a second TLS hop.

### What this means for privacy

- **Two TLS hops:** Visitor to Cloudflare, then Cloudflare to the origin. Cloudflare sits in the middle and can read HTTP requests and responses to provide its features.
- **Edge visibility:** Features like WAF and cache require inspection at the edge. Cloudflare encrypts traffic again to the origin.
- **Edge logs:** Cloudflare keeps logs and request metadata under its policies. The origin keeps minimal logs as described on the local [Privacy](/docs/legal/privacy/) page.
- **Federation traffic:** ActivityPub server to server delivery also goes through Cloudflare. HTTP Signatures authenticate who sent a request; they don’t encrypt the body.
- **Direct messages:** Mastodon DMs aren’t end-to-end encrypted. Treat them like private forum posts, not secret messages.

### Risks and limits

- **No end to end TLS through Cloudflare:** The edge breaks the single TLS session by design.
- **Third-party dependency:** Outages, blocks, or policy changes at Cloudflare can affect availability. Their processing and retention follow Cloudflare’s terms.

### Controls in place

- **TLS mode:** Full (strict) to require valid certificates on the origin.
- **Client certificate checks:** Authenticated Origin Pulls with firewall rules so only Cloudflare reaches the origin over HTTPS.
- **Streaming connections:** Web socket connections for the streaming API pass through Cloudflare.

### Features avoided

Cloudflare runs mainly as a shield. Optional features that add inspection or storage aren’t enabled on content paths. The goal is to reduce data exposure while keeping protection.

### Mastodon specifics

- **Streaming API:** Mastodon uses long lived connections and web sockets. A dedicated subdomain for the streaming service can improve stability.
- **Media and caching:** Static media can be cached at the edge. Federation and API responses change often and usually don’t cache well.
- **Security model:** HTTP Signatures provide authenticity for federation requests. They don’t add confidentiality.

### Split traffic option

One option is to place only static media behind Cloudflare and keep API and federation on separate host names that use DNS-only. This narrows what Cloudflare inspects and caches. Any proxied host name still ends TLS at Cloudflare.

### Alternatives considered

- **Keeping the private key off Cloudflare:** That setup stores the key elsewhere, but Cloudflare still reads traffic at the edge to run HTTP features.
- **Layer 4 pass through:** Byte forwarding without HTTP inspection removes WAF and cache and doesn’t match how Mastodon serves web traffic.
- **Cloudflare Tunnel:** The origin dials out to Cloudflare. Edge visibility of HTTP content doesn’t change.

### Choice

Participation is voluntary. If Cloudflare’s role doesn’t fit personal needs, consider an instance that operates without a proxy.

### Reporting and support

- Use the in-app **Report** button for content or account issues.  
- For infrastructure or policy questions, use GitHub Discussions.
