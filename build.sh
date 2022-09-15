#!/usr/bin/env bash

# Ramp up cms
echo 'starting payload cms'
docker-compose up -d

# Await till ready
echo 'awaiting for payload'
until [ "`docker inspect -f {{.State.Running}} blaze-web-payload`"=="true" ]; do
    sleep 1.0;
done;

# Build Nextjs Application
cd view && npm run build

# Success!
echo 'Build Complete'