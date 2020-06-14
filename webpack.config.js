const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        styles: [
            './node_modules/prismjs/themes/prism-tomorrow.css',
            './src/css/index.css',
        ],
        scripts: [
            './node_modules/@material/top-app-bar/component.js',
            './node_modules/@material/list/component.js',
            './node_modules/@songhay/input-autocomplete/lib/index.js',
            './src/ts/index.ts'
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
        })
    ],
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'app', '_bundles'),
    },
    mode: 'production',
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
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
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
