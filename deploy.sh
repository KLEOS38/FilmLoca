#!/bin/bash

# FilmLoca Deployment Script
# This script builds and deploys the app to cPanel via FTP

echo "🚀 Starting FilmLoca deployment..."

# Build the app
echo "📦 Building the app..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to cPanel via FTP
    echo "📤 Deploying to cPanel..."
    
    # You'll need to install lftp first: brew install lftp
    lftp -c "
        set ftp:ssl-allow no
        open ftp.filmloca.com
        user miladama YOUR_CPANEL_PASSWORD
        mirror -R --delete --verbose ./dist/ /public_html/
        quit
    "
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo "🌐 Your app is now live at: https://filmloca.com"
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
