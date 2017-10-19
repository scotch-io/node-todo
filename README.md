# Node Todo App

A Node app built with MongoDB and Angular. For demonstration purposes and a tutorial.

Node provides the RESTful API. Angular provides the frontend and accesses the API. MongoDB stores like a hoarder.

## Requirements

- [Node and npm](http://nodejs.org)
- MongoDB: Make sure you have your own local or remote MongoDB database URI configured in `config/database.js`

## Installation

1. Clone the repository: `git clone https://github.com/emrahyumuk/node-todo.git`
2. Install the application: `npm install`
3. Start the server: `node server.js`
4. View in browser at `http://localhost:8000`

## Installation with Docker

1. Clone the repository: `git clone https://github.com/emrahyumuk/node-todo.git`
2. Install Docker: [The Docker Store](https://store.docker.com/search?type=edition&offering=community)
3. Run docker compose: `docker-compose up` or if you want to debug on VS Code, run docker compose : `docker-compose -f docker-compose-debug.yml up`
4. View in browser at `http://localhost:8000`


## Tutorial Series

This repo corresponds to the Node Todo Tutorial Series on [scotch.io](http://scotch.io)

Each branch represents a certain tutorial.
- tut1-starter: [Creating a Single Page Todo App with Node and Angular](http://scotch.io/tutorials/javascript/creating-a-single-page-todo-app-with-node-and-angular)
- tut2-organization: [Application Organization and Structure](https://scotch.io/tutorials/node-and-angular-to-do-app-application-organization-and-structure)
- tut3-services: [Controllers and Services](https://scotch.io/tutorials/node-and-angular-to-do-app-controllers-and-services)

Happy Todo-ing! 

![Todo-aholic](http://i.imgur.com/ikyqgrn.png)
-
