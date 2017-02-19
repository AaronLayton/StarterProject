const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prePath = './';
const FrontendConfig = require(prePath + 'frontend.config');

const env = process.env.WEBPACK_ENV.trim();

console.log('-----------------------');
console.log('|' + env + '|');
console.log('-----------------------');

// Bit of duplication
const PATHS = {
    app: path.join(__dirname, prePath, 'content/js'),
    build: path.join(__dirname, 'build')
};

var settings = {
    entry: FrontendConfig.entryFiles,
    output: {
        path: PATHS.build,
        filename: 'js/[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: PATHS.app,
            loader: 'babel-loader',
            options: {
                cacheDirectory: true
            }
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{ loader: 'css-loader', options: { url: false } }, 'postcss-loader']
            })
        },{
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{ loader: 'css-loader', options: { url: false } }, 'less-loader']
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'global',
            // (the commons chunk name)

            filename: 'js/global.js',
            // (the filename of the commons chunk)

            minChunks: 2,
            // (Modules must be shared between 3 entries)
        }),
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: './index.html'
        })
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, prePath, './Content/bower_components'),
            'node_modules'
        ],
        descriptionFiles: [
            'package.json',
            'bower.json'
        ],
    },
    devtool: 'source-map'
};

if (env == 'dev') {
    settings.devServer = {
        contentBase: '.',
        host: FrontendConfig.host,
        port: FrontendConfig.port
    };
}

module.exports = settings;
