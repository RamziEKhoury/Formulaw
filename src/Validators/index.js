const adminUserValidator = require('./adminUser.validator');
const rolesValidator = require('./Role.validator');
const countriesValidator = require('./Country.validator');
const languagesValidator = require('./Language.validator');
const industrialValidator = require('./Industrial.validator');
const serviceValidator = require('./Services.validator');
const serviceSubcategoryValidator = require('./Service-subcategories.validator');
const lawFirmValidator = require('./lawFirm.validator');
const requestValidator = require('./Request.validator');
const lawFirmIndustryValidator= require('./LawFirm-industries.validator')
const lawFirmServiceValidator= require('./lawFirm-service.validator')
const userValidator = require('./User.validator')

module.exports = {
	adminUserValidator,
	rolesValidator,
	countriesValidator,
	languagesValidator,
	industrialValidator,
	serviceValidator,
	serviceSubcategoryValidator,
	lawFirmValidator,
	requestValidator,
	lawFirmIndustryValidator,
	lawFirmServiceValidator,
	userValidator
};
