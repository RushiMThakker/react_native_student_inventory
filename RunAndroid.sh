#!/bin/bash
echo 'Starting Metro Bundler....'
react-native start &
echo '\n\nRunnning Android Project...'
react-native run-android &