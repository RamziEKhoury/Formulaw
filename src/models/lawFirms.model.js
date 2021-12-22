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
			// logo: {
			//   type: Sequelize.STRING,
			//   defaultValue:
			//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA6CTxPl6iceBCryzjbmL3PAx36dRTYoij3Q&usqp=CAU',
			// },
			// images: {
			//   type: Sequelize.ARRAY(
			//     Sequelize.ENUM({
			//       values: [
			//         'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
			//         'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg',
			//         'https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270',
			//       ],
			//     })
			//   ),
			//   allowNull: false,
			// },
			experience: {
				type: Sequelize.INTEGER,
			},
			numOfLawyer: {
				type: Sequelize.INTEGER,
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
				defaultValue: 1,
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
