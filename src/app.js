const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;
require('dotenv').config();
const cron = require('node-cron');

app.use(cors());
app.use(bodyParser.urlencoded({limit: '200mb', extended: true, parameterLimit: 1000000}));
app.use(bodyParser.json({limit: '200mb'}));
const http = require('http');

const fs = require('fs');
// const https = require('https');
// const privateKey = fs.readFileSync('privkey.pem', 'utf8');
// const certificate = fs.readFileSync('cert.pem', 'utf8');
// const credentials = {key: privateKey, cert: certificate};

const httpsServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

// log all incoming request
app.use((req, res, next)=>{
	// console.log("appbody=====>>",req)
	next();
});

app.use(express.static(path.join(__dirname, '/Public')));

const db = require('../src/models');
const SocketService = require('./Config/socket');
db.sequelize.sync();

require('./Routes')(app);

const jsn = {'Status': 'Your Server Is Started Now'};
app.get('/*', (req, res) => {
	res.send(jsn);
	// res.sendFile(__dirname + '/index.html');
});

httpsServer.listen(port, function() {
	console.log('Server started Port', port);
});

app.set('socketService', new SocketService(httpsServer));


/**
 * Add cron jon for delete all approved documents which is already approved.
 * @type {ScheduledTask}
 */
const task = cron.schedule('* * * * * *', function() {
	console.log('Document delete which is approved of last month');
});

// eslint-disable-next-line require-jsdoc
function deleteDocument() {
	const lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
	if (new Date().getDate() === 22 &&
		new Date().getHours() === 18 &&
		new Date().getMinutes() === 59 &&
		new Date().getSeconds() < 4) {
		task.start();
	} else {
		task.stop();
	}
}

cron.schedule('* * * * * *', function() {
	console.log('running a task every 2 second');
	deleteDocument();
});

task.stop();
