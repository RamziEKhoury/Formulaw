module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		'lawfirm_industry',
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			lawFirmId: {
				type: Sequelize.UUID,
			},

			industryId: {
				type: Sequelize.UUID,
			},

			title: {
				type: Sequelize.STRING,
			},

			discription: {
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
