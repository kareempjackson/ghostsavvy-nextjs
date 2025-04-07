#!/bin/bash

echo "🔍 Running pre-deployment checks..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: No .env file found. Make sure you have all necessary environment variables configured in Vercel."
    echo "   See .env.example for required variables."
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "⚠️  Warning: node_modules directory not found. Running npm install..."
    npm install
fi

# Make sure Next.js config has ESLint errors ignored during builds
NEXT_CONFIG="next.config.js"
if [ -f "$NEXT_CONFIG" ]; then
    # Check if eslint.ignoreDuringBuilds is set
    if ! grep -q "ignoreDuringBuilds: true" "$NEXT_CONFIG"; then
        echo "⚠️  Warning: ESLint errors are not ignored during builds in next.config.js."
        echo "   This might cause the build to fail due to ESLint errors."
        echo "   Consider adding the following to next.config.js:"
        echo "   eslint: { ignoreDuringBuilds: true }"
    else
        echo "✅ next.config.js is correctly configured to ignore ESLint errors during builds."
    fi
else
    echo "⚠️  Warning: next.config.js not found."
fi

# Run a build check
echo "🏗️  Running build check..."
npm run build

# Check build status
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Your app is ready for deployment."
    echo "   Run './deploy.sh' to deploy to Vercel."
else
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi 