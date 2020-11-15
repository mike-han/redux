const { merge } = require("webpack-merge");
const path = require('path');
const common = require('./webpack.config.common');

module.exports = merge(common, {
  entry: path.resolve(__dirname, '../src/redux/index'),
  output: {
    filename: 'redux.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'redux',
    libraryTarget: 'umd',
  }
})