#!/bin/bash

# Enter server directory
cd server

if [ ! -e "install.txt" ]; then
    npm install
    echo "install=true" > "install.txt
    echo "Installing Server..."
    curl -o server.js https://raw.githubusercontent.com/GesundesWasser/McAccount-Server/master/server.js
else
rm -rf server.js
curl -o server.js https://raw.githubusercontent.com/GesundesWasser/McAccount-Server/master/server.js
node server.js
fi
