#!/bin/bash
echo 'DOCKER VERSION'
docker -v

echo 'DOCKER COMPOSE VERSION'
docker-compose -v

echo 'CREATE DATA DIRECTORY'
mkdir -p ./data

echo 'CREATE NETWORK codeleap : codeleap'
docker network create codeleap

echo 'COMPOSE UP'
docker-compose --project-name=codeleap up -d
