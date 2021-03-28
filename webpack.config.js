const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const glob = require("glob");

const pages = glob.sync("src/html/*.html");

module.exports = {
  entry: './src/js/index.js',
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
    template: "src/html/index.html",
    }),
    ...pages.map(
        (el) =>
          new HtmlWebpackPlugin({
            filename: el.replace(/^src\/html\//, ""),
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
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader"],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
};