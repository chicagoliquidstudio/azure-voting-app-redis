#!/usr/bin/env groovy

checkout scm

sh "npm run cucumber:test"
