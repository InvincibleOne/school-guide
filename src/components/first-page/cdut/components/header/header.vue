<template>
    
        <div class="header">
            <div class="backgrand">
                <swiper :lunbotuList="lunbotuList" :isFull='true'></swiper>
                <!-- <img :src="seller.avatar" alt="" width="100%" height="100%"> -->
            </div>
            <div class="content-wrapper">
                <div class="avatar">
                    <img src="../../image/school_flag.jpg" alt="校徽" width="80" height="80">
                </div>
                <div class="content">
                    <div class="title">
                        <!-- <span class="brand"></span> -->
                        <span class="name">{{ cdut.name }}</span>
                    </div>
                    <div class="description">
                        {{ cdut.school_type }} 
                    </div>
                    <div v-if="cdut.address != undefined" class="support">
                        <!-- <span class="icon" :class="classMap[seller.supports[0].type]"></span> -->
                        <span class="text" >{{ cdut.address  }}</span>
                    </div>
                    <div  class="support-count" @click="showBulletinDetail">
                        <span class="count">简介</span>
                        <i class="icon-keyboard_arrow_right"></i>
                    </div>
                </div>
            </div>
            <div class="bulletin-wrapper" @click="showBulletinDetail"> 
                <span class="bulletin-title"></span><span class="bulletin-text">{{ cdut.intro }}</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
            <transition name="fade">
                <bulletin-component v-show="ifShowBulletinDetail" :cdut="cdut" :classMap="classMap" @hideBulletinDetail="hideBulletinDetail"></bulletin-component>
            </transition>
        </div>
</template>
<script>
import bulletin from './header-bulletin.vue'
import swiper from '../../../../subconponents/swipe.vue'
export default {
    props:{
        cdut:{
            type:Object
        }
    },
    data(){
        return {
            classMap : [],
            ifShowBulletinDetail:false,
            lunbotuList:[
                {img:require('../../image/school_door.jpg')},
                {img:require('../../image/diaoxiang.jpg')},
                {img:require('../../image/list_banner.jpg')},
                {img:require('../../image/list_banner1.jpg')},
            ],
        }
    },
    created(){
        //console.log(this.seller)
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
        showBulletinDetail(){
            this.ifShowBulletinDetail = true
        },
        hideBulletinDetail(){
            this.ifShowBulletinDetail = false
        },
    },
    components:{
        'bulletin-component':bulletin,
        swiper
    }
}
</script>
<style lang="stylus" scoped>
@import "~commom/stylus/mixin.styl"

.fade-enter-active, .fade-leave-active
    transition: all 0.5s ease     
.fade-enter,.fade-leave-to
    opacity: 0

.header 
    margin :0
    padding :0
    width :100%
    height :186px
    overflow: hidden
    background: rgba(70, 60, 50, 0.5)
    color :white
    position :relative

    .backgrand
        position :absolute
        top:0
        left:0
        width :100%
        height :100%

        z-index :-1

    .content-wrapper
        position relative
        padding :44px 12px 23px 34px
        font-size :0px
        background-color:rgba(0,0,0,0.2)

        .avatar
            display: inline-block
            vertical-align: top
            img 
                border-radius: 50%

        .content
            display: inline-block
            margin-top: 5px
            margin-left :16px

            .title
                display :inline-block
                height:23px
                margin:2px 0 8px 0 

                .brand
                    display: inline-block
                    vertical-align:top 
                    bg-image('brand')
                    width:30px
                    height :18px
                    background-size: 30px 18px

                .name   
                    display :inline-block
                    height :16px
                    line-height :16px
                    vertical-align :bottom
                    margin-left :0px
                    font-size :20px
                    font-weight :bold

            .description
                margin-bottom: 10px
                line-height :12px
                font-size :12px

            .support

                .icon
                    display :inline-block
                    vertical-align :top
                    width :12px
                    height :12px
                    margin-right :4px
                    background-size: 12px 12px
                    background-repeat: no-repeat

                    &.decrease
                        bg-image('decrease_1')

                .text
                    font-size :12px
                    line-height :12px
                    
            .support-count
                position: absolute
                right:14px
                bottom :5px
                height :24px
                line-height :24px
                padding:0 8px
                background-color:rgba(0,0,0,0.2)
                border-radius :14px
                text-align :center

                .count
                    vertical-align :top
                    font-size:12px

                .icon-keyboard_arrow_right
                    font-size:12px
                    margin-left :2px
                    line-height :24px

    .bulletin-wrapper
        position :relative
        height :28px
        line-height :28px
        padding :0 22px 0 12px
        white-space :nowrap
        background-color:rgba(0,0,0,0.4)
        overflow :hidden
        text-overflow: ellipsis

        .bulletin-title
            display :inline-block
            width :22px
            height :12px
            bg-image('bulletin') 
            background-size :22px 12px      
            background-repeat: no-repeat  
            vertical-align :top
            margin :7px 5px 0 0

        .bulletin-text
            font-size : 10px
            vertical-align :top
            margin-right :4px

        .icon-keyboard_arrow_right
            position :absolute
            font-size :10px
            right :12px
            top :8px
    
</style>