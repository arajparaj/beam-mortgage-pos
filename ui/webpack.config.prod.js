const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [
        './src/app.js'
    ],
    resolve: {
        extensions: ['', '.js']
    },
    modulesDirectories: ["node_modules"],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        }),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css'],
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
            loader: 'url-loader?limit=100000'
        }]
    }
}
