<template>
    <div class="wrapper">
        <div class="content-wrapper" v-show="!showFoodDetail">
            <div class="foods">
                <scroll class="menu-wrapper"  ref="menuScroll">
                    <ul>
                        <li @click="selectedMenu(index)"  v-for="(item,index) in cdut.viewPoints" :key="index" class="menu-item " :class="[currentIndexOfMenu === index ? 'current' : ' ']">
                            <span class="text border-1px" :class="{'current':currentIndex==index}">
                                <!-- <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span> -->
                                {{ item.name  }}
                            </span>
                        </li>
                    </ul>
                </scroll>
                <scroll class="foods-wrapper"   :listenScroll="listenScroll" :scrollType="3" @scroll="changeMenu" ref="foodsScroll">
                    <ul>
                        <li v-for="(item,index) in cdut.viewPoints" :key="index" class="goods-item">
                            <h1 class="title">{{item.name}}</h1>
                            <ul>
                                <li  class="foods-item" @click="selectFood(item)">
                                    <div class="icon">
                                        <img :src=" host + item.imgAddress" alt="" width="120" height="80">
                                    </div>
                                    <div class="content">
                                        <h2 class="name">简称：{{ item.abbreviation }}</h2>
                                        <p class="name">用途：</p>
                                        <p class="desc">{{ item.useTo }}</p>
                                        <!-- <div class="extra">
                                            <span class="count">月售{{food.sellCount}}份</span>
                                            <span>好评率{{ food.rating }}%</span>
                                        </div> -->
                                        
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </scroll>
            </div>
        </div>
        <viewPoint-component v-show="showFoodDetail"  :viewPoint="viewPoint" :ratings="viewPointRatings"  @hideFoodDetail="hideFoodDetail" ref="test" @hideAll="hideAll" @showAll="showAll"></viewPoint-component>
    </div>
</template>
<script>
import viewPoint from './viewPointDetail.vue'
import { mapGetters, mapMutations } from 'vuex'
const ERO_OK = 0
export default {
    props:{
        cdut:{
            type:Object
        },
    },
    // inject:['reload'],
    data(){
        return {
            goods:{},
            viewPoint:{},
            heightList:[],
            classMap:[],
            scrollY : 0,
            showShopcar :false,
            listenScroll:true,
            menuSelected :0,
            currentIndexOfMenu :0,
            showFoodDetail:false,
            host:'',
            ifCommenting:false,
            viewPointRatings:[]
        }
    },
    created(){
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        // this.$nextTick( () => {
        // })
        this.host = this.getHost()
        
    },
    computed:{
        currentIndex() {
            for (let i = 0; i < this.heightList.length; i++) {
                let height1 = this.heightList[i]
                let height2 = this.heightList[i + 1]
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    this.currentIndexOfMenu = i
                    return i
                }
            }
        return 0
        }
    },
    methods:{
        ...mapGetters( [ 'getHost' ] ),
        ...mapMutations( [ 'changeIfHideTitle' ] ),
        getRatings( viewpoint ){
            this.$http.post( this.getHost() + '/getRatings', { type: 'viewpoint', school: 'cdut',  viewpoint: viewpoint })
            .then(result =>{
                if(result.body.res_code === 0){
                    this.viewPointRatings = Object.assign( [], result.body.message )
                }
                else{
                
                }
            })
        },
        selectedMenu(index){
            // if (!event._constructed) {
            //     return
            // }
            this.currentIndexOfMenu = index
            let  goodsList = document.getElementsByClassName('goods-item') 
            let el = goodsList[index]
            this.$refs.foodsScroll.scrollToElement(el,300)
        },
        _caculateHeight(){
            let foodList = document.getElementsByClassName('goods-item')
            let height = 0
            this.heightList.push(height)
            for(let i = 0; i < foodList.length; i++){
                height += foodList[i].clientHeight
                this.heightList.push(height)

            }
        },
        changeMenu(pos){
            this.scrollY = Math.abs(Math.round(pos.y))
        },
        selectFood(viewPoint){
            this.viewPoint = viewPoint
            this.getRatings( viewPoint.name )
            this.showFoodDetail = true
            this.$emit( 'hideHeader' )
            this.changeIfHideTitle( true )
        },
        hideFoodDetail(){
            this.showFoodDetail = false
            this.$emit( 'showHeader' )
            this.changeIfHideTitle( false )
        },
        hideAll(){
            // this.$emit( 'hideHeader' )
            // this.ifCommenting = true
        },
        showAll( ){
            // this.$emit( 'showHeader' )
            // this.ifCommenting = false
        }
    },
    components :{
        'viewPoint-component':viewPoint,
    },
    watch:{
        // goods:{
        //     hander:function(val,newVal){
        //         console.log(val,newVal)
        //     },
        //     //deep:true,
        //    // immediate: true
        // }
        // data(val,newVal){
        //     console.log(val,newVal)
        // }
    }

}
</script>
<style lang="stylus" scoped>
    @import '~commom/stylus/mixin.styl'

    .wrapper
        display :flex
        flex-direction :column
        min-height: 100%

        .content-wrapper
            flex:1
            width :100%
            min-height :100%

            .foods
                display :flex
                width :100%
                overflow :hidden
                position :absolute
                top : 266px
                bottom :0px
                background-color #fff

                .menu-wrapper
                    flex : 0 0 80px
                    background-color :#f3f5f7

                    ul
                        margin :0
                        padding :0

                    .menu-item
                        display :table
                        width :80px
                        height 54px
                        list-style :none
                        line-height :14px
                        padding: 0 12px
                        
                        &.current
                            background :#fff
                            z-index :10
                            font-weight :bold
                            border-bottom :1px solid  #fff

                        .icon
                            display :inline-block
                            width :12px
                            height :12px
                            background-size :12px 12px
                            margin-right :2px
                            &.decrease
                                bg-image('decrease_3')
                            &.discount
                                bg-image('discount_3')
                            &.guarantee
                                bg-image('guarantee_3')
                            &.invoice
                                bg-image('invoice_3')
                            &.special
                                bg-image('special_3')
                                
                        .text
                            font-size :12px
                            display : table-cell
                            width: 56px
                            vertical-align :middle
                            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
                            &.current
                                border:none
                            
                    
                .foods-wrapper
                    flex :1
                    
                    ul
                        padding :0
                        margin :0

                        .goods-item
                            list-style :none
                        
                            .title
                                line-height :26px
                                font-size : 12px
                                background-color #f3f5f7
                                padding :0 0 0 14px

                            .foods-item
                                list-style :none
                                padding :12px 15px 8px 15px  
                                
                                display :flex

                                .icon
                                    flex : 0 0 80px
                                    margin : 0 10px 0 0

                                .content
                                    flex : 1
                                    position :relative

                                    .name
                                        font-size : 14px
                                        margin :2px 0 8px 0

                                    .desc
                                        font-size : 12px
                                        line-height :12px
                                        height 12px

                                    .extra
                                        line-height: 10px
                                        font-size: 10px
                                        color: #93999f

                                        .count
                                            margin :0 12px 0 0
                                    .price
                                        display :inline-block
                                        .now
                                            font-size :14px
                                            font-size: 14px
                                            color: #f01414

                                        .old
                                            font-size : 10px
                                            text-decoration :line-through
                                            color :#939999
            
</style>