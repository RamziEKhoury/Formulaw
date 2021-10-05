const {RequestWorkflow} = require('../enum');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		'request',
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
			  type: Sequelize.STRING,
			  allowNull: false,
			},
			jurisdictionId: {
			  type: Sequelize.UUID,
			},
			languageId: {
				type: Sequelize.UUID,
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
