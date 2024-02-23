#!/usr/bin/bash

# This script starts the backend as well as any necessary services in docker containers.

# prompt user for OpenAI API key:
# ----------------------------------------------------------------
# NOTE: I (Ryan) chose to pass the API key this way because it 
# makes it so that we don't have to set an environment variable
# in the shell (`export API_KEY=<API_KEY_123>`), which could
# expose the plaintext API key in the bash history file.
#
# We could set up some elaborate secrets sharing infrastructure,
# but I really can't be bothered to do that right now, and this
# way is the simplest secure-ish way to pass the API key.
read -p "OpenAI API key: " OPENAI_API_KEY
export OPENAI_API_KEY=$OPENAI_API_KEY

# update docker containers used for the deployment:
docker-compose pull
# spin up docker containers used for the deployment:
docker-compose up -d --remove-orphans
# remove old docker container images:
docker image prune