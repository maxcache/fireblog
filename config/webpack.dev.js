const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const util = require('./util');

module.exports = webpackMerge(commonConfig, {
    debug: true,
    devtool: 'source-map', 
    output: {
        path: util.root('dist'), 
        publicPath: 'http://localhost:9010/',
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    }  
});