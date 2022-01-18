#!/bin/bash

echo "Copying example notebooks"

cp -r -u -v ~/data/notebooks/* ~/

pushd ~/data/notebooks/ || exit
files=$(find . -type f -name "*.ipynb")
popd || exit

echo "Trusting notebooks..."

pushd ~ || exit
for file in $files; do
  jupyter trust "$file"
done
popd || exit

echo "Done"