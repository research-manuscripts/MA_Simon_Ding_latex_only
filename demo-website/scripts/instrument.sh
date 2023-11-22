#!/usr/bin/env bash
set -e
cd $(dirname "$0")
cd ..
rm -rf build_not_instrumented
mv build build_not_instrumented
cp -a build_not_instrumented/ build/
echo "Instrumenting ./build"
npx nyc instrument build_not_instrumented build