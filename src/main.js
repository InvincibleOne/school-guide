import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
import VueResource from 'vue-resource'
Vue.use(VueResource)

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './commom/stylus/icon.styl'
import main from './App.vue'

import MintUI from 'mint-ui'
Vue.use(MintUI)  //全部导入
// import { Header,} from 'mint-ui'
// Vue.component(Header.name,Header)
// import 'mint-ui/lib/style.min.css'
import 'mint-ui/lib/style.css'
import 'mint-ui/lib/mint-ui.common.js'

import AMap from 'vue-amap';
Vue.use(AMap);
AMap.initAMapApiLoader({
  key: '7d30f201d31c7e1677819fc5bd1aada2',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 
  'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});

import globalComponents from './commom/js/global.js'
Vue.use(globalComponents)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import router from './router.js'
//导入格式化时间插件时间
import moment from 'moment'
Vue.filter('dateFormat', function(dataStr,pattern = "YYYY--MM--DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

// import Cookies from 'js-cookie'
// Vue.use( Cookies)

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

import store from './store.js'
let app = new Vue({
    el:'#app',
    data:{

    },
    render: param => param(main),
    router:router,
    store:store,
})