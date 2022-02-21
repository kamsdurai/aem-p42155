const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const stylelintReporter = require("stylelint-html-reporter-stzhang");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const SOURCE_ROOT = __dirname + "/src/main/webpack";

module.exports = (env) => {
  const writeToDisk = env && Boolean(env.writeToDisk);

  return merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    performance: { hints: "warning" },
    plugins: [
      new ESLintPlugin({
        failOnError: false,
        quiet: false,
        outputReport: {
          filePath: path.resolve(__dirname, "report/eslint-report.html"),
          formatter: require("eslint-detailed-reporter"),
        },
      }),
      new StylelintPlugin({
        configFile: ".stylelintrc",
        context: "src/main/webpack/etisalat",
        files: "**/*.scss",
        failOnError: false,
        formatter: stylelintReporter({
          filename: path.resolve(__dirname, "report/stylelint-report.html"),
        }),
        quiet: false,
        emitErrors: true,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, SOURCE_ROOT + "/static/index.html"),
      }),
    ],
    devServer: {
      inline: true,
      proxy: [
        {
          context: ["/content", "/etc.clientlibs"],
          target: "http://localhost:4502",
        },
      ],
      writeToDisk,
      liveReload: !writeToDisk,
    },
  });
};
