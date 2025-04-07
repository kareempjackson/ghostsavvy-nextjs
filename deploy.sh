#!/bin/bash

# Run preflight checks
echo "Running preflight checks..."

# Check if .env file exists
if [ ! -f .env ]; then
  echo "⚠️ Warning: No .env file found. Make sure all necessary environment variables are configured in Vercel."
  echo "   See .env.example for required variables."
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build the app (this will happen automatically via the predeploy script)
echo "Deploying to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
  echo "Vercel CLI is not installed. Installing now..."
  npm install -g vercel
fi

# Deploy to Vercel
npm run deploy:vercel

echo "Deployment complete!" 