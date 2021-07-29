const path = require('path');

module.exports = {
	mode: 'production',
	watch: true,
	entry: [
		__dirname + '/devel/scss/main.scss',
		__dirname + '/devel/js/main.es6'
	],
	output: {
		path: path.resolve(__dirname, 'public/'),
		filename: "js/app.js",
		library: "Etnetera",
		libraryTarget: "var"
	},
	module: {
		rules: [{
				test: /\.es6?$/,
				exclude: /(node_modules(?!\/packageNameToTransform\/)|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					},
				},
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [{
						loader: 'file-loader',
						options: {
							outputPath: 'css/',
							name: '[name].min.css'
						}
					},
					'sass-loader'
				]
			}
		]
	},
	resolve: {
		extensions: [".js", ".es6"],
		alias: {
			utils: path.resolve(__dirname, "public/"), //eslint-disable-line
		},
	},
};