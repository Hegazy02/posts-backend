const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Posts API',
      version: '1.0.0',
      description: 'API documentation for Posts blog',
    },
  },
  apis: [path.join(__dirname, './routes/*.js')],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;