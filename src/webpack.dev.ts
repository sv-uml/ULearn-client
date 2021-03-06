import * as webpack from "webpack";
const merge = require("webpack-merge");
const common = require("./webpack.config");

const devConfig: webpack.Configuration = {
    mode: "development",
    devtool: "inline-source-map",
    output: {
        publicPath: "/"
    },
    devServer: {
        contentBase: "./dist",
        compress: true,
        host: "0.0.0.0",
        port: 8000,
        historyApiFallback: true
    }
};

module.exports = merge(common, devConfig);
