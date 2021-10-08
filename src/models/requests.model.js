const {RequestWorkflow} = require('../enum');
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
			jurisdictionId: {
			  type: Sequelize.UUID,
			},
			jurisdictionName: {
				type: Sequelize.STRING,
			},
			languageId: {
				type: Sequelize.UUID,
			},
			languageName: {
				type: Sequelize.STRING,
			},
			legalFieldId: {
				type: Sequelize.UUID,
			},
			legalFieldName: {
				type: Sequelize.STRING,
			},
			serviceSubcategoryId: {
				type: Sequelize.UUID,
			},
			serviceSubcategoryName: {
				type: Sequelize.STRING,
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
			status: {
				defaultValue: RequestWorkflow.NEW,
				type: Sequelize.ENUM(
					RequestWorkflow.NEW,
					RequestWorkflow.APPROVED,
					RequestWorkflow.COMPLETED,
					RequestWorkflow.REJECTED,
					RequestWorkflow.PENDING,
				),
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
