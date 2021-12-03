const {NotificationType} = require("../enum");
module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		'notification',
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},

			title: {
				type: Sequelize.STRING,
			},

			message: {
				type: Sequelize.STRING,
			},

			senderName: {
				type: Sequelize.STRING,
			},

			senderId: {
				type: Sequelize.STRING,
			},
			senderType: {
				type: Sequelize.STRING,
			},
			receiverid: {
				type: Sequelize.STRING,
			},
			notificationType: {
				type: Sequelize.ENUM(
					NotificationType.CREAT_LEAD,
					NotificationType.SCHEDULE_LEAD,
					NotificationType.APPROVE_LEAD,
					NotificationType.FURTHER_STATUS,
				),
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			target: {
				type: Sequelize.STRING,
			},
		},
		{
			timestamps: true,
		},
	);
};
