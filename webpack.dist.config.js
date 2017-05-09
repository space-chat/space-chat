'use strict';

var webpack = require('webpack');

module.exports = {
  entry: './app/main.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
// var webpack = require('webpack')
// var path = require('path');
// module.exports = {
//   entry: 'index',
//   output: {
//     path: path.join(__dirname, 'scripts'),
//     filename: 'bundle.js'
//   },
//   module: {
//     loaders: [
//       { test: /\.json$/, loader: 'json-loader' }
//     ]
//   },
//   resolve: {
//     extensions: ['', '.webpack.js', '.web.js', '.js']
//   },
//   node: {
//     console: 'empty',
//     fs: 'empty',
//     net: 'empty',
//     tls: 'empty'
//   }
// };