const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const util = require('./util');


module.exports = {
    entry: {
        polyfills: './src/polyfills.ts',
        vendor: './src/vendor.ts',
        main: './src/main.ts'

    },
    output: {
        path: util.root('dist')
    },
    resolve: {
        root: util.root('src'),
        extensions: ['', '.ts', '.js', '.css']
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader']
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'file?name=assets/[name].[hash].[ext]'
        }, {
            test: /\.css$/,
            exclude: util.root('src', 'app'),
            loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
        },  {
            test: /\.css$/,
            include: util.root('src', 'app'),
            loader: 'raw'
        }]

    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    devServer: {
        host: 'localhost',
        port: 9000,
        contentBase: 'src/',
        historyApiFallback: true
    }

};