#!/bin/bash

echo "Removing Tailwind CSS v4..."
npm uninstall tailwindcss @tailwindcss/postcss

echo "Installing stable Tailwind CSS v3..."
npm install -D tailwindcss@^3.4.0 postcss autoprefixer

echo "Tailwind CSS v3 installed. Please restart your dev server with 'npm run dev'"