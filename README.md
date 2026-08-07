# liamharte.com

Owned source for [liamharte.com](https://liamharte.com/), Liam Harte's official
personal site.

## Status

The replacement site is deployed to the VPS and its origin checks and automated
GitHub deployment have passed. Production remains on Carrd until the IONOS DNS
record is deliberately cut over and HTTPS is verified.

## Architecture

- `site/` contains the static public website.
- `server/contact-server.mjs` provides the contact form endpoint through Resend.
- `ops/` contains the Nginx, systemd and release-deployment configuration.
- `carrd-export-original/` is the 7 August 2026 pre-migration snapshot and is not
  served publicly.
- `.github/workflows/deploy.yml` verifies and publishes commits from `main` to
  the VPS after the initial server bootstrap.

## Local checks

```powershell
npm test
npm run serve
```

Then open <http://localhost:4173/>.

## Deployment state

Deployment, DNS, certificate and rollback status are recorded in
[`docs/MIGRATION.md`](docs/MIGRATION.md). Do not describe the owned version as
live until the production checks in that record have passed.
