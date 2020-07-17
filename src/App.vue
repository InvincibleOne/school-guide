<template>
    <div class="all">
        <mt-header  v-if=" !ifHideTitle "  fixed :title="title">
            <router-link :to="prePath" slot="left" v-show="!ifRootDir">
                <mt-button icon="back" >返回</mt-button>
            </router-link>
        </mt-header>

        <div >
            <nav v-show="ifRootDir" class="mui-bar mui-bar-tab " >
                    <router-link class="mui-tab-item-lib " to="/home">
                            <span class="mui-icon mui-icon-home"></span>
                            <span class="mui-tab-label">首页</span>
                    </router-link>
                    <!-- <router-link class="mui-tab-item-lib" to="/search">
                            <span class="mui-icon mui-icon-search"></span>
                            <span class="mui-tab-label">搜索</span>
                    </router-link>
                    <router-link class="mui-tab-item-lib" to="/shopcar">
                            <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">9</span></span>
                            <span class="mui-tab-label">购物车</span>
                    </router-link> -->
                    
                    <router-link class="mui-tab-item-lib " to="/my">
                            <span class="mui-icon mui-icon-contact"></span>
                            <span class="mui-tab-label">我的</span>
                    </router-link>
        </nav>	
        </div>
        <div class="app-container" :class="{ 'hide-title' : ifHideTitle }">
            <transition>
                <router-view ></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
    data(){
        return {
            ifRootDir:true,
            prePath:'/',
            history:['/'],
        }
    },
    
    created(){
        //可能在子页面刷新，所以判断
        this.judgeIfRootDir(this.$route.path)
        this.initHistory()
        this.refreshPrepath()
       // console.log(sessionStorage.getItem('history'))
       // console.log(this.history)
    },
    computed:{
        ...mapState(['title','ifHideTitle']),
        
    },
    mounted(){
        this.$route.path = '/'
    },
    methods:{
        ...mapMutations([ 'changeTitle' ]),
        pageTitle(  ){
            if(this.ifRootDir){
                this.changeTitle( '云上逛大学' )
            }
        },
        initHistory(){
            if(this.ifRootDir ){
                this.history = ['/']
                sessionStorage.setItem('history',JSON.stringify(this.history))
                return 
            }
            if(sessionStorage.getItem('history')){
                this.history = JSON.parse(sessionStorage.getItem('history'))
                return
            }
            // this.history = ['/']
            // sessionStorage.setItem('history',JSON.stringify(this.history))
            // console.log('22222222')
        },
        judgeIfRootDir(path){
            if (path == '/' || path == '/home' || path == '/my' || path == '/search' || path == '/shopcar') {
                this.ifRootDir = true
            }
            else{
                this.ifRootDir = false
            }
        },
        findPrePath(fromPath,toPath){
            let arrFrom = fromPath.split('/')
            let arrTo = toPath.split('/')
            let len = arrTo.length - arrFrom.length
            if (len > 0 ){
                this.prePath = fromPath
                this.history.push(fromPath)
                sessionStorage.setItem('history',JSON.stringify(this.history))
            }
            else if(len < 0){
                this.history.pop()
                this.prePath = this.history[this.history.length - 1]
                sessionStorage.setItem('history',JSON.stringify(this.history))
            }
        },
        refreshPrepath(){
            this.prePath = this.history[this.history.length - 1] ? this.history[this.history.length - 1] : '/'
            //console.log(this.history)
        }
    },
    watch:{
            $route(to,from){
                this.judgeIfRootDir(to.path)
                //console.log(from.path,to.path)
                //this.prePath(this.$route.path,Object.keys(this.$route.params).length)
                this.findPrePath(from.path,to.path)
            },
            ifRootDir: {
                handler:function(old,newValue){
                    //新值和旧值交替，第一次进入没执行，故old和new值措了一次
                    if(!newValue){
                        this.pageTitle()
                    }
                }
            }
        }
}
</script>
<style lang="css" scoped>
    @import '~commom/css/global.css';
    .mint-header.is-fixed {
        z-index: 99;
    }

    .all{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .app-container{
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 100%;
        padding-top: 40px;
        /* padding-bottom: 50px; */
        overflow-x: hidden;
    }
    .hide-title{
        padding-top:0;
    }

    .v-enter{
        opacity: 0;
        transform: translateX(100%);
        position: absolute;
    }
    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }
    .v-enter-active{
        transition: all 0.5s ease;
    }
    .v-leave-active{
        transition: all 0.5s ease;
    }

    
    .mui-bar-tab .mui-tab-item-lib.mui-active {
        color: #007aff;
    }
    .mui-bar-tab .mui-tab-item-lib {
        display: table-cell;
        overflow: hidden;
        width: 100%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }
    .mui-bar-tab .mui-tab-item-lib .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .mui-bar-tab .mui-tab-item-lib .mui-icon~.mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>