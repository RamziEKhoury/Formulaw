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
				defaultValue: 'pending',
				type: Sequelize.ENUM('pending', 'free consultation', 'approved', 'payment', 'consultation', 'completed'),
			},

			workflow: {
				defaultValue: 'pending',
				type: Sequelize.ENUM('pending', 'free consultation', 'approved', 'payment', 'consultation', 'completed'),
			},

			date: {
				type: Sequelize.STRING,
			},

			time: {
				type: Sequelize.STRING,
			},

		},
		{
			timestamps: true,
		},
	);
};
