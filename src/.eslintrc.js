module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true,
	},
	'extends': [
		'google',
		'eslint:recommended',
		'plugin:node/recommended',
	],
	'parserOptions': {
		'ecmaVersion': 12,
	},
	'rules': {
		'node/exports-style': ['error', 'module.exports'],
		'node/prefer-global/buffer': ['error', 'always'],
		'node/prefer-global/console': ['error', 'always'],
		'node/prefer-global/process': ['error', 'always'],
		'node/prefer-global/url-search-params': ['error', 'always'],
		'node/prefer-global/url': ['error', 'always'],
		// common
		'no-duplicate-case': 'error',
		'no-bitwise': 0,
		'no-alert': 0,
		'no-duplicate': 0,
		'no-plusplus': 'off',
		'arrow-body-style': 'off',
		'no-extra-boolean-cast': 0,
		'no-underscore-dangle': 'off',
		'class-methods-use-this': 'off',
		'no-void': 'off',
		'no-restricted-syntax': 'off',
		'max-len': ['warn', {code: 80, ignoreComments: true, ignoreUrls: true}],
		'indent': [2, 'tab'],
		'no-tabs': 0,
		'no-mixed-spaces-and-tabs': 0,
	},
};
