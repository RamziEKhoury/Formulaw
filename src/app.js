const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;
require('dotenv').config();


app.use(cors());
app.use(bodyParser.urlencoded({limit: '200mb', extended: true, parameterLimit: 1000000}));
app.use(bodyParser.json({limit: '200mb'}));
const http = require('http');

const httpsServer = http.createServer(app);

// log all incoming request
app.use((req, res, next)=>{
	// console.log("appbody=====>>",req)
	next();
});

app.use(express.static(path.join(__dirname, '/dist')));

const db = require('../src/models');
db.sequelize.sync();

require('./Routes')(app);

const jsn = {'Status': 'Your Server Is Started Now'};
app.get('/*', (req, res) => {
	res.send(jsn);
});

httpsServer.listen(port, function() {
	console.log('Server started Port', port);
});
