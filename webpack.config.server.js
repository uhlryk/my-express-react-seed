var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var node_modules = {};
fs.readdirSync('node_modules')
  .forEach(function(mod) {
    node_modules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0,plugins[]=transform-decorators-legacy'],
        include: path.join(__dirname, 'src/'),
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  },
  entry: [
    './src/server/server.js'
  ],
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false })
  ],
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, './dist/'),
    filename: 'server.js'
  },
  target: 'node',
  eslint: {

  },
  node: {
    __filename: true,
    __dirname: false
  },
  resolve: {},
  externals: node_modules,
  debug: true,
  progress: false,
  emitError: true,
  emitWarning: true,
  failOnError: true,
  stats: {
    colors: true,
    reasons: true
  },
  devtool: 'source-map'
};
