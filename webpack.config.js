const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        scripts: [
            './node_modules/@material/icon-button/component.js',
            './node_modules/@material/list/component.js',
            './node_modules/@material/top-app-bar/component.js',
            './src/ts/index.ts',
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.min.css',
        })
    ],
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'app', '_bundles'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    devServer: {
        compress: false,
        contentBase: path.join(__dirname, 'app'),
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        quiet: false,
        serveIndex: true,
        stats: 'normal',
        watchContentBase: true,
        writeToDisk: true
    }
};
