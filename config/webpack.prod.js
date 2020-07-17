const path = require('path')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 引入 css 单独打包插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 引入清理插件
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production', // 生产模式
    entry: {
        index: path.join(__dirname, '../src/index.tsx'),
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist/'),
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            mode: 'local', // 以对象方式引入，
                            localIdentName: 'myCompontent-[local]', // 类名前缀，创建类名时会加上前缀：myCompontent-A 、myCompontent-B ...
                        },
                    },
                },
                'sass-loader',
            ],
        }],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ],
})
