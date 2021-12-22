module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		'lawyer',
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
			en_name: {
				type: Sequelize.STRING,
			},
			ar_name: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
			},
			user_id: {
				type: Sequelize.UUID,
			},
			licenseNumber: {
				type: Sequelize.STRING,
			},
			countryId: {
				type: Sequelize.STRING,
			},
			countryTitle: {
				type: Sequelize.STRING,
			},
			languageId: {
				type: Sequelize.STRING,
			},
			languageTitle: {
				type: Sequelize.STRING,
			},
			industryId: {
				type: Sequelize.STRING,
			},
			industryTitle: {
				type: Sequelize.STRING,
			},
			serviceId: {
				type: Sequelize.STRING,
			},
			serviceTitle: {
				type: Sequelize.STRING,
			},
			experience: {
				type: Sequelize.INTEGER,
			},
			jurisdiction: {
				type: Sequelize.STRING,
			},
			expertise: {
				type: Sequelize.STRING,
			},
			rating: {
				type: Sequelize.STRING,
				allowNull: false,
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
