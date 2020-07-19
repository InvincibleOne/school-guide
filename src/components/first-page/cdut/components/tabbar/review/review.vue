<template>
    <div >
        <scroll class="review-wrapper" :pullup="true" @scrollToEnd="scrollToEnd" v-show="!ifCommenting">
            <div>
                <div class="review">
                    <div class="review-left">
                        <h1 class="score">{{ cdut.averageScore }}</h1>
                        <div class="title">综合评分</div>
                        <!-- <div class="rank">高于周边商家</div> -->
                    </div>
                    <div class="review-right">
                        <div class="content-wrapper">
                            <div v-for="( item, index ) in cdut.scores" :key="index"  class="score-wrapper">
                                <span class="title">{{ item.title }}</span>
                                <star-component :size="36" :score="item.score" class="star"></star-component>
                                <span class="score">{{ item.score }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <split-component></split-component>
                <!-- <comment-component></comment-component> -->
                <selectRatingType-component :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"
                    @changeOnlyContent="changeOnlyContent" @changeSelectType="changeSelectType"></selectRatingType-component>
                <div class="rating-wrapper">
                    <ul>
                        <li v-for="(rating,index) in ratings"  v-show="needShow(selectType, rating)" class="rating-item" :key="index">
                            <div class="avatar">
                            <img width="28" height="28" :src=" getHost() + '/public/images/person/' + rating.username + '.jpg' ">
                            </div>
                            <div class="content">
                                <h1 class="name">{{rating.username}}</h1>
                                <div class="star-wrapper">
                                    <!-- <star-component :size="24" :score="rating.score"></star-component> -->
                                    <!-- <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span> -->
                                </div>
                                <p class="text">{{rating.content}}</p>
                                <div v-show=" rating.prime " class="prime">
                                    <span  >他/她赞了一个</span>
                                    <span class="icon-thumb_up highlight" ></span>
                                </div>
                                
                                <div class="time">
                                    {{ rating.add_time | dateFormat}}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- <mt-button type="danger" size="large" plain>加载更多</mt-button> -->
                <loadMore-component v-show="ifLoading"></loadMore-component>
            </div>
        </scroll>
        <div class="leave_msg" @click="comment" v-show="!ifCommenting">
            <span>我要</span>
            <span>留言</span>
        </div>
        <comment-component v-show="ifCommenting" @addRating="addRating" @hide="changeIfCommenting" :type=" 'school' "></comment-component>
        <myAlert-component :alertText="alertText" @closeAlert="closeAlert" v-show="ifShowMyAlert"></myAlert-component>
    </div>
</template>
<script>
    import star from '../../star/star.vue'
    import split from '../../split/split.vue'
    import selectRatingType from '../../selectRatingType/selectRatingType.vue'
    import comment from '../../comment/comment.vue'
    import loadMore from '../../loadMore/loadMore.vue'
    import myAlert from '../../../../../alert/myAlert.vue'
    import {Toast} from "mint-ui"
    import { mapGetters, mapMutations } from 'vuex'
    const ERO_OK = 0
    const WEEK = 0
    const MONTH = 1
    const ALL = 2
    export default {
        props:{
            cdut:{
                type:Object
            }
        },
        data(){
            return {
                ratings: [],
                selectType: ALL,
                onlyContent: false,
                ifLoading: false,
                ifCommenting:false,
                alertText:'',
                ifShowMyAlert:false,
            }
        },
        created(){
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
            this.getRatings()
        },
        mounted(){
        },
        methods:{
            ...mapGetters( [ 'getHost' ] ),
            ...mapMutations( [ 'changeIfHideTitle' ] ),
            getRatings(){
                this.$http.post( this.getHost()+ '/getRatings', { type: 'school', school: 'cdut' })
                .then(result =>{
                    if(result.body.res_code === 0){
                        this.ratings = Object.assign( [], result.body.message )
                    }
                    else{
                    
                    }
                })
            },
            changeOnlyContent(){
                this.onlyContent = !this.onlyContent
            },
            changeSelectType(type){
                this.selectType = type
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
            scrollToEnd( ) {
                if ( this.ifLoading ){
                    return
                }
                this.ifLoading = true
                setTimeout( () => {
                    this.ifLoading = false
                },1000*2)
                // Toast({
                //     message: '加载中......',
                //     position: 'bottom',
                //     duration: 1000
                // });
            },
            comment(){
                let nowUser = sessionStorage.getItem( 'nowUser' ) 
                if ( nowUser ) {
                    this.ifCommenting = true
                    this.$emit( 'hideHeader' )
                    this.changeIfHideTitle( true )
                }
                
                else {
                    
                    this.alertText = '您还没有登录，请先登录！'
                    this.ifShowMyAlert = true
                }
            },
            changeIfCommenting(){
                this.$emit( 'showHeader' )
                this.ifCommenting = false
                this.changeIfHideTitle( false )
            },
            closeAlert(){
                this.ifShowMyAlert = false
            },
            addRating( rating){
                this.ratings.push( rating )
            }

        },
        components:{
            'star-component':star,
            'split-component':split,
            'selectRatingType-component':selectRatingType,
            'comment-component':comment,
            'loadMore-component':loadMore,
            'myAlert-component': myAlert
        },
        watch:{
        
        }
    }
</script>
<style lang="stylus" scoped>

    .review-wrapper
        position :fixed
        width :100%
        top : 266px
        bottom :0px
        overflow :hidden
        background-color :#f3f5f7

        .review
            display :flex
            width :100%
            height :118px
            padding :18px 0
            position :relative
            background-color #fff

            .review-left
                flex :0 0 118px
                border-right :1px solid rgba(0,0,0,0.2)
                text-align :center

                .score
                    margin-top: 5px
                    margin-bottom: 20px
                    line-height: 28px
                    font-size: 24px
                    color: rgb(255, 153, 0)
                
                .title
                    margin-bottom: 8px
                    line-height: 12px
                    font-size: 12px
                    color: rgb(7, 17, 27)

                .rank
                    line-height: 10px
                    font-size: 10px
                    color: rgb(147, 153, 159)

            .review-right
                flex :1
                position :relative

                .content-wrapper
                    position :absolute
                    width :180px
                    height 82px
                    left :50%
                    transform :translate(-50%,0)

                    .score-wrapper
                        width :100%
                        height :22px
                        margin-bottom :8px
                        .title
                            display: inline-block
                            line-height: 15px
                            vertical-align: middle
                            font-size: 12px
                            color: rgb(7, 17, 27)

                        .star
                            display: inline-block
                            line-height: 15px
                            height :15px
                            vertical-align: middle

                        .score
                            display: inline-block
                            line-height: 15px
                            vertical-align: middle
                            font-size: 12px
                            margin-left :5px
                            color: rgb(255, 153, 0)

                    .delivery-wrapper
                        font-size: 0
                        .title
                            line-height: 18px
                            font-size: 12px
                            color: rgb(7, 17, 27)
                        .delivery
                            margin-left: 12px
                            font-size: 12px
                            color: rgb(147, 153, 159)

    .rating-wrapper
        padding: 0 18px

        .rating-item
            display: flex
            padding: 18px 0
            

            .avatar
                flex: 0 0 28px
                width: 28px
                margin-right: 12px

                img
                    border-radius: 50%
            .content
                position: relative
                flex: 1

                .highlight
                        color: dodgerblue

                .name
                    margin-bottom: 4px
                    line-height: 12px
                    font-size: 10px
                    color: rgb(7, 17, 27)

                .star-wrapper
                    margin-bottom: 6px
                    font-size: 0

                    .star
                        display: inline-block
                        margin-right: 6px
                        vertical-align: top

                    .delivery
                        display: inline-block
                        vertical-align: top
                        line-height: 12px
                        font-size: 10px
                        color: rgb(147, 153, 159)

                .text
                    margin-bottom: 8px
                    line-height: 18px
                    color: rgb(7, 17, 27)
                    font-size: 12px

                .prime
                    font-size: 12px

                    .icon-thumb_up
                        display: inline-block
                        margin: 0 8px 4px 0
                        font-size: 12px

                .recommend
                    line-height: 16px
                    font-size: 0

                    .icon-thumb_up, .item
                        display: inline-block
                        margin: 0 0px 4px 5px
                        font-size: 9px
                        
                    .icon-thumb_up
                        color: rgb(0, 160, 220)
                    .item
                        padding: 0 6px
                        border: 1px solid rgba(7, 17, 27, 0.1)
                        border-radius: 1px
                        color: rgb(147, 153, 159)
                        background: #fff
                .time
                    position: absolute
                    top: 0
                    right: 0
                    line-height: 12px
                    font-size: 10px
                    color: rgb(147, 153, 159)

    .leave_msg
        position: fixed
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