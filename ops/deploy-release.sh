#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "usage: deploy-release.sh <staged-directory> <release-id>" >&2
  exit 64
fi

staged_directory="$1"
release_id="$2"
deploy_root="/var/www/liamharte-site"
release_directory="$deploy_root/releases/$release_id"
current_link="$deploy_root/current"
previous_release=""

if [[ ! "$release_id" =~ ^[0-9A-Za-z._-]+$ ]]; then
  echo "invalid release id" >&2
  exit 64
fi

if [[ ! -d "$staged_directory/site" ]] || [[ ! -f "$staged_directory/site/index.html" ]]; then
  echo "staged site is incomplete" >&2
  exit 65
fi

if [[ -L "$current_link" ]]; then
  previous_release="$(readlink -f "$current_link")"
fi

mkdir -p "$deploy_root/releases"
mv "$staged_directory" "$release_directory"
ln -sfn "$release_directory" "$current_link"

if ! sudo /usr/bin/systemctl restart liamharte-contact.service; then
  if [[ -n "$previous_release" ]]; then
    ln -sfn "$previous_release" "$current_link"
    sudo /usr/bin/systemctl restart liamharte-contact.service || true
  fi
  echo "contact service restart failed; release rolled back" >&2
  exit 70
fi

if ! curl --fail --silent --show-error http://127.0.0.1:3217/health >/dev/null; then
  if [[ -n "$previous_release" ]]; then
    ln -sfn "$previous_release" "$current_link"
    sudo /usr/bin/systemctl restart liamharte-contact.service || true
  fi
  echo "contact health check failed; release rolled back" >&2
  exit 70
fi

printf '%s\n' "$release_directory"
