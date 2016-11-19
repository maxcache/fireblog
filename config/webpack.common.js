const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
            loaders: ['ts', 'angular2-template-loader']
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
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
        port: 9010,
        contentBase: 'src/',
        historyApiFallback: true
    }

};