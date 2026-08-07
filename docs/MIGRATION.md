# liamharte.com Carrd migration record

**Started:** 7 August 2026  
**Current state:** Live on the owned VPS with DNS, HTTPS and production verification complete.
**Canonical production URL:** <https://liamharte.com/>

## Objective

Move Liam's personal site from Carrd to source controlled by Liam, hosted on the
existing Rephobia VPS, while preserving the existing site until the replacement
has passed local and origin-level acceptance checks.

The migration also addresses the identity-search audit in
[`../../LIAMHARTE_COM_IDENTITY_SEO_AUDIT_2026-08-07.md`](../../LIAMHARTE_COM_IDENTITY_SEO_AUDIT_2026-08-07.md).

## Decisions

- GitHub will be the source of truth under Liam's `liamharte04` account.
- The existing VPS at `168.231.78.80` will host the static site through Nginx.
- Carrd remains the production and rollback target until DNS cutover succeeds.
- The raw 7 August Carrd snapshot is stored in `carrd-export-original/` and is
  excluded from the public Nginx document root.
- The contact form is replaced with a small, same-origin Node endpoint. It uses
  the existing Resend account through a dedicated environment file and does not
  keep a message database.
- Deployment uses versioned release directories plus a `current` symlink. A
  failed contact-service restart or health check returns the symlink to the
  previous release.
- Old release deletion is deliberately manual. Automatic deployment does not
  remove rollback copies.

## Material corrections from the Carrd version

- Made `Liam Harte` the only homepage `H1` and placed it at the top of the page.
- Added separately indexable `/about/`, `/rephobia-founder/`, `/recognition/`
  and `/speaking/` pages.
- Added `ProfilePage`, `Person` and `WebSite` JSON-LD with one stable person ID.
- Added visible links to official Peter Jones Foundation, Unity, Queen's
  University Belfast and Enterprise Ireland evidence.
- Added accurate titles, descriptions, canonicals, Open Graph fields and image
  descriptions.
- Replaced the single-URL sitemap with the seven canonical public pages.
- Corrected the previous five-`H1` hierarchy and supplied alt text for meaningful
  images.
- Removed broken footer anchors and the generic Calendly destination.
- Replaced the Carrd-dependent form with a same-origin endpoint, server-side
  validation, honeypot, rate limiting and user feedback.
- Replaced inaccurate template legal content. The old terms incorrectly named
  Alex Morgan, selected Greek law and the privacy text described a nonexistent
  Liam Harte Ltd and unrelated services.

## Access verified

- Carrd: authenticated owner access confirmed for site ID `2037176693243100`.
- GitHub CLI: `liamharte04` account is authenticated but was not the active CLI
  account when work began.
- VPS: key-based root access verified with the local `rephobia_vps` key.
- VPS Nginx: active.
- VPS free disk at preflight: approximately 14 GB.
- VPS Node.js: v22.23.1.
- VPS email capability: the existing Resend API key is present; no local mail
  transfer agent is active.

## Verification status

| Check | Status |
| --- | --- |
| Raw Carrd snapshot and assets preserved | Complete |
| Static page and JSON-LD checks | Complete across eight HTML documents |
| Desktop visual review | Complete at 1440 x 1000 |
| Mobile visual review | Complete at 390 x 844 |
| Contact endpoint unit/health review | Complete without sending email |
| GitHub repository created and pushed | Complete: `liamharte04/liamharte-site` |
| VPS deploy user and release directories | Complete |
| Nginx origin configuration | Complete |
| HTTP origin test with local host resolution | Complete |
| GitHub Actions deployment | Complete: latest production workflow passed |
| HTTPS certificate and DNS cutover | Complete |
| Live metadata, links and schema recheck | Complete |
| Search Console ownership | Complete under `liamharte04@gmail.com` |
| Search Console sitemap and indexing request | Sitemap submitted; `/` and `/about/` priority requests accepted |

The workflow uses the Node 24-based v5 releases of the official checkout and
Node setup actions. This avoids the Node 20 runner deprecation warning observed
on the first successful deployment.

The live visual review exposed an initially over-broad rsync exclusion that
omitted `site/assets/`. The exclusion is now anchored to the unused repository
root folder, the assets were redeployed, and the workflow verifies the live
stylesheet as well as HTML pages so the failure cannot pass unnoticed again.

An identity-page deployment later encountered a transient timeout before its
first SSH command reached the VPS. The server remained reachable from a second
network and HTTPS stayed healthy. Deployment SSH and rsync calls now use bounded
connection attempts, explicit timeouts and keep-alives so a short network drop
does not immediately abandon a release.

## Cutover sequence

1. Pass `npm test` and local visual review.
2. Create and push the GitHub repository under `liamharte04`.
3. Bootstrap the dedicated VPS deployment user, contact service and Nginx HTTP
   configuration.
4. Deploy a release and verify it by resolving `liamharte.com` locally to the
   VPS IP without changing public DNS.
5. Configure repository deployment secrets and prove one GitHub Actions deploy.
6. Update the public DNS record from Carrd to `168.231.78.80`.
7. Issue and verify the Let's Encrypt certificate, force canonical HTTPS and
   confirm that `www` redirects to the apex host.
8. Verify the homepage, biography, legal pages, assets, headers, 404 response,
   sitemap, robots file and contact API in production.
9. Keep the Carrd project published and recoverable during the initial rollback
   window. Do not cancel the Carrd subscription as part of this migration.

## Production and rollback

IONOS authoritative DNS and the public resolver now return the production apex
`A` record `168.231.78.80` with a 60-second TTL. `www` remains a CNAME to the
apex. The other email, DKIM, DMARC and subdomain records were not changed.

The Let's Encrypt certificate covers `liamharte.com` and `www.liamharte.com`,
expires on 5 November 2026 and has a successful automatic-renewal dry run. HTTP
and HTTPS `www` requests redirect to canonical `https://liamharte.com/`.

Immediate hosting rollback is to restore the previous Carrd apex DNS target.
The pre-cutover records observed on 7 August 2026 were:

- Apex `A`: `liamharte.com` to `172.66.0.70`, TTL 60 seconds.
- `www` `CNAME`: `www.liamharte.com` to `liamharte.com`, TTL 60 seconds.
- Authoritative DNS: IONOS `ui-dns` nameservers.

A code-only rollback on the VPS uses the preceding release directory:

```bash
ln -sfn /var/www/liamharte-site/releases/RELEASE_ID /var/www/liamharte-site/current
systemctl restart liamharte-contact
```

## Remaining external actions

- Allow Google time to process the sitemap, recrawl the changed pages and
  collect initial Search Console performance data.
- Request indexing for the three new identity pages after they are deployed.
- Update controlled profiles to link to the canonical site and use consistent
  identity wording.
- Consider claiming a Google knowledge panel if one is created for Liam's
  founder entity.
- Keep Wikipedia separate from this work unless independent coverage and
  notability requirements justify an article created through normal editorial
  processes.
