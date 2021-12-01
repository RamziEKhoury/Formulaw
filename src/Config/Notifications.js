const db = require('../models');
const Notifications = db.notification;

const admin = require('firebase-admin');
const serviceAccount = require('../formulaw-19c2e-firebase-adminsdk-cuqdb-dce95107b0.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://noble-serenity-286307.firebaseio.com',
});


module.exports={
	notificationCreate: (notificationData)=>{
		return new Promise((resolve, reject)=>{
			const notification = new Notifications(notificationData);
			notification.save().then((result)=>{
				return resolve(result);
			}).catch((error)=>{
				return reject(error);
			});
		});
	},


	notification: (token, message)=>{
		const notificationOptions = {
			priority: 'high',
			timeToLive: 60 * 60 * 24,
		};

		const MessageNotifications = {
			notification: {
				title: 'FORMU.LAW',
				body: message,
			},
		};

		const registrationToken = token;
		const options = notificationOptions;
		return new Promise((resolve, reject)=>{
			admin
				.messaging()
				.sendToDevice(registrationToken, MessageNotifications, options)
				.then( (response) => {
					console.log('respomse===>.'+JSON.stringify(response));
					return resolve(response);
				})
				.catch( (error) => {
					return reject(error);
				});
		});
	},
};
