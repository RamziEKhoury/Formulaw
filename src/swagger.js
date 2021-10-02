const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'Formula Admin API',
  },
  host: '15.184.198.65:3002',
  // host: 'localhost:3002',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'api_key',
      in: 'header',
    },
    petstore_auth: {
      type: 'oauth2',
      authorizationUrl: 'https://petstore.swagger.io/oauth/authorize',
      flow: 'implicit',
      scopes: {
        read_pets: 'read your pets',
        write_pets: 'modify pets in your account',
      },
    },
  },
};

const outputFile = './swagger_output.json';
const endpointsFiles = [
  '../src/Routes/user.route',
  '../src/Routes/role.route',
  '../src/Routes/language.route',
  '../src/Routes/country.route',
  '../src/Routes/industrial.route',
  '../src/Routes/service.route.js',
  '../src/Routes/service-subcategory.route',
  '../src/Routes/lawFirm.route.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index');
});
