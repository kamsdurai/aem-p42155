"use strict";
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const globImporter = require("node-sass-glob-importer");


const SOURCE_ROOT = __dirname + "/src/main/webpack";

const resolve = {
  extensions: [".js"],
};

module.exports = {
  resolve: resolve,
  entry: {
    base: SOURCE_ROOT + "/base/main.js",
    gochat: SOURCE_ROOT + "/gochat/main.js",
    etisalat: SOURCE_ROOT + "/etisalat/main.js",
    corecomponent: SOURCE_ROOT + "/etisalat/corecomponents.js",
    careers: SOURCE_ROOT + "/careers/main.js",
    global: SOURCE_ROOT + "/global/main.js",
    fivemobile: SOURCE_ROOT + "/fivemobile/main.js",
    hiuapp: SOURCE_ROOT + "/hiuapp/main.js",
    ewallet: SOURCE_ROOT + "/ewallet/main.js",
  },
  output: {
    filename: "clientlib-[name]/[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "glob-import-loader",
            options: {
              resolve: resolve,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [require("autoprefixer")];
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              url: false,
              importer: globImporter(),
            },
          },
          {
            loader: "glob-import-loader",
            options: {
              resolve: resolve,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: "clientlib-[name]/[name].css",
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, SOURCE_ROOT + "/base/resources"), to: "./clientlib-base/" },
      { from: path.resolve(__dirname, SOURCE_ROOT + "/vendor"), to: "./clientlib-base/" },
      { from: path.resolve(__dirname, SOURCE_ROOT + "/gochat/resources"), to: "./clientlib-gochat/" },
      { from: path.resolve(__dirname, SOURCE_ROOT + "/etisalat/resources"), to: "./clientlib-etisalat/" },
      { from: path.resolve(__dirname, SOURCE_ROOT + "/careers/resources"), to: "./clientlib-careers/" },
      { from: path.resolve(__dirname, SOURCE_ROOT + "/global/resources"), to: "./clientlib-global/" },
      { from: path.resolve(__dirname, SOURCE_ROOT + "/fivemobile/resources"), to: "./clientlib-fivemobile/" },
      { from: path.resolve(__dirname, SOURCE_ROOT + "/hiuapp/resources"), to: "./clientlib-hiuapp/" },
      { from: path.resolve(__dirname, SOURCE_ROOT + "/ewallet/resources"), to: "./clientlib-ewallet/" },
    ]),
  ],
  stats: {
    assetsSort: "chunks",
    builtAt: true,
    children: false,
    chunkGroups: true,
    chunkOrigins: true,
    colors: false,
    errors: true,
    errorDetails: true,
    env: true,
    modules: false,
    performance: true,
    providedExports: false,
    source: false,
    warnings: true,
  },
};
