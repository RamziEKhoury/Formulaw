const socket = require('socket.io');
const moment = require('moment');

const users={};
// eslint-disable-next-line require-jsdoc
function getKeyByValue(object, value) {
	return Object.keys(object).find((key) =>
		object[key] === value);
}

// eslint-disable-next-line require-jsdoc
function saveMessage(senderId, receiverId, text, currency, amount, messageType, senderType, productName, productPrice, productImage, productOwnerId, images, file) {
	const outgoingInfo = {
		'senderId': senderId,
		'receiverId': receiverId,
		'productOwnerId': productOwnerId,
		'message': [{
			'type': 'outgoing',
			'images': images,
			'file': file,
			'text': text,
			'currency': currency,
			'amount': amount,
			'productName': productName,
			'productPrice': productPrice,
			'productImage': productImage,
			'messageType': messageType,
			'time': moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss A'),
		}],
	};
	const incomingInfo = {
		'senderId': receiverId,
		'receiverId': senderId,
		'productOwnerId': productOwnerId,
		'message': [{
			'type': 'incoming',
			'images': images,
			'file': file,
			'text': text,
			'currency': currency,
			'amount': amount,
			'productName': productName,
			'productPrice': productPrice,
			'productImage': productImage,
			'messageType': messageType,
			'time': moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss A'),
		}],
	};
	const updateOutgoingInfo = {
		'type': 'outgoing',
		'images': images,
		'file': file,
		'text': text,
		'currency': currency,
		'amount': amount,
		'productName': productName,
		'productPrice': productPrice,
		'productImage': productImage,
		'messageType': messageType,
		'time': moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss A'),
	};
	const updateIncomingInfo = {
		'type': 'incoming',
		'images': images,
		'file': file,
		'text': text,
		'currency': currency,
		'amount': amount,
		'productName': productName,
		'productPrice': productPrice,
		'productImage': productImage,
		'messageType': messageType,
		'time': moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss A'),
	};
	// registrDb.find({'messages.senderId': senderId, 'messages.receiverId': receiverId}).exec((err, succ)=>{
	// 	if (err) {
	// 	} else if (succ.length == 0) {
	// 		registrDb
	// 			.updateOne({_id: senderId},
	// 				{$push: {'messages': outgoingInfo}, status: 'unread'})
	// 			.exec((errr, succc)=>{
	// 				registrDb
	// 					.updateOne({_id: receiverId},
	// 						{$push: {'messages': incomingInfo},
	// 							status: 'unread'})
	// 					.exec((errr, succc)=>{
	// 						// Recent
	// 						registrDb
	// 							.updateOne({messages:
	//        {$elemMatch:
	//          {senderId: senderId,
	//          	receiverId: receiverId}}},
	// 							{$set:
	//              {'messages.$.text': text,
	//              	'messages.$.currency': currency,
	//              	'messages.$.messageType': messageType,
	//              	'messages.$.amount': amount,
	//              	'messages.$.productName': productName,
	//              	'messages.$.productPrice': productPrice,
	//              	'messages.$.productImage': productImage,
	//              },
	// 							})
	// 							.exec((errr, suc)=>{
	// 								registrDb
	// 									.updateOne({messages:
	//        {$elemMatch:
	//          {senderId: receiverId,
	//          	receiverId: senderId}}},
	// 									{$set:
	//              {'messages.$.text': text,
	//              	'messages.$.currency': currency,
	//              	'messages.$.messageType': messageType,
	//              	'messages.$.amount': amount,
	//              	'messages.$.productName': productName,
	//              	'messages.$.productPrice': productPrice,
	//              	'messages.$.productImage': productImage,
	//              },
	// 									})
	// 									.exec((errr, suc)=>{
	// 									});
	// 							});
	// 					});
	// 			});
	// 	} else {
	// 		registrDb
	// 			.updateOne({messages:
	//        {$elemMatch:
	//          {senderId: receiverId,
	//          	receiverId: senderId}}},
	// 			{$push:
	//              {'messages.$.message': updateIncomingInfo},
	// 			status: 'unread',
	// 			})
	// 			.exec((errr, succc)=>{
	// 				registrDb
	// 					.updateOne({messages:
	//        {$elemMatch:
	//          {senderId: senderId,
	//          	receiverId: receiverId}}},
	// 					{$push: {'messages.$.message': updateOutgoingInfo},
	// 						status: 'unread',
	// 					})
	// 					.exec((errr, succc)=>{
	// 					});
	// 			});
	//
	// 		// Recent
	// 		registrDb
	// 			.updateOne({messages:
	//        {$elemMatch:
	//          {senderId: senderId,
	//          	receiverId: receiverId}}},
	// 			{$set:
	//              {'messages.$.text': text,
	//              	'messages.$.currency': currency,
	//              	'messages.$.messageType': messageType,
	//              	'messages.$.amount': amount,
	//              	'messages.$.productName': productName,
	//              	'messages.$.productPrice': productPrice,
	//              	'messages.$.productImage': productImage,
	//              },
	// 			})
	// 			.exec((errr, suc)=>{
	// 				registrDb
	// 					.updateOne({messages:
	//        {$elemMatch:
	//          {senderId: receiverId,
	//          	receiverId: senderId}}},
	// 					{$set:
	//              {'messages.$.text': text,
	//              	'messages.$.currency': currency,
	//              	'messages.$.messageType': messageType,
	//              	'messages.$.amount': amount,
	//              	'messages.$.productName': productName,
	//              	'messages.$.productPrice': productPrice,
	//              	'messages.$.productImage': productImage,
	//              },
	// 					})
	// 					.exec((errr, suc)=>{
	// 					});
	// 			});
	// 	}
	// });
}

