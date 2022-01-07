const DataTypes = require('sequelize');
const {MessageType} = require('../enum');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define('chat', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		senderId: {
			type: Sequelize.UUID,
		},
		firstname: {
			type: Sequelize.STRING,
		},
		lastname: {
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
			type: DataTypes.JSONB,
			
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
