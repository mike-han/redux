const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  merge
} = require("webpack-merge");
const path = require('path');

const common = {
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      }
    }],
  },
  devtool: 'inline-cheap-module-source-map'
};

const redux = merge(common, {
  entry: path.resolve(__dirname, './src/redux/index'),
  output: {
    filename: 'redux.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    library: 'redux',
    libraryTarget: 'umd',
  }
});

const index = merge(common, {
  entry: path.resolve(__dirname, './src/index.jsx'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000
  },
  resolve: {
    alias: {
      redux: './redux'
    },
    extensions: ['.js', '.jsx']
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  })]
})

module.exports = [index, redux];