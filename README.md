# Fastify, Express and Apollo’s Graphql Performance Comparison

Performance testing with using fastify, express and apollo servers.

### Tech

This app uses a number of open source projects to work properly:

* [VueJS] - HTML enhanced for web apps!
* [Fastify] - fast and new node.js network app framework 
* [Express] - fast node.js network app framework 
* [Apollo-Graphql] - node.js network app framework for Graphql
* [node.js] - evented I/O for the backend

### Installation

This app requires [Node.js](https://nodejs.org/) v15.3.0 to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd apollo-api
$ npm install
$ npm run server
```

```sh
$ cd express-api
$ npm install
$ npm run serve
```

```sh
$ cd fastify-mercuries-api
$ npm install
$ npm run serve
```

```sh
$ cd fastify-api
$ npm install
$ npm run serve
```

```sh
$ cd vue-dashboard
$ npm install
$ npm run serve
```

### Create MongoDB Local Database with Docker

You can create your local mongo db as follows.

```sh
$ cd fastify-api
$ docker-compose up --build -d
```

### Seed Dummy Data

You can seed dummy data in your database.

```sh
$ cd fastify-api/db/seeders
$ node seed.js
```

### Development

Want to contribute? Great!

### Todos

 - Write MORE Tests

License
----

MIT
