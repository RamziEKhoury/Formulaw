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

			shift: {
				type: Sequelize.ENUM('morning', 'afternoon', 'evening'),
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
