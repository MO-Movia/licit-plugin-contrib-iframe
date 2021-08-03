/* eslint-disable */

var webpack = require('webpack'),
  FlowWebpackPlugin = require('flow-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin'),
  WriteFilePlugin = require('write-file-webpack-plugin'),
  path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'production';

var isDev = 'development' === NODE_ENV || 0;

var options = {
  mode: NODE_ENV,
  entry: {
    index: path.join(__dirname, 'src', 'index.js'),
  },
  output: {
    path: path.join(__dirname, 'bin'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
        // https://stackoverflow.com/questions/51860043/javascript-es6-typeerror-class-constructor-client-cannot-be-invoked-without-ne
        // ES6 classes are supported in any recent Node version, they shouldn't be transpiled. es2015 should be excluded from Babel configuration, it's preferable to use env preset set to node target.
          presets: [['@babel/preset-env', { 'targets': { 'node': true } }], '@babel/preset-react', '@babel/preset-flow'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-export-default-from',
            [
              '@babel/plugin-transform-runtime',
              {
                helpers: true,
                regenerator: true,
              },
            ],
            'flow-react-proptypes',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-flow-strip-types',
            '@babel/plugin-syntax-dynamic-import',
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: 'file-loader'
      },
    ],
  },
  resolve: {
    alias: {},
  },
  plugins: [
    // type checker
    ...(isDev
      ? [new FlowWebpackPlugin({flowArgs: ['--show-all-errors']})]
      : []),
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
