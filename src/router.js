import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MyContainer from './components/tabbar/MyContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import Login from './components/my-page/login.vue'
import Register from './components/my-page/register.vue'
import UpImg from './components/my-page/upImg.vue'
import Cdut from './components/first-page/cdut/cdut.vue'
import Viewpoint from './components/first-page/cdut/components/tabbar/viewPoint/viewPoint.vue'
import Review from './components/first-page/cdut/components/tabbar/review/review.vue'
import Route from './components/first-page/cdut/components/tabbar/route/route.vue'
var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer },
        { path: '/my', component: MyContainer },
        { path: '/search', component: SearchContainer },
        { path: '/shopcar', component: ShopcarContainer },
        {
            path: '/home/cdut', 
            component: Cdut,
            children: [
                { path:'', redirect:'viewpoints' },
                { path:'viewpoints', component: Viewpoint },
                { path: 'reviews', component: Review },
                { path: 'routes', component: Route },
            ]
        },
        { path: '/my/login', component: Login},
        { path: '/my/register', component: Register},
        { path: '/my/upImg', component: UpImg},
    ],

    base: '/school-guide/',
    linkActiveClass: 'mui-active'
})
export default router