# Capstone Deployment Files

## Hosting Overview <a name="overview"></a>

The app is currently hosted on a Vultr virtual private server (VPS). The frontend can be accessed at https://transcribro.com and the backend can be accessed at https://api.transcribro.com. The frontend is served from the `/var/www/transcribro` file directory on the VPS by an NGINX proxy on the server. The backend is running in a Docker container on the VPS and is exposed by the NGINX proxy on the server.

## Installation (Ubuntu Server) <a name="install"></a>

Provided that the owner of the repo gives the `GITHUB_TOKEN` [permission to create releases and publish packages](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository), the Docker image for the backend and the deployment files should be accessible.

### Download `deployment-files` from GitHub <a name="download"></a>

NOTE: Deployment files **MUST** be released on the GitHub repo before you can download them.

Provided that the deployment files are released on the GitHub repo, you should be able to view them at https://github.com/nomaddevs1/capstone-deployment-test/releases/tag/deployment-files. You can download the `tar.gz` compressed archive containing the files necessary for deployment by running:

```sh
wget https://github.com/nomaddevs1/capstone/releases/download/deployment-files/deployment-files.tar.gz
```

After downloading the tar archive you can extract it by running:

```sh
tar -xzvf deployment-files.tar.gz
```

## Setup <a name="setup"></a>

**IMPORTANT**: Make sure that the DNS A or AAAA records are set to point `api.transcribro.com` and `transcribro.com` to your server address before running the `setup-server.sh` script; If the DNS records don't have the correct IP address, **Certbot WILL NOT PROVIDE THE SSL CERTIFICATES**.

Navigate to the extracted `deployment-files` directory in your terminal

```sh
cd deployment-files
```

To set up the server for the first time, you can either use the convenience script `setup-server.sh` with sudo privileges or setup everything manually with the following steps. If you use the convenience script to setup the server, you can skip to the [Download SSH Keys](#download-ssh-keys) step.

### Manually Install Dependencies <a name="manual-install-dependencies"></a>

The server uses Docker, NGINX, and certbot to set the app up:

```sh
sudo apt update
sudo apt install docker.io docker-compose nginx
sudo snap install --classic certbot
```

### Manually Set Up Docker <a name="manual-setup-docker"></a>

Enable the Docker daemon and socket on the server:

```sh
sudo systemctl enable docker.service --now
sudo systemctl enable docker.socket --now
```

### Manually Set Up User <a name="manual-setup-user"></a>

Setting up a user with access to docker and site files is recommended.

Add a user `transcribro` with docker group:

```sh
sudo useradd transcribro -m
sudo usermod -aG docker transcribro
```

Generate ssh keys for user transcribro:

```sh
ssh-keygen -t ed25519 -f transcribro -C transcribro-user
```

Add the generated ssh key to authorized ssh keys for user transcribro:

```sh
sudo mkdir -p /home/transcribro/.ssh
sudo cat transcribro.pub | sudo tee -a /home/transcribro/.ssh/authorized_keys
sudo chown -R transcribro:transcribro /home/transcribro/.ssh
sudo chmod 600 /home/transcribro/.ssh/authorized_keys
```

### Manually Copy Site Files <a name="manual-copy-site-files"></a>

The site built by create-react-app is essentially just a folder of static files. The build site files have been packaged in the deployment-files folder, so we can copy them to `/var/www/transcribro` and set site file permissions by running:

```sh
sudo mkdir -p /var/www/transcribro
sudo chown -R transcribro:transcribro /var/www/transcribro/
sudo chmod -R 664 /var/www/transcribro/
sudo cp -ar ./site/. /var/www/transcribro
```

### Manually Enable Firewall <a name="manual-enable-firewall"></a>

You can set up the firewall by running:

```sh
sudo ufw allow http
sudo ufw allow https
sudo ufw allow ssh
sudo ufw enable
```

This will allow http, https, and ssh traffic in and out of the server.

### Manually Download SSL Certificates with Certbot <a name="manual-setup-certbot"></a>

**IMPORTANT**: Make sure that the DNS A or AAAA records are set to point `api.transcribro.com` and `transcribro.com` to your server address before running certbot. If the DNS records don't have the correct IP address, **Certbot WILL NOT PROVIDE THE SSL CERTIFICATES**.

```sh
sudo certbot --nginx -n --agree-tos \
        -d api.transcribro.com \
        -d transcribro.com \
        -m ryan.bell62101@gmail.com
```

### Manually Setup NGINX <a name="manual-setup-nginx"></a>

```sh
sudo cp ./transcribro.conf /etc/nginx/sites-available/
sudo rm /etc/nginx/sites-available/default
sudo ln -sf /etc/nginx/sites-available/transcribro.conf /etc/nginx/sites-enabled
sudo systemctl restart nginx.service
```

### Download SSH Keys <a name="download-ssh-keys"></a>

After running the preceding steps manually or using the `setup-server.sh` convenience script, the following tasks have been completed on the server:
- Docker, docker-compose, NGINX, and Certbot have been downloaded
- `transcribro` a user with limited permissions on the server has been created
- SSH keys for the `transcribro` user have been generated
- React site files have been copied into `/var/www/transcribro`
- SSL certificates should be installed on the NGINX proxy for `api.transcribro.com` and `transcribro.com`
- NGINX is running on the system (you should be able to see the page at https://transcribro.com at this point, but you will be unable to send requests to the API since the backend is not running yet)


Now you can copy the ssh keys for the transcribro user from the server to your local machine so you can log into the server as the transcribro user:

```sh
scp -OT <sudo-user>@<server-ip>:"~/deployment-files/transcribro ~/deployment-files/transcribro.pub" "$HOME/.ssh"
```

## Start the Backend <a name="start-backend"></a>

Log into the server as the transcribro user:

```sh
ssh transcribro@<server-ip> -i ~/.ssh/transcribro
```

Download the site-deployment files from GitHub:

```sh
wget https://github.com/nomaddevs1/capstone/releases/download/deployment-files/deployment-files.tar.gz
tar -xzvf deployment-files.tar.gz
cd deployment-files
```

And run the `start-server.sh` script, pasting in the Whisper API key when prompted:

```sh
./start-server.sh
```

This will pull the latest docker image of the backend from the GitHub Container Registry and start the container running the backend.

## Updating the App <a name="update"></a>

### Update Site Files <a name="update-site"></a>

To update the React site files, you must login as the transcribro user and then download the newest deployment files

```sh
wget https://github.com/nomaddevs1/capstone/releases/download/deployment-files/deployment-files.tar.gz
tar -xzvf deployment-files.tar.gz
cd deployment-files
```
Update the site files by running the `update-site-files.sh` script:

```sh
./update-site-files
```

### Update NGINX Configuration <a name="update-nginx"></a>

To update the NGINX configuration, you must log in as a sudo/admin user on your server and download the newest deployment files:

```sh
wget https://github.com/nomaddevs1/capstone/releases/download/deployment-files/deployment-files.tar.gz
tar -xzvf deployment-files.tar.gz
cd deployment-files
```

Then you need to copy the new NGINX configuration file to `/etc/nginx/sites-available` directory by running:

```sh
sudo cp ./transcribro.conf /etc/nginx/sites-available/
sudo systemctl restart nginx.service
```

### Update the Backend <a name="update-"></a>

To update the backend, you must log in as the transcribro user and run:

```sh
cd deployment-files
./start-backend.sh
```

