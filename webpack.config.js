/* eslint-disable */

var webpack = require('webpack'),
  TerserPlugin = require('terser-webpack-plugin'),
  WriteFilePlugin = require('write-file-webpack-plugin'),
  path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'production';

var isDev = 'development' === NODE_ENV || 0;

var options = {
  mode: NODE_ENV,
  entry: {
    index: path.join(__dirname, 'src', 'index.ts'),
  },
  output: {
    path: path.join(__dirname, 'bin'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {},
    extensions: ['.tsx','.ts','.js','.json']
  },
  plugins: [
    // clean the web folder
    new CleanWebpackPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    new WriteFilePlugin()
  ],
};

if (isDev) {
  options.devtool = 'source-map';
} else {
  options.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
  };
}

options.plugins.push(function () {
  this.hooks.done.tapAsync('done', function (stats, callback) {
    if (0 < stats.compilation.errors.length) {
      console.log('\x1b[31m%s\x1b[0m', stats.compilation.errors);
      // to error out and discontinue any sequential scripts.
      process.exit(1);
    } else {
      callback();
      process.exit(0);
    }
  });
});

module.exports = options;
