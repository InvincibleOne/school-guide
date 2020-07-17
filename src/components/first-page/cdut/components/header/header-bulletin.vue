<template>
    <div class="bulletin" >
        <div class="bulletin-wrapper clearfix">
            <div class="main">
                <h1 class="name">{{ cdut.name }}</h1>
                <div class="stars">
                    <star-component :size="48" :score="3.5"></star-component>
                </div>
                <div class="title">
                    <div class="line"></div>
                    <div class="text">基础信息</div>
                    <div class="line"></div>
                </div>
                <ul  class="supports">
                    <li class="supports-item" >
                        <!-- <span class="icon" :class="classMap[cdut.supports[index].type]"></span> -->
                        <span class="text">学校简称：{{ cdut.school_short_name}}</span>
                    </li>
                    <li class="supports-item" >
                        <span class="text">成立时间：{{ cdut.foundingTime}}</span>
                    </li>
                    <li class="supports-item" >
                        <span class="text">学校校训：{{ cdut.school_motto}}</span>
                    </li>
                    <li class="supports-item" >
                        <span class="text">学校属性：{{ cdut.school_attr}}</span>
                    </li>
                </ul>
                <div class="title">
                    <div class="line"></div>
                    <div class="text">学校概况</div>
                    <div class="line"></div>
                </div>
                <div class="bulletin-detail">
                    <p class="content">{{ cdut.intro}}</p>
                </div>

                
            </div>
        </div>
        <div class="close" @click="hide">
            <i class="icon-close"></i>
        </div>
    </div>
</template>
<script>
import star from '../star/star.vue'
export default {
    props:{
        cdut:{
            type:Object
        },
        classMap:{
            type:Array
        }
    },
    components:{
        'star-component':star,
    },
    methods:{
        hide(){
            this.$emit('hideBulletinDetail')
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~commom/stylus/mixin.styl"
@import "~commom/stylus/base.styl"
.bulletin
    position :fixed
    width :100%
    height :100%
    z-index :100
    left :0
    top :0
    font-size :0
    backdrop-filter: blur(4px)
    overflow: auto
    background-color :rgba(7,17,27,0.8)

    .bulletin-wrapper
        width :100%
        min-height :100%
        .main
            margin-top: 64px
            padding-bottom: 64px

            .name
                margin :0
                padding :0
                line-height :16px
                font-size :16px
                text-align :center
                font-weight : 700

            .stars
                margin-top: 26px
                text-align: center
                height :20px

            .title
                width :80%
                display :flex
                margin:28px auto

                .line
                    flex: 1
                    position :relative
                    top: -9px
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2)

                .text
                    font-size :14px
                    padding :0 8px
                    font-weight:700

            .supports
                width :80%
                padding :0
                margin :0 auto

                .supports-item
                    padding: 0 12px
                    margin-bottom: 12px
                    height :16px
                    font-size: 0
                    
                    &:last-child
                        margin-bottom :0
                    
                    .icon
                        display :inline-block
                        width :16px
                        height :16px
                        margin-right :6px
                        background-size :16px 16px
                        background-repeat :no-repeat
                        &.decrease
                            bg-image('decrease_2')
                        &.discount
                            bg-image('discount_2')
                        &.guarantee
                            bg-image('guarantee_2')
                        &.invoice
                            bg-image('invoice_2')
                        &.special
                            bg-image('special_2')
                    .text
                        line-height: 16px
                        font-size: 12px
                        vertical-align :top

            .bulletin-detail
                width :80%
                margin :0 auto

                .content
                    line-height :24px
                    font-size : 12px
                    padding :0 12px
                    text-align:justify
                    text-justify:inter-ideograph
                    color :white
    .close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
        
</style>