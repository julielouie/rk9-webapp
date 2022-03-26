# !/bin/bash
lerna run clean # deletes all builds in packages
echo "y" | lerna clean # deletes node_modules in our packages
rm -rf node_modules # deletes node_modules on the top level
npm install
lerna bootstrap # sets up sym links in packages to point to our top level node_modules
lerna run compile # actually installs our node_modules in our packages