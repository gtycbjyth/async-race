const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const Copy = require('copy-webpack-plugin');
const baseConfig = require('./webpack.config');

const config = () => {
  const envKeys = {
    NODE_ENV: JSON.stringify('development'),
    BACK_ENV: JSON.stringify('development'),
  };

  return {
    mode: 'development',
    output: {
      path: path.join(__dirname, 'public'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[file].map',
      publicPath: '/',
    },
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      port: 8081,
      compress: false,
      watchContentBase: true,
      historyApiFallback: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': envKeys,
      }),
      new Copy({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/assets/'),
            to: path.resolve(__dirname, 'public/assets/'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          use: [
            {
              loader: 'style-loader', // creates style nodes from JS strings
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS modules
              options: {
                url: false, 
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader', // Run postcss actions
              options: {
                postcssOptions: {
                  plugins: [require('autoprefixer')],
                  sourceMap: true,
                },
              },
            },
            {
              loader: 'sass-loader', // compiles Sass to CSS
              options: {
                sourceMap: true,
                sassOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };
};

module.exports = (env, argv) => merge(baseConfig(), config(argv));
