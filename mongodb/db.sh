#!/usr/bin/env bash
docker run --name node-mongo -v /my/custom:/etc/mongo -d mongo: --config /etc/mongo/mongod.conf



docker run -d --name some-mongo -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo

docker run -it --rm --link some-mongo:mongo mongo mongo --host mongo -u mongoadmin -p secret --authenticationDatabase admin some-db