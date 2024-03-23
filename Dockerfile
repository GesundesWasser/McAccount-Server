FROM alpine:latest

COPY server.sh .
RUN apk update \
    && apk add npm \
    && apk add curl \
    && apk add nodejs \
    && apk add bash \
    && mkdir /server
COPY package.json /server
RUN cd /server && npm install
# Start script
CMD ["bash", "./server.sh"]

# Container setup
EXPOSE 3000/tcp
EXPOSE 3000/udp
