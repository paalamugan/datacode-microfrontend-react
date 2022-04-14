# shared-dependencies
An import map of shared dependencies for datacode microfrontends

[![CircleCI](https://circleci.com/gh/datacode-microfrontends/shared-dependencies.svg?style=svg)](https://circleci.com/gh/datacode-microfrontends/shared-dependencies)

## What is this?

This is an example microfrontend repo demonstrating how to use [single-spa](https://single-spa.js.org). You can see the code running at https://datacode.microfrontends.app. The full, deployed import map is visible at https://datacode.microfrontends.app/importmap.json.

## How does it work?

[Full article](https://single-spa.js.org/docs/recommended-setup)

This repository contains an [import map](https://github.com/WICG/import-maps/) that controls the shared libraries between all microfrontends.

Whenever a pull request is merged to main, [CircleCI deploys the import map](https://circleci.com/gh/datacode-microfrontends/shared-dependencies). Deployments for this project are completely independent of deployments for any other module.