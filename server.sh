#!/bin/bash

# Enter server directory
cd server

# Delete all files.
echo "Downloading Data..."
rm -rf server.js
rm -rf authMiddleware.js
rm -rf dbConfig.js

# Redownload all files.
curl -so server.js https://raw.githubusercontent.com/GesundesWasser/McAccount-Server/master/server.js
curl -so dbConfig.js https://raw.githubusercontent.com/GesundesWasser/McAccount-Server/master/dbConfig.js
curl -so authMiddleware.js https://raw.githubusercontent.com/GesundesWasser/McAccount-Server/master/authMiddleware.js
echo "Download Completed!"

# Finally, start the server
node server.js
