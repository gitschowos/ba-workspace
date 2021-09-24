#!/bin/bash
# Setup for this workspace
echo ===============================
echo Installing dependencies...
echo ===============================
npm ci

echo ===============================
echo Building library...
echo ===============================
cd projects/ngx-model-driven-form
npm run build

cd ../..

echo ===============================
echo Setup was successful. Have fun!
echo ===============================