var webpack = require('webpack');
var path = require('path');
var libraryName = 'react-chart';
var outputFile = libraryName + '.js';

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
    entry: APP_DIR + '/index.js',
    devtool: 'source-map',
    output: {
        path: BUILD_DIR,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: outputFile
    },
    module : {
        rules : [
            { 
                test : /\.js?/,
                include : APP_DIR,
                exclude: /(node_modules|bower_components)/,
                use : 'babel-loader'
            },
            { 
                test: /\.css$/, 
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    }
};

module.exports = config;