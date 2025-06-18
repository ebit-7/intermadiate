const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/scripts/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // bersihkan folder dist sebelum build baru
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
        { from: 'public/manifest.json', to: '' },         // ke root dist
        { from: 'public/service-worker.js', to: '' },     // ke root dist
        { from: 'public/assets/icons', to: 'assets/icons' }, // ke folder dist/assets/icons
        { from: 'public/_redirects', to: '' },            // ke root dist
      ],
    }),
  ],
  devServer: {
    static: './dist',
    open: true,
    hot: true,
  },
  mode: 'production', // pastikan mode production untuk build final
};
