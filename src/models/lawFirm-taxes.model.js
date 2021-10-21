module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		'lawfirm_taxes',
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

			countryId: {
				type: Sequelize.UUID,
			},
			countryTitle:{
				type: Sequelize.STRING,
			},

			taxType: {
				type: Sequelize.STRING,
			},

			tax: {
				type: Sequelize.STRING,
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
