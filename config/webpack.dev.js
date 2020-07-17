const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',  // 开发模式
    devtool: 'inline-source-map', // 可以追踪源码中 error 的位置
    entry: {
        app: path.join(__dirname, '../preview/app.js'),
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../preview/')
    },
    devServer: {
        contentBase: path.join(__dirname, '../preview/'),
        host: 'localhost',
        port: 3000,
        open: false,
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader', options: {
                        modules: {
                            mode: 'local', // 以对象方式引入，
                            localIdentName: 'myCompontent-[local]', // 类名前缀，创建类名时会加上前缀：myCompontent-A 、myCompontent-B ...
                        },
                    }
                },
                'sass-loader'
            ],
        }],
    },

})

