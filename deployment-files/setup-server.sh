#!/usr/bin/bash

# This script sets up a server to host the backend of the capstone project.
# It needs to be run with sudo privileges.
#
# This script should only have to be run once when you first log into a freshly
# allocated server

source /etc/*-release

aptInstallDeps() {
    apt update
    apt install docker docker.io docker-compose nginx -y
    snap install --classic certbot
}

setupDocker() {
    systemctl enable docker.service --now
    systemctl enable docker.socket --now
}

setupFirewallUFW() {
    ufw allow http
    ufw allow https
    ufw enable
}

setupCertbot() {
    certbot --nginx -n --agree-tos \
        -d api.transcribro.com \
        -d transcribro.com \
        -m ryan.bell62101@gmail.com
}

setupNginx() {
    cp ./transcribro.conf /etc/nginx/sites-available/
    ln -sf /etc/nginx/sites-available/transcribro.conf /etc/nginx/sites-enabled
    systemctl restart nginx.service
}

setupSiteFiles() {
    mkdir -p /var/www/transcribro
    cp -ar ./site/. /var/www/transcribro
}

if [[ $DISTRIB_ID == 'Ubuntu' ]]; then
    aptInstallDeps
    setupDocker
    setupSiteFiles
    setupFirewallUFW
    setupCertbot
    setupNginx
else
    echo "Linux distribution '$DISTRIB_ID' unsupported, please install dependencies and configure server manually."
    exit
fi

echo "In order to deploy the docker containers for the backend, you must add the docker group to your current user by running `sudo usermod -aG docker $USER` and re-login to the server to apply the docker group to your current user."
