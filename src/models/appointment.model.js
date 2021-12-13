module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		'appointment',
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},

			queryId: {
				type: Sequelize.UUID,

			},

			adminId: {
				type: Sequelize.UUID,

			},
			customerId: {
				type: Sequelize.UUID,

			},
			lawFirmId: {
				type: Sequelize.UUID,
			},

			orderId: {
				type: Sequelize.INTEGER,
			},

			shift: {
				type: Sequelize.ENUM('morning', 'afternoon', 'evening'),
			},
			status: {
				defaultValue: 'PENDING',
				type: Sequelize.ENUM('CREAT_LEAD', 'PAYMENT', 'APPROVE', 'REJECT', 'COMPLETED', 'PENDING', 'FREE_CONSULTATION', 'CONSULTATION',
				),
			},
			workflow: {
				defaultValue: 'PENDING',
				type: Sequelize.ENUM('CREAT_LEAD', 'PAYMENT', 'APPROVE', 'REJECT', 'COMPLETED', 'PENDING', 'FREE_CONSULTATION', 'CONSULTATION',
				),
			},
			date: {
				type: Sequelize.STRING,
			},
			time: {
				type: Sequelize.STRING,
			},
			endTime: {
				type: Sequelize.STRING,
			},
			scheduleAt: {
				type: Sequelize.STRING,
			},
		},
		{
			timestamps: true,
		},
	);
};
