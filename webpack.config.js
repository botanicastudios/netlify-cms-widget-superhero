const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const developmentConfig = {
	mode: 'development',
	entry: './dev/index.js',
	output: {
		path: path.resolve(__dirname, 'public')
	},
	module: {
		rules: [{
				test: /\.js$/,
				loader: 'source-map-loader',
				enforce: 'pre',
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin()
	],
	devtool: 'eval-source-map',
	node: {
		fs: "empty"
	}
}

const productionConfig = {
	mode: 'production',
	output: {
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [{
				test: /\.js$/,
				loader: 'source-map-loader',
				enforce: 'pre',
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|vendor)/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader'],
			},
		],
	},
	devtool: 'source-map',
}

module.exports = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig
