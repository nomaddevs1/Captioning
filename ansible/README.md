# Ansible Automated Deployment

## Install Ansible and necessary Ansible collections

1. [Install Ansible]() on your local machine.
2. Install necessary Ansible collections:

```sh
ansible-galaxy collection install ansible.posix community.docker
```

## Set up the application on a remote server automatically with Ansible 
1. Create SSH keys for admin and util user using the `generate-ssh-keys.sh` script:

```sh
./scripts/generate_ssh_keys.sh
```

2. Copy the `admin_user` SSH key to the server by using the `ssh-copy-id` command:

```sh
ssh-copy-id -i keys/admin_user <admin_user>@<server-url>
```

3. Write the OpenAI API key to a file at `ansible/secrets/openai-api-key.yml`

```
# file: secrets/openai-api-key.yml
openai_api_key: sk-kdjfhasdfhjksadfjk
````

4. Encrypt the OpenAI API key for the Whisper API using `ansible-vault`

```
ansible-vault encrypt secrets/openai-api-key.yml
```

This will make you set a vault password for the encrypted file. Save it somewhere safe or memorize it, you'll need it later

5. Run the `setup-dependencies.yml` Ansible playbook:

```sh
ansible-playbook playbooks/setup-dependencies.yml
```

6. Run the `setup-server.yml` Ansible playbook and enter the vault password you set earlier when prompted:
```sh
ansible-playbook playbooks/setup-server.yml --ask-vault-pass
```

## Update the application on a remote server automatically with Ansible

1. Run the `update-server.yml` Ansible playbook and enter the vault password when prompted

```sh
ansible-playbook playbooks/update-server.yml --ask-vault-pass
```