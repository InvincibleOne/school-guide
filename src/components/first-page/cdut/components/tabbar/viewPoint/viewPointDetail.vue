<template>
    <div >
            <scroll :listenScroll="true" :pullup="true" @scrollToEnd="loadMore"  ref="scrollActive" class="foodDtail-wrapper" v-show="!ifCommenting">
                <div >
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                    <div class="img-container">
                        <img :src=" host + viewPoint.imgAddress" alt="" >
                    </div>
                    <div class="food-content">
                        <h1 class="title">{{viewPoint.name}}语音介绍</h1>
                        <audio :src=" host + viewPoint.audioAddress" controls="controls"></audio>
                    </div>
                    <split-component ></split-component>
                    <div class="info" >
                        <iframe :src="viewPoint.vrAddress"></iframe>
                    </div>
                    <split-component ></split-component>
                    <div class="info" >
                        <h1 class="title">{{ viewPoint.name }}简介</h1>
                        <p class="text">{{ viewPoint.intro }}</p>
                    </div>
                    <split-component></split-component>
                    <selectRatingType-component :selectType="selectType" :onlyContent="onlyContent" :desc="desc"
                        :ratings="ratings" @changeOnlyContent="changeOnlyContent" @changeSelectType="changeSelectType"></selectRatingType-component>

                    <div class="rating-wrapper">
                        <ul >
                            <li  v-for="(rating,index) in ratings" v-show="needShow(selectType, rating)"  class="rating-item " :key="index">
                            <div class="user">
                                <span class="name">{{rating.username}}</span>
                                <img class="avatar" width="12" height="12" :src=" host + rating.avator_address">
                            </div>
                            <div class="time">{{ rating.add_time | dateFormat}}</div>
                            <p class="text">
                                <!-- <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}" ></span> -->
                                {{rating.content}}
                            </p>
                            <p class="text">
                                <span :class="{'icon-thumb_up':rating.prime}" ></span>
                            </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!ratings || !ratings.length">暂无留言</div>
                    </div>
                    <loadMore-component v-show="ifLoading"></loadMore-component>
                </div>
            </scroll>
            <div class="leave_msg" @click="comment" v-show="!ifCommenting">
                <span>我要</span>
                <span>留言</span>
            </div>
            <comment-component v-show="ifCommenting"  @addRating="addRating"  @hide="changeIfCommenting" :type=" 'viewpoint' " :imgUrl="viewPoint.imgAddress" :viewPoint=" viewPoint.name "></comment-component>
            <myAlert-component :alertText="alertText" @closeAlert="closeAlert" v-show="ifShowMyAlert"></myAlert-component>
    </div>
</template>
<script>
import selectRatingType from '../../selectRatingType/selectRatingType.vue'
import comment from '../../comment/comment.vue'
import split from '../../split/split.vue'
import myAlert from '../../../../../alert/myAlert.vue'
import loadMore from '../../loadMore/loadMore.vue'
import Vue from 'vue'
import { mapGetters } from 'vuex'

