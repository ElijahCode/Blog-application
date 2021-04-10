const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const glob = require("glob");

const pages = glob.sync("common.blocks/**/*.pug");

module.exports = {
  entry: './common.blocks/main/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({
    template: "common.blocks/index/index.pug",
    }),
    ...pages.map(
        (el) =>
          new HtmlWebpackPlugin({
            filename: el.replace(/\.pug/,'.html').replace(/^common\.blocks\/[a-zA-Z]{1,}\//, ""),
            template: el,
          })
      ),
      new BrowserSyncPlugin(
        {
        host: "localhost",
        port: 3000,
        proxy: "http://localhost:9000/",
        },
        {
        reload: false,
        }
    ),],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', "sass-loader", "postcss-loader"],
      },
      {
        test: /\.pug$/i,
        loader: 'pug-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        },
      }
    ],
  },
};