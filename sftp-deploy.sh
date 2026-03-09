#!/bin/bash

echo "🚀 SFTP Deployment Test"

# Build app
echo "📦 Building app..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Try SFTP upload
    echo "📤 Uploading via SFTP..."
    
    # Install sftp if needed
    if ! command -v sftp &> /dev/null; then
        echo "SFTP already available"
    fi
    
    # Upload using SFTP
    sftp -oPort=22 deploy@filmloca.com@miladama.com <<EOF
    put -r dist/* /filmloca.com/
    exit
EOF
    
    echo "🎉 SFTP deployment attempt complete!"
    echo "🌐 Check: https://filmloca.com"
else
    echo "❌ Build failed!"
fi
