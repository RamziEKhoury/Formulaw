const DataTypes = require("sequelize");
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
				type: DataTypes.JSONB,
			},
			countryTitle: {
				type: DataTypes.JSONB,
			},
			languageId: {
				type: DataTypes.JSONB,
			},
			languageTitle: {
				type: DataTypes.JSONB,
			},
			industryId: {
				type: DataTypes.JSONB,
			},
			industryTitle: {
				type: DataTypes.JSONB,
			},
			serviceId: {
				type: DataTypes.JSONB,
			},
			serviceTitle: {
				type: DataTypes.JSONB,
			},
			experience: {
				type: Sequelize.INTEGER,
			},
			jurisdictionid: {
				type: DataTypes.JSONB,
			},
			jurisdiction: {
				type: DataTypes.JSONB,
			},
			expertise: {
				type: DataTypes.STRING(2048),
			},
			rating: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			isActive: {
				type: Sequelize.INTEGER,
			},
			logo: {
				type: Sequelize.STRING,
			},
			images: {
				type: DataTypes.JSONB,
			},
			gender: {
				type: Sequelize.ENUM('male', 'female',),
				defaultValue: 'male',
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
