#!/bin/bash

BUILD_DIR="${PWD}/build"
http-server $BUILD_DIR

read -n1 -r -p "Press any key to continue..." key