# Node Todo App

A Node app built with MongoDB and Angular. For demonstration purposes and a tutorial.

Node provides the RESTful API. Angular provides the frontend and accesses the API. MongoDB stores like a hoarder.

## Requirements

- [Node and npm](http://nodejs.org)
- MongoDB: Make sure you have your own local or remote MongoDB database URI configured in `config/database.js`

# Running the app with Docker

Install [Docker](https://www.docker.com/) and docker-compose. If you use Windows, click on the icon that will appear on your tray and [enable Shared Drives](https://docs.docker.com/docker-for-windows/#general).

Then go to the root of this project and:

```bash
$ docker-compose up
```

This will use the docker-compose.yml file inside the infra directory to download and prepare what is needed to run the API. It uses Node.js and MongoDB as the database, so we have 2 Docker containers.

## Installation

1. Clone the repository: `git clone git@github.com:scotch-io/node-todo`
2. Install the application: `npm install`
3. Place your own MongoDB URI in `config/database.js`
3. Start the server: `node server.js`
4. View in browser at `http://localhost:8080`

## Tutorial Series

This repo corresponds to the Node Todo Tutorial Series on [scotch.io](http://scotch.io)

Each branch represents a certain tutorial.
- tut1-starter: [Creating a Single Page Todo App with Node and Angular](https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular)
- tut2-organization: [Application Organization and Structure](https://scotch.io/tutorials/node-and-angular-to-do-app-application-organization-and-structure)
- tut3-services: [Controllers and Services](https://scotch.io/tutorials/node-and-angular-to-do-app-controllers-and-services)

Happy Todo-ing!

![Todo-aholic](http://i.imgur.com/ikyqgrn.png)
