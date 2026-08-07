# liamharte.com

Owned source for [liamharte.com](https://liamharte.com/), Liam Harte's official
personal site.

## Status

The owned site is live on the VPS. IONOS DNS points the apex domain to
`168.231.78.80`, HTTPS is enforced for the apex and `www`, and automated GitHub
deployments verify the homepage, biography page and stylesheet. The preserved
Carrd project and old DNS target remain available for rollback.

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

Deployment, DNS, certificate, verification and rollback status are recorded in
[`docs/MIGRATION.md`](docs/MIGRATION.md).

The ongoing exact-name and entity-disambiguation programme is tracked in
[`docs/IDENTITY_SEARCH.md`](docs/IDENTITY_SEARCH.md).
