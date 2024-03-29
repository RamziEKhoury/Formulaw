const {RequestWorkflow} = require('../enum');
const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		'query',
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			firstName: {
				type: Sequelize.STRING,
			},
			lastName: {
				type: Sequelize.STRING,
			},
			email: {
			  type: Sequelize.STRING,
			},
			getstarted: {
				type: Sequelize.STRING,
			},
			industryTitle: {
				type: Sequelize.STRING,
			},
			industryId: {
				type: Sequelize.UUID,
			},
			jurisdictionId: {
				type: DataTypes.ARRAY(DataTypes.STRING(256)),
			},
			jurisdictionName: {
				type: DataTypes.ARRAY(DataTypes.STRING(256)),
			},
			languageId: {
				type: DataTypes.ARRAY(DataTypes.STRING(256)),
			},
			languageName: {
				type: DataTypes.ARRAY(DataTypes.STRING(256)),
			},
			legalFieldId: {
				type: Sequelize.UUID,
			},
			legalFieldName: {
				type: Sequelize.STRING,
			},
			serviceSubcategoryId: {
				type: DataTypes.ARRAY(DataTypes.STRING(256)),
			},
			serviceSubcategoryName: {
				type: DataTypes.ARRAY(DataTypes.STRING(256)),
			},
			budgetMin: {
				type: Sequelize.INTEGER,
			},
			budgetMax: {
				type: Sequelize.INTEGER,
			},
			rating: {
				type: Sequelize.STRING,
			},
			experience: {
				type: Sequelize.STRING,
			},
			cost: {
				type: Sequelize.INTEGER,
			},
			status: {
				defaultValue: RequestWorkflow.NEW,
				type: Sequelize.ENUM(
					RequestWorkflow.NEW,
					RequestWorkflow.APPROVE,
					RequestWorkflow.COMPLETED,
					RequestWorkflow.REJECT,
					RequestWorkflow.PENDING,
				),
			},
			type: {
				defaultValue: 'lead',
				type: Sequelize.ENUM('lead', 'subscription'),
			},
			questionOne: {
				type: DataTypes.STRING(2048),
			},
			questionTwo: {
				type: DataTypes.STRING(2048),
			},
			questionThree: {
				type: DataTypes.STRING(2048),
			},
			questionFour: {
				type: DataTypes.STRING(2048),
			},
			questionFive: {
				type: DataTypes.STRING(2048),
			},
			isActive: {
				defaultValue: 0,
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
