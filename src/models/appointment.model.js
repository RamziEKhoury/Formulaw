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
				allowNull: false,

			},

			adminId: {
				type: Sequelize.UUID,
				allowNull: false,

			},
			customerId: {
				type: Sequelize.UUID,
				allowNull: false,

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
