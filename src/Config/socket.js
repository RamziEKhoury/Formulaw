const socket = require('socket.io');
const db = require('../models');
const Notifications = require('./Notifications');
const {recieverMessageEmail, recieverMessageEmailAdmin} = require('./Mails');
const {WorkflowAppointment} = require('../enum');
const Chat = db.chat;
const User = db.user;
const Admin = db.adminUser;
const Message = db.message;

const users={};
// eslint-disable-next-line require-jsdoc
function getKeyByValue(object, value) {
	return Object.keys(object).find((key) =>
		object[key] === value);
}

// eslint-disable-next-line require-jsdoc,max-len
async function saveMessage(senderId, receiverId, message, messageType, imageUrl, fileUrl, appointmentId, requestId, firstname, lastname, date, source) {
	console.log('messgae--->', senderId, receiverId, message, messageType, imageUrl, fileUrl, appointmentId, requestId, firstname, lastname, date);

	const isChatExist = await Chat.findOne({
		where: {
			senderId: senderId,
			receiverId: receiverId,
			requestId: requestId,
		},
	});

	const isChatExistAnother = await Chat.findOne({
		where: {
			senderId: receiverId,
			receiverId: senderId,
			requestId: requestId,
		},
	});

	if (!!isChatExist) {
		await Chat.update({
			message: message,
			messageType: messageType,
			imageUrl: imageUrl,
			fileUrl: fileUrl,
			firstname: firstname,
			lastname: lastname,
			date: date,
			source,
		}, {where: {
			senderId: senderId,
			receiverId: receiverId,
			requestId: requestId,
		}});
		await Message.create({
			chatId: isChatExist.id,
			senderId: senderId,
			receiverId: receiverId,
			requestId: requestId,
			appointmentId: appointmentId,
			message: message,
			messageType: messageType,
			imageUrl: imageUrl,
			fileUrl: fileUrl,
			firstname: firstname,
			lastname: lastname,
			date: date,
			source,
		});
	} else if (!!isChatExistAnother) {
		await Chat.update({
			message: message,
			messageType: messageType,
			imageUrl: imageUrl,
			fileUrl: fileUrl,
			firstname: firstname,
			lastname: lastname,
			date: date,
			source,
		}, {where: {
			senderId: receiverId,
			receiverId: senderId,
			requestId: requestId,
		}});
		await Message.create({
			chatId: isChatExistAnother.id,
			senderId: senderId,
			receiverId: receiverId,
			requestId: requestId,
			appointmentId: appointmentId,
			message: message,
			messageType: messageType,
			imageUrl: imageUrl,
			fileUrl: fileUrl,
			firstname: firstname,
			lastname: lastname,
			date: date,
			source,
		});
	} else {
		const createdChat = await Chat.create({
			senderId: senderId,
			receiverId: receiverId,
			requestId: requestId,
			appointmentId: appointmentId,
			message: message,
			messageType: messageType,
			imageUrl: imageUrl,
			fileUrl: fileUrl,
			firstname: firstname,
			lastname: lastname,
			date: date,
			source,
		});

		await Message.create({
			chatId: createdChat.id,
			senderId: senderId,
			receiverId: receiverId,
			requestId: requestId,
			appointmentId: appointmentId,
			messageType: messageType,
			message: message,
			imageUrl: imageUrl,
			fileUrl: fileUrl,
			firstname: firstname,
			lastname: lastname,
			date: date,
			source,
		});
	}
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
				const isUserExist = getKeyByValue(users, name);
				console.log('exist--->', isUserExist);
				if (!!isUserExist) {
					console.log('total users-Already---->>', users);
					delete users[isUserExist];
					users[socket.id] = name;
				} else {
					users[socket.id] = name;
					console.log('total users-new---->>', users);
				}
			});

			/**
			 * Send Message
			 */
			socket.on('message', async (msg) => {
				console.log('total users---message-->>', users);
				console.log('message----->>', msg);
				saveMessage(
					msg.senderId,
					msg.receiverId,
					msg.message,
					msg.messageType,
					msg.imageUrl,
					msg.fileUrl,
					msg.appointmentId,
					msg.requestId,
					msg.firstname,
					msg.lastname,
					msg.date,
					'outgoing',
				);
				const receiver = getKeyByValue(users, msg.receiverId);
				console.log('receiver----->>', receiver);
				this.io.to(receiver).emit('message', msg);
				if (!receiver) {
					if (msg.sendingTo === 'ADMIN') {
						const user = await Admin.findOne({where: {id: msg.receiverId}});
						await recieverMessageEmailAdmin(user.email);
					} else {
						const user = await User.findOne({where: {id: msg.receiverId}});
						await recieverMessageEmail(user.email);
						const notiData = {
							title: 'You have received new message',
							message: 'You have received new message from someone please click here to continue chat',
							senderName: (msg.firstname ? msg.lastname: ' ' ),
							senderId: msg.customerId,
							senderType: 'APPOINTMENT',
							receiverid: msg.receiverId,
							notificationType: WorkflowAppointment.CONSULTATION,
							target: msg.appointmentId,
						};
						await Notifications.notificationCreate(notiData);

						if (!!user.deviceToken) {
							await Notifications.notification(user.deviceToken, 'You have received a new message.');
						}
					}
				}
			});


			/**
			 * Disconnected manual
			 */
			socket.on('disconnectUser', (id) => {
				const userSocketId = getKeyByValue(users, id);
				console.log('userSocketId----->>', userSocketId);
				socket.broadcast.emit('user-disconnected', userSocketId);
				delete users[userSocketId];
			});

			// /**
			//  * Disconnected
			//  */
			// socket.on('disconnect', (id) => {
			// 	console.log('disconnect----->>', id, 'Total--->', users);
			// 	const userSocketId = getKeyByValue(users, id);
			// 	console.log('userSocketId----->>', socket.id);
			// 	socket.broadcast.emit('user-disconnected', socket.id);
			// 	delete users[socket.id];
			// });

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

