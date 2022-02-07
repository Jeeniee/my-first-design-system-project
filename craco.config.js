const emotionPresetOptions = {};

const emotionBabelPreset = require('@emotion/babel-preset-css-prop').default(
    undefined,
    emotionPresetOptions,
);

const cracoAlias = require('craco-alias');

module.exports = {
    babel: {
        plugins: [
            ...emotionBabelPreset.plugins,
            // your other plugins
        ],
    },
    plugins: [
		{
			plugin: cracoAlias,
			options: {
				source: "tsconfig",
				baseUrl: "./src",
				tsConfigPath: "tsconfig.extend.json",
			},
		},
	],
};