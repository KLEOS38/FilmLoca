#!/bin/bash

# FTP Check Script for FilmLoca
echo "🔍 Checking FTP directory structure..."

# Connect to FTP and list directories
lftp -c "
    set ftp:ssl-allow no
    open ftp.miladama.com
    user deploy@filmloca.com Vxrified38$
    ls -la /
    ls -la /filmloca.com
    quit
"

echo "📁 Check if index.html exists in root..."
lftp -c "
    set ftp:ssl-allow no
    open ftp.miladama.com
    user deploy@filmloca.com Vxrified38$
    ls -la /index.html
    quit
"
