<template>
    <div class="cdut-wrapper">
        <div class="wrapper" v-if="!ifCommenting">
            <header-component :cdut="cdut" ></header-component>
            <div class="tabbar  border-1px" > 
                <div class="tab-item  ">
                    <router-link to="/home/cdut/viewpoints" >校园一角</router-link>
                </div>
                <div class="tab-item">
                    <router-link to="/home/cdut/reviews">留言墙</router-link>
                </div>
                <div class="tab-item">
                    <router-link to="/home/cdut/routes">路线推荐</router-link>
                </div>
            </div >
        </div>
        <div class="tabbar-fade">
            <transition name="fade">
                <router-view :cdut="cdut "  @hideHeader="hideHeader" @showHeader="showHeader"></router-view >
            </transition>
        </div>
    </div>
</template>
<script>
    import header from './components/header/header.vue'
    import { mapMutations, mapGetters } from 'vuex'
    
    const ERO_OK = 0
    export default {
        data(){
            return{
                seller :{},
                cdut: {},
                ifFirst:true,
                showRouter:true,
                ifCommenting:false
            }
        },
        // provide(){
        //     return{
        //         reload: this.reload
        //     }
        // },
        created() {
            // this.getSeller(),
            this.getCDUT(),
            this.pageTitle( '成都理工大学' )
        },
        mounted(){
            // this.getH()
        },
        computed: {
            
        },
        destroyed(){
            
        },
        methods:{

            ...mapMutations([ 'changeTitle' ]),
            ...mapGetters( [ 'getHost' ] ),

            // getSeller(){
            //     this.$http.get('/api/seller' ).then((response) => {
            //         response = response.body;
            //         if (response.errno === ERO_OK) {
            //             this.seller = Object.assign({}, response.data)
            //         }
            //     });
            // },
            getCDUT(){
                this.$http.get( this.getHost() + '/sichuan/cdut' ).then((response) => {
                    response = response.body;
                    if (response.res_code === ERO_OK) {
                        this.cdut = Object.assign({}, response.data)
                    }
                });
            },
            // reload(){
            //     console.log(this.showRouter)
            //     this.showRouter = false
            //     this.$nextTick(function(){
            //         console.log(this.showRouter)
            //         this.showRouter = true
            //     })
            // }

            pageTitle( str ){
                this.changeTitle( str)
            },
            hideHeader(){
                this.ifCommenting = true
            },
            showHeader(){
                this.ifCommenting = false
            }
        },
        watch:{
            $route(to,from){
                //this.prePath(this.$route.path,Object.keys(this.$route.params).length)
                // if(to.path != '/home/elema/foods'){
                //     this.test = false
                // }
                // else{
                //     this.test = true
                // }
            }
        },
        components:{
            'header-component':header,
        
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~commom/stylus/mixin.styl';

    .cdut-wrapper
        display :flex
        flex-direction :column
        height :100%
        width :100%

        .tabbar-fade
            flex :1
            background-color :rgba(255,255,255,0.5)
            overflow-x :hidden
            .fade-enter 
                opacity :0
                transform :translateX(100%)
            .fade-leave-to 
                opacity :0
                position :absolute
                transform :translateX(-100%)
            .fade-enter-active
                transition :all 0.1s ease
            .fade-leave-active
                transition :all 0.1s ease

        .wrapper
            flex : 0 0 226px

            .tabbar
                display :flex
                width :100%
                height :40px
                line-height :40px
                //border-1px(rgba(7, 17, 27, 0.1))
                border-bottom: 1px solid rgba(7, 17, 27, 0.1)
                background-color #fff
                .tab-item
                    flex :1
                    text-align :center
                    cursor :pointer
                    & > a
                        font-size: 14px
                        color: rgb(77, 85, 93)
                        &.mui-active 
                            color: rgb(240, 20, 20)

            
</style>





