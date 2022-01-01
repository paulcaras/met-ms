const path = require('path');

module.exports = {
	outputDir: 'dist',
	assetsDir: 'static',
	pages: {
		index: {
			entry: 'src/main.js',
			template: 'public/index.html'
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src')
			}
		},
		devServer: {
			disableHostCheck: true
		}		
	},
	chainWebpack: config => {
		config.plugin('copy').use(require('copy-webpack-plugin'), [[{
			from: path.resolve(__dirname, 'public'),
			to: path.resolve(__dirname, 'dist'),
			toType: 'dir',
			ignore: ['.DS_Store']
		}]]);
	}
}
