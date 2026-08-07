# VPS operations

This directory prepares the owned `liamharte.com` deployment. The migration
record is authoritative for current production status.

## Initial server bootstrap

The target is the existing VPS at `168.231.78.80`. Perform bootstrap once as
root after the source has passed local verification.

1. Create a locked deployment user and release directories.
2. Install the deployment public key for that user.
3. Copy `ops/deploy-release.sh` to a root-owned executable path available to the
   deployment user.
4. Create `/etc/liamharte-site.env` with mode `0600`. Set `RESEND_API_KEY`,
   `CONTACT_TO`, `CONTACT_FROM`, `CONTACT_PORT` and allowed origins.
5. Install `ops/systemd/liamharte-contact.service` and enable it after the first
   release exists.
6. Install `ops/nginx/liamharte-http.conf`, run `nginx -t`, then reload Nginx.
7. Add a narrow sudoers rule that permits `liamharte-deploy` to restart only
   `liamharte-contact.service` without a password.

## Pre-DNS acceptance

Use local host resolution so the public site remains on Carrd:

```bash
curl --resolve liamharte.com:80:168.231.78.80 http://liamharte.com/
curl --resolve liamharte.com:80:168.231.78.80 http://liamharte.com/about/
curl --resolve liamharte.com:80:168.231.78.80 http://liamharte.com/robots.txt
```

The contact endpoint's health URL is loopback-only:

```bash
curl http://127.0.0.1:3217/health
```

Do not send a test contact message without treating it as a real email action.

## HTTPS

The checked-in configuration is HTTP-only so it can be validated before DNS
cutover. After the DNS record points to the VPS, use Certbot to issue a
certificate for both apex and `www`, review the generated redirects and headers,
and retest Nginx before reload.

## GitHub Actions secrets

- `SSH_HOST`: `168.231.78.80`
- `SSH_USER`: the dedicated `liamharte-deploy` account
- `SSH_PRIVATE_KEY`: the matching deployment private key

Never use the existing root key as the GitHub Actions key.

