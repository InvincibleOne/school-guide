 git init
git status
git add .
git commit -m "提交信息"
git push

git config --global user.name "Hu_song"
git config --global user.email "2389268197@qq.com"
git remote rm origin
git remote add origin https://gitee.com/UNIQUE--HS/vueApp.git
git push -u origin master
name : InvincibleOne




1  建立项目文件夹
2  终端运行 yarn init -y
3  yarn add webpack webpack-cli -D
4  创建index.html  main.js
5  创建webpack.config.js  配置mode entry output等等信息  //测试用命令 npx webpack
6  配置devServer   package.json里面加scripts   注意配置dev   build  不同的打包
7  yarn add webpack-dev-server -D      /测试用命令 npx run webpack-dev-server   npm run dev
8  yarn add html-webpack-plugin -D    webpack.config.js 里面配置该插件 //自动在dist目录根据模板生成html文件
9  注意哈更新目录
10  配置样式插件  modules
11 yarn add css-loader  style-loader -D
12 src下面新建index.css    main.js中加入 require('./index.css')  同理less  scss  less-loader sass-loader  stylus stylus-loader  注意配置的loader顺序
13 抽离css    yarn add mini-css-extract-plugin -D
14 注意npm run dev 和npm run build  第6条
15  yarn add postcss-loader  autoprefixer -D   //样式适配加前缀插件     postcss-loader
16  创建postcss.config.js     
17 在package.json中配置browserslist
18 yarn add optimize-css-assets-webpack-plugin -D   //css压缩    webpack.config.js配置

//es5 es6转化
19  yarn add babel-loader @babel/core @babel/preset-env -D  
20  yarn add @babel/plugin-proposal-decorators -D
21 yarn add @babel/plugin-transform-runtime -D
22 yarn add @babel/runtime
npm install --save-dev @babel/plugin-proposal-class-properties  //编译类插件
22 yarn add @babel/polyfill  //  转化高级语法  那个js文件需要  就在该文件开头加上require('@babel/polyfill')

23 yarn add eslint eslint-loader  -D   // eslint.org  官网去配置下载json文件
24 yarn add jquery  //一些库需要依赖jquery
25 注意一些引入全局变量问题

26 yarn add file-loader -D --ignore-engines   //下载file-loader  解决打包图片问题   在webpack.config.js配置插件
27  yarn add url-loader -D --ignore-engines // 使用这个  将那个小图片转为base64打包
28 npm install html-withimg-loader --save-dev // 在webpack.config.js配置插件  解决html直接使用img标签使用图片