// eslint-disable-next-line require-jsdoc
class SocketService {
	// eslint-disable-next-line require-jsdoc
	constructor(server) {
		this.io = socket(server);
		this.io.on('connection', (socket) => {
			/**
			 * User Connected
			 */
			socket.on('new-user', (name) => {
				console.log('new-user----->>', name);
				users[socket.id] = name;
			});

			/**
			 * Send Message
			 */
			socket.on('message', (msg) => {
				console.log('total users----->>', users);
				console.log('message----->>', msg);
				msg = JSON.parse(msg);
				saveMessage(
					msg.senderId,
					msg.receiverId,
					msg.message,
					msg.messageType,
					msg.image,
					msg.file,
					msg.appointmentId,
					msg.requestId,
				);
				const receiver = getKeyByValue(users, msg.reciever);
				this.io.to(receiver).emit('message', msg);
			});


			/**
			 * Disconnected manual
			 */
			socket.on('disconnectUser', (id) => {
				console.log('disconnect----->>', id, 'Total--->', users);
				const userSocketId = getKeyByValue(users, id);
				console.log('userSocketId----->>', userSocketId);
				socket.broadcast.emit('user-disconnected', userSocketId);
				delete users[userSocketId];
			});

			/**
			 * Disconnected
			 */
			socket.on('disconnect', (id) => {
				console.log('disconnect----->>', id, 'Total--->', users);
				const userSocketId = getKeyByValue(users, id);
				console.log('userSocketId----->>', socket.id);
				socket.broadcast.emit('user-disconnected', socket.id);
				delete users[socket.id];
			});

			/**
			 * Typing
			 */
			socket.on('typing', (msg)=> {
				msg = JSON.parse(msg);
				const receiver = getKeyByValue(users, msg.reciever);
				this.io.to(receiver).emit('typing', msg);
			});

			/**
			 * StopTyping
			 */
			socket.on('stopTyping', (msg)=> {
				msg = JSON.parse(msg);
				const receiver = getKeyByValue(users, msg.reciever);
				this.io.to(receiver).emit('stopTyping', msg);
			});
		});
	}
}

module.exports = SocketService;

