const path = require('path')
//const resolve = dir => path.resolve(__dirname,dir)
const  htmlWebpackPlugin = require('html-webpack-plugin') //生成html插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //抽离CSS插件
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin') //  避免css压缩 js不被压缩
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack') //用于访问内置插件
// 配置获取本地数据
// const portfinder = require('portfinder') 
const express = require('express')
// let axios = reqiure('axios')
const appData = require('./data.json')
const app = express()
const apiRoutes = express.Router()
let seller = appData.seller
let goods = appData.goods
let ratings = appData.ratings
app.use('/api',apiRoutes)

module.exports = {
    // optimization: {   //优化
    //     minimizer: [
    //         new uglifyjsWebpackPlugin({ //官方默认参数
    //             cache: true,
    //             parallel: true,
    //             sourceMap: true
    //         }),
    //         new optimizeCssAssetsWebpackPlugin() //避免css压缩 js不被压缩
    //     ]
    // },
    resolve:{
        modules:[
            path.resolve('src'),
            path.resolve('node_modules')
        ],
        // extensions:['.js','.css','.json','.vue'],
        // mainFields:['style','main'],
        // mainFiels:[],
        alias:{  // 别名
            bootstrap:'bootstrap/dist/css/bootstrap.css',
           // 'vue$': "vue/dist/vue.js"
            common:'./src/common'
            
        },
    },
    devServer: {
        port:3001,
        progress: true,
        contentBase: './dist', //基目录
        compress: true,
        hot: true,
        open: true,
        //host:'192.168.0.110',
        host: '127.0.0.1',

        before(app) {
            app.get('/api/seller',function(req,res){
                res.json({
                    errno: 0,
                    data: seller
                })
            })
            app.get('/api/goods',function(req,res){
                res.json({
                    errno: 0,
                    data: goods
                })
            })
            app.get('/api/ratings',function(req,res){
                res.json({
                    errno: 0,
                    data: ratings
                })
            })
        }
    },
    plugins:[
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html',
            //chunks:['home']  多页面打包时，引用不同js
            minify:{
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash:true,
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new VueLoaderPlugin(),
        //new webpack.IgnorePlugin(/node_modules/, /mui/)
    ],
    mode: 'development',  //production，development
    //entry: path.join(__dirname, './src/main.js'),
    entry: {
        home: './src/main.js',
        //other: './src/other.js'
    },
    //devtool: 'source-map',  //添加映射文件  帮助调试   devtool: 'eval-source-map'  不单独生成文件     devtool: 'cheap-module-source-map'  生成文件 不报出错行列
    watch: true,
    watchOptions:{
        poll:1000,  //1s🙏1000次
        aggregateTimeout:500,  //防抖 500ms后打包
        ignored:/node_modules/ 
    },
    output: {
        filename: 'bundle.js',
        //filename: '[name].js', 
        path: path.resolve(__dirname, 'dist'),
        //publicPath: 'http://my....'
        
    },

    module:{
        rules:[
            { test: /\.(jpg|png|gif|bmp|jpeg)$/ , use: {
                loader: 'url-loader',
                options: {
                    //name:[hash:8]-[name].[ext],
                    limit: 100*100,    //当图片小于该数值时，用base64形式展示 大小是源文件的3倍，减少请求   大于时，用file-loader产生真实图片
                    outputPath: 'img/',
                    esModule:false,  //  解决webpack4.x里会和html-webpack-plugin产生冲突
                    // publicPath:'http://127.0.0.1/public/'    // 单独该图片路径上面加上自己的服务器域名前缀 
                }
            } },

            { test: /\.js$/ , 
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets: [
                        '@babel/preset-env'
                        ],
                        plugins:[
                            "@babel/plugin-transform-runtime",
                            "babel-plugin-component"
                        ]
                    }
                },
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            },
            { test: /\.css$/ , 
                use: [
               MiniCssExtractPlugin.loader,  //配置抽离样式
                'css-loader',
                'postcss-loader'  ////加前缀
                ] 
                
            },
            { test: /\.less$/ , 
                use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'less-loader',
                'postcss-loader'
                ] 
            },
            { test: /\.scss$/ , 
                use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
                'postcss-loader'
                ] 
            },
            { test: /\.styl(us)?$/ , 
                use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'stylus-loader',
                ] 
            },
            {test: /\.vue$/, use: 'vue-loader'},
            { test: /\.(ttf|eot|svg|woff|woff2)$/ , use: 'url-loader' },
        ]
    },
}