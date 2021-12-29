const DataTypes = require('sequelize');
const {RequestWorkflow} = require('../enum');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		'lawfirm',
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
			email: {
				type: Sequelize.STRING,
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
			logo: {
			  type: Sequelize.STRING,
			},
			images: {
				type: DataTypes.JSONB,
			},
			experience: {
				type: Sequelize.INTEGER,
			},
			numOfLawyer: {
				type: Sequelize.INTEGER,
			},
			jurisdictionid: {
				type: DataTypes.JSONB,
			},
			jurisdiction: {
				type: DataTypes.JSONB,
			},

			expertise: {
				type: Sequelize.STRING,
			},
			workflow: {
				type: Sequelize.ENUM(
					RequestWorkflow.APPROVE,
					RequestWorkflow.REVIEW,
					RequestWorkflow.DRAFT,
					RequestWorkflow.REJECT,
				),
				defaultValue: RequestWorkflow.APPROVE,
			},

			rating: {
				type: Sequelize.STRING,
				allowNull: false,

			},
			assignlawyer: {
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
