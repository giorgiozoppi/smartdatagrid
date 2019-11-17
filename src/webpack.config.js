const path = require('path');
const webpack = require('webpack');

const lineGridExport = {
	target: 'web',
	entry: {
        main: [
		'./src/ExtendedGridMagnifier.jsx',
		'./src/AbstractColumnFactory.js',
		'./src/ComponentArray.jsx',
		'./src/GridSettingSaver.js',
            	'./src/linegridcomponent.js'
		]
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'linegridcomponent.bundle.js',
		libraryTarget: 'var',
		globalObject: 'this',
		libraryExport: 'react'
	},
	devServer: {
		contentBase: ".",
		host: "localhost",
		port: 9000
	},
	module: {
		rules: [
            {
				test: /(\.m?js$|\.jsx)/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-transform-async-to-generator',
								  '@babel/plugin-syntax-dynamic-import',
								  '@babel/plugin-transform-runtime',
								  '@babel/plugin-proposal-class-properties']
					}
				}
			},
            {
	            test: /\.css$/,
	            use: ['style-loader', 'css-loader']
	 	   }
		]
    },
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	optimization: {
		minimize: false,
	},
	plugins: [
		new webpack.ProvidePlugin({
			join: ['lodash']
		})
		,
		new webpack.ProvidePlugin({
			"React": "react",
		 })	
	]
};
module.exports = [lineGridExport];