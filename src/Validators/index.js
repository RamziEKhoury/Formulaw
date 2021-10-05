const userValidator = require('./User.validator');
const rolesValidator = require('./Role.validator');
const countriesValidator = require('./Country.validator');
const languagesValidator = require('./Language.validator');
const industrialValidator = require('./Industrial.validator');
const serviceValidator = require('./Services.validator');
const serviceSubcategoryValidator = require('./Service-subcategories.validator');
const lawFirmValidator = require('./lawFirm.validator');
const requestValidator = require('./Request.validator');


module.exports = {
	userValidator,
	rolesValidator,
	countriesValidator,
	languagesValidator,
	industrialValidator,
	serviceValidator,
	serviceSubcategoryValidator,
	lawFirmValidator,
	requestValidator,
};
