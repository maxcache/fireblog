const webpack = require('webpack');
const util = require('./util');

module.exports = {
    entry: {
        vendor: './client/vendor.ts',
        main: './client/main.tsx'
    },
    output: {
        //when using with webpack-stream and gulp directily streams the output to dest folders
        //added exclusion to gulp clientResources task to exclude this folder contents if created in testing
        path: util.root('client/dist'),
        filename: "[name].js",
    },
    resolve: {
        root: util.root('client'),
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [{
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'. 
            test: /\.tsx?$/,
            exclude: [
                util.root('client/dist'),
            ],            
            loader: "awesome-typescript-loader"
        }],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]

    },
    plugins: [new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor'].reverse()
    }), ]
};