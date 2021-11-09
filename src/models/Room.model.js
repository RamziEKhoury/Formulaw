module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		'room',
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			appointmentId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			customerId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			adminId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			roomName: {
				type: Sequelize.STRING,
			},
			isActive: {
				type: Sequelize.INTEGER,
			},
			isDeleted: {
				defaultValue: 0,
				type: Sequelize.INTEGER,
			},
		},
		{
			timestamps: true,
		},
	);
};
