# TypeScript + Node + Docker (with code hot-reloading in the container)

## For running locally

`npm i`

### Start the dev server

`npm run dev`

### Build the project

`npm run build`

### Start built project

`npm start`

## For running Docker Containers

_You'll need docker installed on your machine to run this in case you didn't know!_

### Build the image

`docker-compose build`

### Start the dev server

`make up`

### Stop the server

`make down`

### Build and start production build

`make up-prod`

## Deployment

### clone repo
`git clone https://github.com/Sergepl1/tg_template.git`

### install make utility
`sudo apt-get update`
`sudo apt-get install build-essential`

### run postgres server

`sudo service postgresql start`

### check status of postgres

`sudo systemctl status postgresql`

### run migration

`docker-compose exec server node --require ts-node/register ./node_modules/typeorm/cli.js migration:run`

### Create .env file with `BOT_TOKEN` varaible

### Build the image

`docker-compose build`

### Start the dev server

`make up`

### Setup db
Create db folder on server
`sudo -u postgres psql``
