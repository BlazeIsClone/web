module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: ['@trbl', 'plugin:@typescript-eslint/recommended', 'next'],
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	rules: {
		indent: 'off',
		'no-tabs': 0,
		'arrow-parens': 'off',
		'react/jsx-indent-props': 'off',
		'@typescript-eslint/no-explicit-any': ['off'],
		'react/jsx-indent': 'off',
		'react/jsx-filename-extension': [
			2,
			{ extensions: ['.js', '.jsx', '.ts', '.tsx'] },
		],
		'react/jsx-max-props-per-line': 'off',
		'import/prefer-default-export': 'off',
		'react/prop-types': 'off',
		'react/no-unused-prop-types': 'off',
		'react/require-default-props': 'off',
		'no-underscore-dangle': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
	},
	overrides: [
		{
			files: ['*.js'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
	],
};
