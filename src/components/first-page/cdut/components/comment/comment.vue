<template>
    <div class="cmt-container">
        <img :src=" getHost() +  imgUrl" alt="">
        <hr>
        <textarea placeholder="请输入留言内容"  maxlength="120" v-model="msg"></textarea>
        <div class="prime">
            <div class="content-box" :class=" { 'highlight' : ifPrime} ">
                <span class="text">赞一个</span>
                <span class="icon-thumb_up bigger" @click="prime"></span>
            </div>
        </div>
        <mt-button type="primary" size="large" @click="postComent" >发表留言</mt-button>
        <hr><hr>
        <mt-button  type="danger" size="large"  plain @click="hide">取消留言</mt-button>
        
    </div>

</template>
<script>
import {Toast} from "mint-ui"
import { mapGetters } from 'vuex'
export default {
    props: {
        type:{
            type:String,
            default: 'school'
        },
        imgUrl:{
            type:String,
            default: '/public/images/cdut/all_sites.jpg'
        }, 
        school:{
            type:String,
            default: 'cdut',
        },
        viewPoint: {
            type: String,
            default: ''
        }
    },
    data(){
        return{
            pageIndex:1,
            coments:[ ],
            msg:'',
            ifPrime:false
        };
    },
    created(){
        
    },
    methods:{
        ...mapGetters( [ 'getHost' ] ),
        
        postComent(){
            if(this.msg.trim().length === 0 && !this.ifPrime){
                return Toast('请输入留言内容或者点赞！')
            }
            let prime = this.ifPrime ? 1 : 0
            rating =  {type: this.type, school: this.school, viewpoint: this.viewPoint, username:sessionStorage.getItem( 'nowUser' ), add_time:Date.now(), avator_address: '/public/images/login_avator.jpg', content: this.msg.trim(), prime:prime}
            this.$emit( 'addRating', rating )
            this.$http.post( this.getHost() + '/commitComment', rating )
            .then(function(result){
                if(result.body.res_code === 0){
                    Toast( result.body.message)
                }
            })
            this.$emit('hide')
        },
        prime(){
            this.ifPrime = !this.ifPrime
        },
        hide(){
            this.$emit('hide')
        }
    },
    
}
</script>
<style lang="scss" scoped>
.cmt-container{
    position: fixed;
    img{
        width: 100%;
        height: 200px;
    }
    textarea{
        font-size:14px;
        height: 125px;
        margin: 0;
        }
    .cmt-list{
        margin: 10px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color:#ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
    .prime{
        width: 100%;
        height: 45px;
        padding: 10px 20px 20px 20px;
        color: rgba( 0, 0, 0, 0.6 );
        font-size: 15px;
        .content-box{
            float: right;
            background-color: #fff;
            .text{
                margin-right: 10px;
            }
            .bigger{
                font-size:16px;
            }
        }
        .highlight{
                color: dodgerblue
            }
    }
}

</style>