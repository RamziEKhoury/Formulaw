module.exports = (sequelize, Sequelize) => {
	return sequelize.define('footer', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		header: {
			type: Sequelize.STRING,
		},
		description: {
			type: Sequelize.STRING,
		},
		social: {
			type: Sequelize.JSON,
			get() {
				return JSON.parse(this.getDataValue('social'));
			},
			set(value) {
				return this.setDataValue('social', JSON.stringify(value));
			},
		},
		titleOne: {
			type: Sequelize.STRING,
		},

        titleOneDescription: {
			type: Sequelize.JSON,
			get() {
				return JSON.parse(this.getDataValue('titleOneDescription'));
			},
			set(value) {
				return this.setDataValue('titleOneDescription', JSON.stringify(value));
			},
		},
        titleTwo: {
			type: Sequelize.STRING,
		},

        titleTwoDescription: {
			type: Sequelize.JSON,
			get() {
				return JSON.parse(this.getDataValue('titleTwoDescription'));
			},
			set(value) {
				return this.setDataValue('titleTwoDescription', JSON.stringify(value));
			},
		},
		copy_right: {   
			type: Sequelize.STRING,
		},
    }
        );
    };

