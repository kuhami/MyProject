/**
 * Created by mwbyd on 2018/1/23.
 */
var webpack=require('webpack');

module.exports = {
    entry: "./runoob1.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    plugins:[
        new webpack.BannerPlugin('菜鸟教程 webpack 实例')
    ]
};