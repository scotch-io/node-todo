FROM node:alpine
MAINTAINER uzzal, uzzal2k5@gmail.com
WORKDIR /node-todo
COPY . .
RUN npm install

# CONFIG STANDARD ERROR LOG
RUN ln -sf /dev/stdout /var/log/access.log \
	&& ln -sf /dev/stderr /var/log/error.log

# SET HEALTH CHECK
HEALTHCHECK --interval=5s \
            --timeout=5s \
            CMD curl -f http://127.0.0.1:8000 || exit 1

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
RUN apk update
RUN apk add mongodb=3.4.4-r0
RUN mongo --version
EXPOSE 8080


ENTRYPOINT ["node", "server.js"]