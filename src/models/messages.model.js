const DataTypes = require('sequelize');
const {MessageType} = require('../enum');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define('message', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		chatId: {
			type: Sequelize.UUID,
		},
		senderId: {
			type: Sequelize.UUID,
		},
		fullName: {
			type: Sequelize.STRING,
		},
		source: {
			type: Sequelize.STRING,
		},
		message: {
			type: Sequelize.STRING,
		},
		receiverId: {
			type: Sequelize.UUID,
		},
		appointmentId: {
			type: DataTypes.UUID,
			defaultValue: null,
		},
		requestId: {
			type: DataTypes.UUID,
			defaultValue: null,
		},
		messageType: {
			type: Sequelize.ENUM(
				MessageType.TEXT,
				MessageType.FILE,
				MessageType.IMAGE,
			),
			defaultValue: MessageType.TEXT,
		},
		imageUrl: {
			type: DataTypes.STRING,
			defaultValue: null,
		},
		fileUrl: {
			type: DataTypes.STRING,
			defaultValue: null,
		},
	}, {
		timestamps: true,
	},
	);
};
