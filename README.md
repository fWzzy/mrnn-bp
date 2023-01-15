# Book App

The application allow users to store and retrieve records of their favorite books.

## Stack
- ### Backend
  - [NestJS](https://nestjs.com/)
  - [MikroORM](https://mikro-orm.io/)
- ### Frontend
  - [Create React App](https://github.com/facebook/create-react-app)
  - [Redux](https://redux.js.org/)
  - [Redux Toolkit](https://redux-toolkit.js.org/)
  - [Charkra UI](https://chakra-ui.com/)
  
- ### [MariaDB](https://mariadb.org/)
- ### [phpMyAdmin](https://www.phpmyadmin.net/)

## Prerequisites
  - [Docker](https://docs.docker.com/get-docker/)
  - [docker-compose](https://docs.docker.com/compose/install/)

## Run application
 - Prepare frontend env file `cp ./mrnn-fe/.env.example ./mrnn-fe/.env`
 - Prepare frontend env file `cp ./mrnn-be/.env ./mrnn-be/.env.development`
 - Start all container `docker-compose up -d`
 - Migrate backend database `docker-compose exec backend yarn mikro-orm migration:up`

## Hosts
- API document hosted at http://localhost:3001/docs
- Frontend hosted at http://localhost:3002/dashboard
- phpMyAdmin hosted at http://localhost:3003/. Username and password stored in [.env](./.env) file

## To do

- [ ] Implement CICD
- [ ] Intergrate with [Portainer](https://www.portainer.io/)

