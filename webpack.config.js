const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
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
        new MiniCssExtractPlugin({
            filename: 'styles.min.css',
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: false,
            protectWebpackAssets: true,
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
        minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin({})],
    },
    devServer: {
        client: {
            overlay: {
                warnings: true,
                errors: true
            },
        },
        compress: false,
        open: true,
        static: {
            directory: path.join(__dirname, 'app'),
            publicPath: '/',
            serveIndex: true,
            watch: true
        }
    }
};
