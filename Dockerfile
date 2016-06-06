## BUILDING
##   (from project root directory)
##   $ docker build -t prydonius-node-todo .
##
## RUNNING
##   $ docker run -p 3000:3000 prydonius-node-todo
##
## CONNECTING
##   Lookup the IP of your active docker host using:
##     $ docker-machine ip $(docker-machine active)
##   Connect to the container at DOCKER_IP:3000
##     replacing DOCKER_IP for the IP of your active docker host

FROM gcr.io/stacksmith-images/debian:wheezy-r07

MAINTAINER Bitnami <containers@bitnami.com>

ENV STACKSMITH_STACK_ID="lcz2d3j" \
    STACKSMITH_STACK_NAME="prydonius/node-todo" \
    STACKSMITH_STACK_PRIVATE="1"

RUN bitnami-pkg install node-6.2.0-1 --checksum 94805fccddfc7f4892ba21b816abd73ee3a1221c7e9d2fa045669e180f3d824b

ENV PATH=/opt/bitnami/node/bin:/opt/bitnami/python/bin:$PATH \
    NODE_PATH=/opt/bitnami/node/lib/node_modules

## STACKSMITH-END: Modifications below this line will be unchanged when regenerating

# ExpressJS template
COPY . /app
WORKDIR /app

RUN npm install

EXPOSE 8080
CMD ["node", "server.js"]
