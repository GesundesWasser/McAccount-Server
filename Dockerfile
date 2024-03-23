FROM alpine:latest

RUN apk update \
    && apk add npm \
    && apk add curl \
    && apk add nodejs \
    && apk add bash \
    && mkdir /server

# Start script
CMD ["bash", "./server.sh"]

# Container setup
EXPOSE 3000/tcp
EXPOSE 3000/udp
VOLUME /server
