#!/bin/bash
rm -r origami.ft.com/
cd apps/website/ && bundler && make build
mv _site ../../origami.ft.com
cd ../storybook/
npm ci
npm run build-storybook
mv storybook-static ../../origami.ft.com/stories
