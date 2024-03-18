#!/usr/bin/bash
mkdir -p keys

if [[ $1 == "withadmin" ]] && (! [ -f keys/admin_user ] || ! [ -f keys/admin_user.pub ]); then
  echo "Generating SSH keys for admin user..."
  ssh-keygen -t ed25519 -f keys/admin_user
fi

if ! [ -f keys/util_user ] || ! [ -f keys/util_user.pub ]; then
echo "Generating SSH keys for util user..."
  ssh-keygen -t ed25519 -f keys/util_user
fi
