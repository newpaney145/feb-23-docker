#!/bin/sh

docker build -t psql_image -f ./dockerfile_database .
docker build -t react_image -f ./dockerfile_frontend .
docker build -t node_image -f ./dockerfile_backend .


docker volume create datadb

docker run -d --name psql_intern -e  POSTGRES_USER=operator -e POSTGRES_PASSWORD=operator -e POSTGRES_DB=postgres -v datadb:/var/lib/postgresql/data  psql_image
docker run -d --name node-app_intern --link psql_intern -p 3005:3001 node_image
docker run -d --name react_intern -p 3006:80  react_image


