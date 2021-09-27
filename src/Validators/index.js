const userValidator = require('./User.validator');
const rolesValidator = require('./Role.validator');
const countriesValidator = require('./Country.validator');
const languagesValidator = require('./Language.validator');
const industrialValidator = require('./Industrial.validator');
const serviceValidator = require('./Services.validator');
const serviceSubcategoryValidator = require('./Service-subcategories.validator');

module.exports = {
	userValidator,
	rolesValidator,
	countriesValidator,
	languagesValidator,
	industrialValidator,
	serviceValidator,
	serviceSubcategoryValidator,
};
