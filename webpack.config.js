const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),

  // entry - where to start bundling from
  entry: {
    app: './js/app.js',
    styles: './css/style.scss',
  },

  // output - where to place the created bundles
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/dist/',
  },

  // loaders - transform files into modules that can be included in the bundle
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'stage-3'] },
        }],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer('last 2 version')]
            }
          }],
          fallback: 'style-loader'
        })
      },
    ]
  },
  // plugins - handle any extra processes
  plugins: [
    new ExtractTextPlugin('[name].min.css'),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
