'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { 
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js']
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

// module.exports = {
//   entry: './app/index.js',
//   output: {
//     path: __dirname,
//     filename: './public/bundle.js'
//   },
//   context: __dirname,
//   devtool: 'source-map',
//   module: {
//     loaders: [
//       {
//         test: /jsx?$/,
//         exclude: /(node_modules|bower_components)/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['react', 'es2015']
//         }
//       }
//     ]
//   }
// };
