const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var purify = require("purifycss-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
        filename: 'bundle-[hash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        }),
        new ExtractTextPlugin("style-[contenthash].css"),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
            include: path.join(__dirname, 'src')
        }, {
            test: /\.js?$/,
            loader: 'babel',
            query: {
                cacheDirectory: './cache',
                presets: ["es2015", "stage-0"]
            },
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
            loader: 'url-loader?limit=10'
        }]
    }
}
