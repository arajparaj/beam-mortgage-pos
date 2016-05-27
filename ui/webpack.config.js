const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        // 'babel-polyfill',
        './src/app.jsx'
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css'],
            include: path.join(__dirname, 'assets')
        }, {
            test: /\.(js|jsx)?$/,
            loader: 'babel',
            query: {
                cacheDirectory: './cache',
                presets: ["react", "es2015", "stage-0", "react-hmre"]
            },
            include: path.join(__dirname, 'src')
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        hot: true,
        progress: true,
        stats: 'errors-only',
        port: 3000
    }
}
