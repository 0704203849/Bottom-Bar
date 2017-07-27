var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/BottomBar/widget/BottomBar.ts",
    output: {
        path: __dirname + "/dist/tmp",
        filename: "src/BottomBar/widget/BottomBar.js",
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
    },
    module: {
        rules: [
            { test: /\.ts$/, use: "ts-loader" },
            {
                test: /\.css$/, loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    devtool: "source-map",
    externals: [/^mxui\/|^mendix\/|^dojo\/|^dijit\//],
    plugins: [
        new CopyWebpackPlugin([
            { from: "src/**/*.js" },
            { from: "src/**/*.xml" }
        ], {
                copyUnmodified: true
            }),
        new ExtractTextPlugin("./src/BottomBar/widget/ui/BottomBar.css"),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
};
