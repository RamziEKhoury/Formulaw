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
db.service_subCategory = require('./service-subcategory.model')(
	sequelize,
	Sequelize,
);
db.lawFirm = require('./lawFirms.model')(sequelize, Sequelize);
db.request = require('./requests.model')(sequelize, Sequelize);
db.lawFirm_industry = require('./lawFirm-industry.model')(sequelize, Sequelize);
db.user = require('./users.model')(sequelize, Sequelize);
db.appointment = require('./appointment.model')(sequelize, Sequelize);
db.testimonial = require('./testimonial.model')(sequelize, Sequelize);
db.lawyer = require('./lawyers.model')(sequelize, Sequelize);
db.lawFirm_industry = require('./lawFirm-industry.model')(sequelize, Sequelize);
db.lawFirm_service = require('./lawFirm-services.model')(sequelize, Sequelize);
db.lawFirm_tax = require('./lawFirm-taxes.model')(sequelize, Sequelize);
db.community = require('./community.model')(sequelize, Sequelize);
db.communityType = require('./communityType.model')(sequelize, Sequelize);
db.subscription = require('./subscription.model')(sequelize, Sequelize);
db.banner = require('./banner.model')(sequelize, Sequelize);
db.subscription = require('./subscription.model')(sequelize, Sequelize);
db.banner = require('./banner.model')(sequelize, Sequelize);
db.journey = require('./journey.model')(sequelize, Sequelize);
db.room = require('./Room.model')(sequelize, Sequelize);
db.kyc = require('./kyc.model')(sequelize, Sequelize);
db.chat = require('./chat.model')(sequelize, Sequelize);
db.message = require('./messages.model')(sequelize, Sequelize);
db.Company_kyc = require('./companyKyc.model')(sequelize, Sequelize);
db.notification = require('./notification.model')(sequelize, Sequelize);
db.preOrder = require('./preOrder.model')(sequelize, Sequelize);
db.policy = require('./policy.model')(sequelize, Sequelize);
db.userSubscription = require('./userSubscription.model')(sequelize, Sequelize);

db.userSubscription.hasOne(db.user, {sourceKey: 'userId', foreignKey: 'id'});
db.userSubscription.hasOne(db.subscription, {sourceKey: 'subscriptionId', foreignKey: 'id'});
db.preOrder.hasOne(db.request, {sourceKey: 'queryId', foreignKey: 'id'});
db.preOrder.hasOne(db.appointment, {sourceKey: 'appointmentId', foreignKey: 'id'});
db.kyc.hasOne(db.user, {sourceKey: 'userId', foreignKey: 'id'});
db.Company_kyc.hasOne(db.user, {sourceKey: 'userId', foreignKey: 'id'});
db.testimonial.hasOne(db.user, {sourceKey: 'userId', foreignKey: 'id'});
db.appointment.hasOne(db.user, {sourceKey: 'customerId', foreignKey: 'id'});
db.appointment.hasOne(db.adminUser, {sourceKey: 'adminId', foreignKey: 'id'});
db.appointment.hasOne(db.request, {sourceKey: 'queryId', foreignKey: 'id'});
db.appointment.hasOne(db.lawFirm, {sourceKey: 'lawFirmId', foreignKey: 'id'});
db.appointment.hasOne(db.lawyer, {sourceKey: 'lawyerId', foreignKey: 'id'});
db.lawyer.hasOne(db.testimonial, {sourceKey: 'user_id', foreignKey: 'lawyerid'});
db.lawFirm.hasMany(db.testimonial, {sourceKey: 'id', foreignKey: 'lawFirmId'});

db.lawFirm.hasMany(db.lawFirm_service, {
	sourceKey: 'id',
	foreignKey: 'lawFirmId',
});
db.lawFirm.hasMany(db.lawFirm_industry, {
	sourceKey: 'id',
	foreignKey: 'lawFirmId',
});
db.lawFirm.hasMany(db.lawFirm_tax, {
	sourceKey: 'id',
	foreignKey: 'lawFirmId',
});
db.chat.hasMany(db.message, {sourceKey: 'id', foreignKey: 'chatId'});

module.exports = db;