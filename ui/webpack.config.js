const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        // 'webpack/hot/only-dev-server',
        // './src/app.js'
    ],
    resolve: {
        extensions: ['', '.js']
    },
    modulesDirectories: ["node_modules"],
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        // new webpack.HotModuleReplacementPlugin(),
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
        }, {
            test: /\.html$/,
            loader: "raw-loader"
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        historyApiFallback: true,
        // hot: true,
        progress: true,
        stats: 'errors-only',
        port: 3000,
        host: '0.0.0.0'
    }
}
