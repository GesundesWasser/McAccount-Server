#!/bin/bash

# Enter server directory
cd server

# Start nodejs server
rm -rf server.js
curl -so server.js https://raw.githubusercontent.com/GesundesWasser/McAccount-Server/master/server.js
node server.js
