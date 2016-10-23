const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const util = require('./util');
module.exports = webpackMerge(commonConfig, {
    debug: true,
    devtool: 'source-map', 
    output: {
        path: util.root('dist'), 
        publicPath: 'http://localhost:9000/',
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new DefinePlugin({
            ENV: JSON.stringify('dev')
        })
    ]
});