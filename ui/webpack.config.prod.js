const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// var PurifyCssPlugin = require('purifycss-loader/PurifyCssPlugin');
var purify = require("purifycss-webpack-plugin");
var extractor = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        './src/app.js'
    ],
    resolve: {
        extensions: ['', '.js', 'css']
    },
    modulesDirectories: ["node_modules"],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        // new extractor("purified.css"),
        new purify({
            basePath: __dirname,
            paths: [
                "index.html"
            ]
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        }),

        // new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
                test: /\.css$/,
                // loader:  extractor.extract("style-loader", "css-loader")
                loader : 'file-loader'
            }]
            // loaders: [{
            //         test: /\.css$/,
            //         loader: "file-loader",
            //         include: path.join(__dirname, 'src')
            //     },
            //  {
            //     test: /\.js?$/,
            //     loader: 'babel',
            //     query: {
            //         cacheDirectory: './cache',
            //         presets: ["es2015", "stage-0"]
            //     },
            //     include: path.join(__dirname, 'src')
            // }, {
            //     test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
            //     loader: 'url-loader?limit=100000'
            // }
            // ]
    }
}
