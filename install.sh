#!/bin/sh
set -e
npm install
cd app && npm install && npx tauri build
