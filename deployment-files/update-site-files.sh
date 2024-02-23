#!/usr/bin/bash

if [[ $USER != 'transcribro' ]]; then 
    echo "You must be logged in as user 'transcribro' to run this script"
    exit
fi

echo "copying site files into /var/www/transcribro..."
cp -ar ./site/. /var/www/transcribro
echo "finished copying site files"