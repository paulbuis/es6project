// webpack.config.js
var path = require('path');
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2017']
      }
    },
    {
      test: /\.coffee$/,
      loader: 'coffee-loader'
    },{
      test: /\.ts$/,
      loader: 'ts-loader'
    }]
  }
};
