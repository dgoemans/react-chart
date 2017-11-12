var webpack = require('webpack');
var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')


var BUILD_DIR = path.resolve(__dirname, 'examples/dist/');
var APP_DIR = path.resolve(__dirname, 'examples/src/');

var config = {
    entry: APP_DIR + '/index.js',
    devtool: 'source-map',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    plugins: [
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: ['./examples/']
            },
            notify: false,
            logLevel: 'debug'
        })
    ],
    module : {
        rules : [
            { 
                test : /\.js?/,
                include : APP_DIR,
                use : 'babel-loader'
            },
            { 
                test: /\.css$/, 
                include : APP_DIR,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    }
};

module.exports = config;