webpack引入vue
29 npm i vue -$ 
30 npm i vue-loader vue-template-compiler -D  //yarn 不行就用npm
31 main.js 加import Vue from "vue
32 config.js  配置{test:/\.vue$/,use:'vue-loader}  
33 config.js  配置let VueLoaderPlugin = require('vue-loader/lib/plugin');  plugins里面加上 new VueLoaderPlugin(), 
34 创建main.vue文件，在main.js文件中用import将其引入  import main from './main.vue'
35 在main.js中创建new Vue 对象  用render传递main     render:param => param(main),
36  npm i vuex-$ 
37 npm i vue-router -$
38 main.js中  
    import Vuex from 'vuex'
    Vue.use(Vuex)
    import VueRouter from 'vue-router'
    Vue.use(VueRouter)

39 export default {}一个文件只能用一次  接收：import xxx from 'xx.js'
40 export title{}  可以多个  接收：import { title } from 'xx.js

npm i 
npm install babel-plugin-component -D

42  在mui的example里面查找图标样式等

43  yarn add js-cookie -S
44  main.js    import Cookies from 'js-cookie'    Vue.use(Cookies)

制作
1 app首页
        Mint-UI 的Header
        MUI的Tabbar.html
                购物车--拷贝扩展css样式到lib 
                拷贝扩展字体库ttf文件到lib
                为购物车小图标添加样式 "mui-icon mui-icon-extra mui-icon-extra-cart" 在mui的example里面查找图标样式，源码有样式名称
        添加路由
                设置router.js
                在main.js中引入该router.js
                vue对象中配置router
                在组件中设置<router-link   to=" " tag='li'></router-link>
        设置路由高亮
                方式1 检查样式 查看router-link-active 类 自己定义重写  现成的有 mui-active
                方式2 在router.js中设置linkActiveClass: 'mui-active' 也可以自己写mui-active类

        轮播图
                mint-ui 找 swiper
                注意 v-for 渲染图片的时候用要key
                图片路径要用requeir()包起来
                通过网络获取图片时候要用vue-resource
                main.js中引入 
                        import VueResource from 'vue-resource'
                        Vue.use(VueResource)
                        然后使用this.$http.get()  获取到数据后，保存到data上
        6宫格
                mui 的 grid-default.html
                检查样式，重写对应样式
                将图标换为img标签 调整图片大小60px
        默认路由
                router.js设置 { path: '/', redirect: '/home' }, 重定向
        vue-resource 发送Formdata 数据  记得在post中设置{emulateJSON:true}
        设置动画
                app.vue中
                        <transition>
                            <router-view></router-view>
                        </transition>
                        .app-container{
                            margin-top: 40px;
                            overflow-x: hidden;
                        } //overflow-x: hidden;解决头部滑动问题
                        v-enter 和v-leave-to分开写，解决进出离开方向问题
                        position: absolute;上下抖动问题

        改造新闻路由链接
                将标签的 a 链接改为 router-link  to 
        制作新闻列表
                mui  media-list.html
                两端对齐  display: flex;  justify-content: space-between;
                用padding 去掉上下固定的高度，让完全显示列表
                yard add moment -$  格式化时间组件
                main.js 配置
                        import moment from 'moment'
                        Vue.filter('dateFormat', function(dataStr,pattern = "YYYY--MM--DD HH:mm:ss"){
                        return moment(dataStr).format(pattern)
                        })
        新闻详情
                创建路由  传递id  router-link :to="'/home/newsList/newsInfo/'+item.id"
                获取id  data中id:this.$route.params.id  在created中调用函数，请求对应信息
                渲染显示即可
        评论子组件
                建一个单独的comments.vue子组件
                        用props['id]接收数据  model双向绑定评论的msg，
                        @click绑定提交事件 改变data，unshift(内容)到数组前面，渲染显示
                在详情组件引入import comments组件
                使用components属性，注册引入的子组件
                        components:{
                        "components-box":coments
                        }
        在页面用 <components-box  :id = "this.id"></components-box>
        加载更多
                绑定事件，pageindex++，再次调用getCoommengts(pageIndex);
                防止数据覆盖，老数组.concat(新的数据数组)
        顶部横向滚动条
                1 mui tab-top-webview-main.html
                2 去掉mui-fullscreen类去掉
                3 node 8.10.0 -> 10.0.0
                4 禁止打包的严格模式
                yarn add @babel/plugin-transform-modules-commonjs @babel/plugin-transform-strict-mode -S

                在.babelrc文件添加：
                "plugins": 
                [
                        ["@babel/plugin-transform-modules-commonjs", { "strictMode": false }]
                ]
                5 在组件引入mui的js后，注意初始化的时间，在mounted生命周期注册
                6 修改 tabbar样式的.mui-tab-item类的相关类名为.mui-tab-item-lib
        循环小标题
                <a :class="['mui-control-item', item.id == 0 ? 'mui-active':  ' ' ]" v-for="item in subtitle" :key=item.id>
                                                {{ item.name }}
                                </a>
        图片列表
                mint-ui懒加载
                        import { Lazyload } from 'mint-ui';
                        Vue.use(Lazyload);
                        注意：懒加载图标要显示的话，只能全部引入mint-ui组件
                        <ul>
                        <li v-for="item in list">
                        <img v-lazy="item">
                        </li>
                        </ul>
                        样式
                        img[lazy=loading] {
                        width: 40px;
                        height: 300px;
                        margin: auto;
                        }
                改变顶部层级z-index
                图片路由  <router-link to=" " tag='li'>
        缩略图
                官网地址 https://github.com/LS1231/vue-preview
                yarn add vue-preview -$
                main.js 
                        import VuePreview from 'vue-preview'
                        Vue.use(VuePreview, {
                        mainClass: 'pswp--minimal--dark',
                        barsSize: {top: 30, bottom: 30},
                        captionEl: true,
                        fullscreenEl: true,
                        shareEl: true,
                        bgOpacity: 0.85,
                        tapToClose: true,
                        tapToToggleControls: true
                })
        组件中
                <div class="thumbs">
                        <vue-preview :slides="slide1" @close="handleClose" height="40px"></vue-preview>
                </div>
                .thumbs {
                //display: flex;
                /deep/ .my-gallery{   //deep深层作用选择器
                                figure{
                                        width: 30%;
                                        margin: 5px;
                                        float: left;
                                        img{
                                                width: 100%;
                                                box-shadow: 0 0 8px #999;
                                                border-radius: 5px;
                                        }
                                }
                        }
                }
        产品列表 
                flex 实现两列布局 
                justify-content: space-between 贴边布局

                 "dev": "webpack-dev-server  --host  192.168.0.107"

        elema
                引入组件
                <script>
                        import header from './components/header/header.vue'
                        export default {
                                components:{
                                        'header-component':header,
                                 }
                        }
                </script>    

                配置本地异步加载
                webpack.config.js中
                        const express = require('express')
                        // let axios = reqiure('axios')
                        const appData = require('./data.json')
                        const app = express()
                        const apiRoutes = express.Router()
                        let seller = appData.seller
                        app.use('/api',apiRoutes)

                        devServer: {
                                port:3000,
                                progress: true,
                                contentBase: './dist', //基目录
                                compress: true,
                                hot: true,
                                open: true,
                                host:'192.168.0.108',

                                before(app) {
                                app.get('/api/seller',function(req,res){
                                        res.json({
                                        errno: 0,
                                        data: seller
                                        })
                                })
                                }
                        },
                配置stylus的时候，注意loader的加载顺序
                        { test: /\.styl(us)?$/ , 
                                use: [
                                MiniCssExtractPlugin.loader,
                                'css-loader',
                                'postcss-loader',
                                'stylus-loader',
                                ] 
                        },
                引入stylus文件
                        在stylus文件开头加@import "~commom/stylus/mixin.styl"
                        注意配置别名
                                resolve:{
                                        modules:[
                                        path.resolve('src'),
                                        path.resolve('node_modules')
                                        ],
                                        alias:{  // 别名
                                        bootstrap:'bootstrap/dist/css/bootstrap.css',
                                        // 'vue$': "vue/dist/vue.js"
                                        common:'./src/common'
                                        },
                                },
                动画
                        <transition name="fade">
                                <bulletin-component v-show="ifShowBulletinDetail" :seller="seller" :classMap="classMap" @hideBulletinDetail="hideBulletinDetail"></bulletin-component>
                        </transition>
                        .tabbar-fade
                                overflow-x :hidden
                                .fade-enter 
                                        opacity :0
                                        transform :translateX(100%)
                                .fade-leave-to 
                                        opacity :0
                                        position :absolute //解决上下抖动问题
                                        transform :translateX(-100%)
                                .fade-enter-active,.fade-leave-active
                                        transition :all 0.5s ease
                CSS中
                        fixed用法
                        min-height :100%
                        background-image: url("./images/" + $url + "@2x.png")
                        background-size: 50px 50px
                        sticky footer的方式

                        图片适配正方形
                        
                        .img-container
                                position :relative
                                width :100%
                                height :0
                                padding-top :100%
                                border :solid 2px rgba(255,255,255,0.6)
                                
                                img 
                                        position :absolute
                                        top :0
                                        left :0
                                        width :100%
                                        height :100%

                better-scroll用法
                         <scroll class="scroll-box">
                                <ul class="mui-table-view mui-grid-view mui-grid-9" >
                                        <li v-for="( value, key ) in schools" :key="key"  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                                        <img :src=" getHost() + '/public/images/province/' + selectedProvince.toLowerCase() + '/' + key + '.jpg' ">
                                        <div class="mui-media-body">{{ value }}</div>
                                        </li>
                                </ul> 
                        </scroll>
                        需要class:scroll-box有固定高度，当ul高度超过后，即可滚动
                        .scroll-box{
                                width :100%;
                                overflow :hidden;
                                position :absolute;
                                top : 278px;
                                bottom :50px;
                                background-color: #fff;
                        }