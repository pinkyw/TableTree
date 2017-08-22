var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
	entry:  __dirname + "/examples/main.js",
	output: {
		path: __dirname,
		filename: "./dist/main.min.js"
	},
	devtool: 'eval',
	module: {
		loaders: [
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				loaders: ['vue-loader'],
			},
			{
				test: /\.js$/,
				loader: ['babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader", options: {
						sourceMap: true
					}
				}, {
					loader: "sass-loader", options: {
						sourceMap: true
					}
				}]
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false,
			},
			compress: {
				warnings: false
			}
		}),
		new ExtractTextPlugin('/examples/main.min.css'),
		new OptimizeCssAssetsPlugin()
	],
	resolve: { 
		alias: { 
			'vue': 'vue/dist/vue.js' 
		} 
	},
	devServer: {
		contentBase: "./examples",//本地服务器所加载的页面所在的目录
		inline: true,//实时刷新,
		hot: true,
		port: 9094,
		proxy: {
			"/statsrv": {
			target: "http://easy-mock.com/mock/599bd1b4059b9c566dcad24f/",
			secure: false,
			changeOrigin: true
		}
	}
  }
};
