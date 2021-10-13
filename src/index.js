/*
 * Run the project and access the documentation at: http://localhost:3000/doc
 *
 * Use the command below to generate the documentation without starting the project:
 * $ npm start
 *
 * Use the command below to generate the documentation at project startup:
 * $ npm run start-gendoc
 */

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

/* Middlewares */
app.use(bodyParser.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(4300, () => {
	console.log(
		'Server is running!\nAPI documentation: http://localhost:4300/doc',
	);
});

/* Endpoints */
require('../src/Routes/user.route')(app);
require('../src/Routes/role.route')(app);
require('../src/Routes/language.route')(app);
require('../src/Routes/country.route')(app);
require('../src/Routes/industrial.route')(app);
require('../src/Routes/service.route')(app);
require('../src/Routes/service-subcategory.route')(app);
require('../src/Routes/lawFirm.route')(app);
require('../src/Routes/request.route')(app);
require('../src/Routes/lawFirm-industry.route')(app);
require('../src/Routes/lawFirm-service.route')(app);
require('../src/Routes/appointment.route')(app);
