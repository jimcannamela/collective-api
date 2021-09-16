const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Collective API',
      version: '1.1.0',
    },
    servers: [
      {url:'http://localhost:8082/api'}
    ],
    tags: [
      {
        name: "Posts"
      },
      {
        name: "Comments",
        description: "User comments on posts."
      }
    ]
  },
  apis: [
    './app/comments/routes.js',
    './app/posts/routes.js'
  ]
};

const docs = swaggerJsdoc(options);
fs.writeFileSync('./openapi.json', JSON.stringify(docs, null, 2));

module.exports = docs;