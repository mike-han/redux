const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require("webpack-merge");
const path = require('path');
const common = require('./webpack.config.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  entry: path.resolve(__dirname, '../src/index.jsx'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000
  },
  resolve: {
    alias: {
      redux$: './redux',
    },
    extensions: ['.js', '.jsx']
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  }), new CleanWebpackPlugin() ]
})