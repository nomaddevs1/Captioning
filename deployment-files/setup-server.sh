#!/usr/bin/bash

# This script sets up a server to host the backend of the capstone project.
# It needs to be run with sudo privileges.
#
# This script should only have to be run once when you first log into a freshly
# allocated server

source /etc/*-release

aptInstallDeps() {
    apt update
    apt install docker.io docker-compose nginx -y
    snap install --classic certbot
}

setupTranscribroUser() {
    # create new user transcribro
    useradd transcribro -m
    # add user transcribro to the docker group
    usermod -aG docker transcribro
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
    # set transcribro user as owner of transcribro.conf
    chown transcribro:transcribro /etc/nginx/sites-available/transcribro.conf
    chmod 644 /etc/nginx/sites-available/transcribro.conf
    ln -sf /etc/nginx/sites-available/transcribro.conf /etc/nginx/sites-enabled
    systemctl restart nginx.service
}

setupSiteFiles() {
    mkdir -p /var/www/transcribro
    chown transcribro:transcribro /var/www/transcribro/ -R
    chmod 664 /var/www/transcribro/ -R
    cp -ar ./site/. /var/www/transcribro
}

if [[ $DISTRIB_ID == 'Ubuntu' ]]; then
    aptInstallDeps
    setupDocker
    setupTranscribroUser
    setupSiteFiles
    setupFirewallUFW
    setupCertbot
    setupNginx
else
    echo "Linux distribution '$DISTRIB_ID' unsupported, please install dependencies and configure server manually."
    exit 1
fi
