const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: "development",
    entry: {
        bundle: './index.js',
        user: './userPage/user.js',
        settings: './settingsPage/settings.js'
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            chunks: ['bundle']
        }),
        new HTMLWebpackPlugin({
            filename: 'user.html',
            template: 'userPage/user.html',
            chunks: ['user']
        }),
        new HTMLWebpackPlugin({
            filename: 'settings.html',
            template: 'settingsPage/settings.html',
            chunks: ['settings']
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpeg|svg)$/,
                use: ['file-loader']
            }
        ]
    }
}