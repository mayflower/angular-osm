#!/bin/bash
set -ev
if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_REPO_SLUG" = "mayflower/angular-osm" ]; then
  #npm publish ./dist --tag next --access public
fi
