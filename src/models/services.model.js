module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		'servicenew',
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			en_name: {
				type: Sequelize.STRING,
			},
			ar_name: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			isBillable: {
				defaultValue: 0,
				type: Sequelize.INTEGER,
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
