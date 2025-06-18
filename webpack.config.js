const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/scripts/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/manifest.json', to: '' },           // langsung ke root dist
        { from: 'public/service-worker.js', to: '' },       // langsung ke root dist
        { from: 'public/assets/icons', to: 'assets/icons' },// folder icons tetap ke dalam dist/assets/icons
        { from: 'public/_redirects', to: '' },              // file _redirects langsung ke root dist
      ],
    }),
  ],
  devServer: {
    static: './dist',
    open: true,
    hot: true,
  },
  mode: 'development',
};
