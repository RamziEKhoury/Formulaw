const config = require('../Config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	operatorsAliases: false,

	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.adminUser = require('./adminUsers.model')(sequelize, Sequelize);
db.role = require('./roles.model')(sequelize, Sequelize);
db.country = require('./countries.model')(sequelize, Sequelize);
db.language = require('./languages.model')(sequelize, Sequelize);
db.industrial = require('./industrials.model')(sequelize, Sequelize);
db.service = require('./services.model')(sequelize, Sequelize);
db.service_subCategory = require('./service-subcategory.model')(sequelize,Sequelize);
db.lawFirm = require('./lawFirms.model')(sequelize, Sequelize);
db.request = require('./requests.model')(sequelize, Sequelize);
db.lawFirm_industry = require('./lawFirm-industry.model')(sequelize,Sequelize);
db.lawFirm_service = require('./lawFirm-services.model')(sequelize,Sequelize);
db.user = require('./users.model')(sequelize,Sequelize);
db.appointment = require('./appointment.model')(sequelize,Sequelize);

module.exports = db;
