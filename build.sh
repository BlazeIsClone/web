#!/usr/bin/env sh

# Only continue on prodcution branch
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [ 'main' = ${current_branch} ]
then
  echo "Skipping Build"
  exit 1 # push will not execute
else
  exit 0 # push will execute
fi

# Ramp up cms
echo 'starting payload cms'
npm run start

# Await till ready
echo 'awaiting for payload'
until [ "`docker inspect -f {{.State.Running}} blaze-web-payload`"=="true" ]; do
    sleep 1.0;
done;

# Build Nextjs Application
npm run build

# Success!
echo 'Build Complete'
