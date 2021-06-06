#!/usr/bin/env sh

set -e

npm run build

cd build

git init
git add -A
git commit -m 'deploy'

git push -f https://${GITHUB_TOKEN}@github.com/NLRX-WJC/react-antd-admin-template.git master:gh-pages

cd -