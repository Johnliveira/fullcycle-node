FROM node:alpine

WORKDIR /opt/app

RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY src /opt/app
COPY start.sh /opt/app
RUN npm install express mysql
RUN chmod +x /opt/app/start.sh
EXPOSE 3000
ENTRYPOINT [ "/opt/app/start.sh" ]

# não foi possível usar o dockerize, ele estava encerrando a aplicação node
# ENTRYPOINT [ "dockerize", "-wait", "tcp://mysql:3306", "timeout", "20s", "/opt/app/start.sh" ]
