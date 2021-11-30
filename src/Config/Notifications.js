// const notifyDb = require('../Models/notification');

const admin = require('firebase-admin');
const serviceAccount = require('../formulaw-19c2e-firebase-adminsdk-cuqdb-dce95107b0.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://noble-serenity-286307.firebaseio.com',
});


module.exports={
	// notfctionCreate: (notificationData)=>{
	// 	return new Promise((resolve, reject)=>{
	// 		const addnotifiction = new notifyDb(notificationData);
	// 		addnotifiction.save().then((result)=>{
	// 			return resolve(result);
	// 		}).catch((error)=>{
	// 			return reject(error);
	// 		});
	// 	});
	// },
	//
	// readNotification: (notificationId)=>{
	// 	return new Promise((resolve, reject)=>{
	// 		const query = notifyDb.updateMany({_id: notificationId}, {notifyStatus: 'read'});
	// 		query.exec().then((result)=>{
	// 			return resolve(result);
	// 		}).catch((error)=>{
	// 			return reject(error);
	// 		});
	// 	});
	// },


	notification: ()=>{
		console.log('calling here ===>.');
		const notificationOptions = {
			priority: 'high',
			timeToLive: 60 * 60 * 24,
		};

		const MessageNotifications = {
			notification: {
				title: 'FORMU.LAW',
				body: 'Hello formulians......',
			},
		};

		const registrationToken = 'c4ykI-rNuc71dC5YSH3ElS:APA91bE9gN4rm050gQKi6tHsj5OjDmDP00A1Py9msFmX9YP-2kfmRPHaqI1Nu3bHLWPSQbagRj9d8Ni4DYMlUsg55pxju7ScGhu9bSLYgNGLzBoC0iNeoHSg5-ZoBJgd7P4tbJBKysQM';
		const options = notificationOptions;
		return new Promise((resolve, reject)=>{
			admin.messaging().sendToDevice(registrationToken, MessageNotifications, options)
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
