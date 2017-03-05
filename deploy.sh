#!/usr/bin/env bash
node index.js
rsync build/ rs:/var/www/blog --delete -r