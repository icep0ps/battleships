const path = require('path');
const PugPlugin = require('pug-plugin');

module.exports = {
  entry: './public/javascript/main.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(s?css|sass)$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.(ico|png|jp?g|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@public': path.resolve(__dirname, 'public'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new PugPlugin({
      entry: 'views',
      output: '',
    }),
  ],
};
