#!/bin/bash
cd android
echo "Clean build...."
./gradlew clean
cd ..
echo "Running build...."
react-native run-android
