// webpack.config.js
var path = require('path');
module.exports = {
  entry: './src/lib.js',
  output: {
    library: 'lib',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015', 'es2016', 'es2017']
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
