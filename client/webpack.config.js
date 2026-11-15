const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

// `webpack --env demo` builds the static showcase (GitHub Pages):
// no server, the API is imitated in the browser (src/demo).
module.exports = (env = {}) => {
  const demo = !!env.demo;
  const inlineImages = /inline/;

  return {
    mode: 'production',
    entry: demo ? './src/demo/entry.jsx' : './src/index.jsx',
    output: {
      path: demo ?
        path.resolve(__dirname, 'demo-dist') :
        path.resolve(__dirname, '..', 'server', 'dist', 'view'),
      // hashed in the demo so static hosting (GitHub Pages) never serves a stale bundle
      filename: demo ? 'bundle.[contenthash:8].js' : 'bundle.js',
      chunkFilename: '[id].js',
      publicPath: demo ? '' : '/',
      clean: demo
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: demo ? { axios$: path.resolve(__dirname, 'src/demo/mockAxios.js') } : {}
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/transform-runtime'
            ]
          }
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          resourceQuery: { not: [inlineImages] },
          type: 'asset/resource',
          generator: { filename: 'imgs/[name][ext]' }
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          resourceQuery: inlineImages,
          type: 'asset/inline'
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
          type: 'asset/resource',
          generator: { filename: 'fonts/[name][ext]' }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        filename: 'index.html',
        inject: 'body',
        favicon: './src/styles/imgs/dich-icon.png'
      }),
      // the demo has no .env: any other process.env.X resolves to undefined
      // instead of throwing "process is not defined" in the browser
      demo ?
        new webpack.DefinePlugin({ 'process.env': JSON.stringify({ APP_ADDR: '', DICHBOX_DEMO: true }) }) :
        new Dotenv(),
      new webpack.DefinePlugin({ 'process.env.DICHBOX_DEMO': JSON.stringify(demo) })
    ],
    devServer: {
      port: process.env.DEV_SERVER_PORT || 7042,
      host: process.env.DEV_SERVER_HOST || 'localhost',
      historyApiFallback: true,
      hot: true,
      open: true
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  };
};