const ALL = 2;
const MONTH = 1;
const WEEK = 0
export default {
    props :{
        viewPoint:{
            type :Object
        },
        ratings:{
            type:Array
        }
    },
    data(){
        return {
            selectType: ALL,
            onlyContent: false,
            ifCommenting: false,
            alertText:'',
            ifShowMyAlert:false,
            ifLoading: false,
            host:'',
            desc: {
                all: '全部',
                month: '7天内',
                week: '3天内'
            }
        }
    },
    created(){
    },
    methods :{
        ...mapGetters( [ 'getHost' ] ),

        hide(){
            this.$emit('hideFoodDetail')
        },
        needShow(type,rating){
            if(this.onlyContent && !rating.content){
                return false
            }
            else if(this.selectType == ALL){
                return true
            }
            else if( this.selectType == MONTH ){
                let dif_value = new Date( Date.now() ).getTime() - new Date( rating.add_time ).getTime() ;
                return dif_value < 1000*60*60*24*7;
            }
            else {
                let dif_value = new Date( Date.now() ).getTime() - new Date( rating.add_time ).getTime() ;
                return dif_value < 1000*60*60*24*3;
            }
        },
        comment(){
            let nowUser = sessionStorage.getItem( 'nowUser' ) 
            if ( nowUser ) {
                this.ifCommenting = true
                this.$emit( 'hideAll' )
            }
            else {
                this.alertText = '您还没有登录，请先登录！'
                this.ifShowMyAlert = true
            }
        },
        changeOnlyContent(){
            this.onlyContent = !this.onlyContent
        },
        changeSelectType(type){
            this.selectType = type
        },
        changeIfCommenting(){
            this.$emit( 'showAll' )
            this.ifCommenting = false
        },
        closeAlert(){
            this.ifShowMyAlert = false
        },
        addRating( rating){
            this.ratings.push( rating )
        },
        loadMore(){
            if ( this.ifLoading ){
                return
            }
            this.ifLoading = true
            setTimeout( () => {
                this.ifLoading = false
            },1000*2)
        },
    },
    mounted(){
        this.host = this.getHost()
    },
    components:{
        'split-component':split,
        'selectRatingType-component':selectRatingType,
        'comment-component':comment,
        'loadMore-component':loadMore,
        'myAlert-component':myAlert
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
}
</script>
<style lang="stylus" scoped>    

    *
        padding :0
        margin :0

    

    .foodDtail-wrapper
        position :fixed
        z-index :100
        width :100%
        top :0
        height :calc(100% - 0px)
        overflow :hidden
        background-color :rgba(255,255,255,1)

        .img-container
            position :relative
            width :100%
            height :0
            padding-top :80%
            border :solid 2px rgba(255,255,255,0.6)
            

            img 
                position :absolute
                top :0
                left :0
                width :100%
                height :100%
                

        .back
            position :fixed
            z-index :150
            top :20px
            left : 20px
            font-size :20px
            color :rgb(250,250,250)
            animation : expand_scale 2s infinite

            @keyframes expand_scale 
                0%
                    font-size :20px
                    left :20px
                50%
                    font-size :23px
                    left :16px
                100%
                    font-size :20px
                    left :20px

        .food-content
            position: relative
            padding: 18px

            .title
                line-height: 14px
                margin-bottom: 18px
                font-size: 14px
                font-weight: 700
                color: rgb(7, 17, 27)

            .detail
                margin-bottom: 18px
                line-height: 10px
                height: 10px
                font-size: 0

                .sell-count, .rating
                    font-size: 10px
                    color: rgb(147, 153, 159)

                    .sell-count
                        margin-right: 12px
            .price
                font-weight: 700
                line-height: 24px

                .now
                    margin-right: 8px
                    font-size: 14px
                    color: rgb(240, 20, 20)
                    
                .old
                    text-decoration: line-through
                    font-size: 10px
                    color: rgb(147, 153, 159)
            .add-shopcar-control
                position: absolute
                width :100px
                right: 20px
                bottom: 42px

            .add-shopcar
                position: absolute
                width :100px
                right: 10px
                bottom: 18px
                text-align :center

                .add 
                    display :inline-block
                    line-height :25px
                    width :80px
                    height :25px
                    right: 10px
                    bottom: 18px
                    vertical-align :middle
                    border-radius: 12px
                    font-size: 10px
                    color: #fff
                    background: #00a0dc

        .info
            padding: 18px

            iframe 
                width 100%
                height 360px;

            .title
                line-height: 14px
                margin-bottom: 6px
                font-size: 14px
                color: rgb(7, 17, 27)
                

            .text
                line-height: 24px
                padding: 0 8px
                font-size: 12px
                color: rgb(77, 85, 93)
                text-align:justify
                text-justify:inter-ideograph

        .rating-wrapper
            width :100%
            padding :0 18px
            font-size :10px
            

            .rating-item
                padding :16px 0
                list-style :none
                position: relative

                .user
                    position: absolute
                    right: 0
                    top: 16px
                    line-height: 12px
                    font-size: 0

                    .name
                        display: inline-block
                        margin-right: 6px
                        vertical-align: top
                        font-size: 10px
                        color: rgb(147, 153, 159)

                    .avatar
                        border-radius: 50%

                .time
                    margin-bottom: 6px
                    line-height: 12px
                    font-size: 10px
                    color: rgb(147, 153, 159)

                .text
                    line-height: 16px
                    font-size: 12px
                    color: rgb(7, 17, 27)

                    .icon-thumb_up, .icon-thumb_down
                        margin-right: 4px
                        line-height: 16px
                        font-size: 12px

                    .icon-thumb_up
                        color: rgb(0, 160, 220)

                    .icon-thumb_down
                        color: rgb(147, 153, 159)

            .no-rating
                padding: 16px 0
                font-size: 12px
                color: rgb(147, 153, 159)
    .leave_msg
        position: fixed
        z-index: 500
        width 50px
        height 50px
        right 20px
        bottom 40px
        border-radius: 50%
        text-align : center
        background-color #00a0dc
        animation: grow 5s linear infinite

        @keyframes grow 
            0%
                right: 20px
            50%
                right: 0
            100%
                right: 20px

        span
            font-size: 13px
            color #fff
            display : inline-block
            height : 16px
            line-height : 16px
            vertical-align : center
</style>