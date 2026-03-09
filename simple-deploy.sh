#!/bin/bash

echo "🚀 Simple Manual Deployment Test"

# Build the app
echo "📦 Building app..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Try simple FTP upload
    echo "📤 Uploading to server..."
    
    # Install ncftp if needed
    if ! command -v ncftp &> /dev/null; then
        echo "Installing ncftp..."
        brew install ncftp
    fi
    
    # Upload to root directory first
    ncftpput -R -v -u "deploy@filmloca.com" -p "Vxrified38$" miladama.com / ./dist/*
    
    echo "🎉 Deployment attempt complete!"
    echo "🌐 Check: https://filmloca.com"
else
    echo "❌ Build failed!"
fi
