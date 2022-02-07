module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		'service-subcategory',
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			serviceId: {
				type: Sequelize.UUID,
				allowNull: false,
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
			sortnumber: {
				type: Sequelize.INTEGER,
			},
			// isBillable: {
			//   defaultValue: 0,
			//   type: Sequelize.ENUM('0', '1'),
			// },
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
