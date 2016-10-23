var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
const util = require('./util');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production'

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    output: {
        path: util.root('dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    htmlLoader: {
        minimize: false // workaround for ng2
    },
    plugins: [
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        })
        , new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]
});