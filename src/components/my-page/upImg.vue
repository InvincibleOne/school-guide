<template>
    <div class="alert_wrapper">
        <div class="alert_container">
            <div class="animation_box">
                <div class="tip_text_container">
                    <div class="tip_icon_box">
                        <img :src=" imgUrl " alt="">
                    </div>
                </div>
                <input type="file" id="qiniuPic" style="display: none;"  accept="image/*" name="qiniuPic" ref="qiniuPic" @change=" change ">
                <span class="btn  small-btn-re-up " @click="reChoose">从新选择</span>
                <span class="btn  small-btn-cancel " @click="closeBox">取消</span>
                <span class="btn big-btn" @click="commitImg">确定</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props:[ 'loginAvator' ],
        data(){
            return {
                imgUrl: '',
                nowUser:'',
                ifChoosed:false,
            }
        },
        created(){
            this.nowUser = sessionStorage.getItem( 'nowUser' )
            this.imgUrl = this.getHost() + this.loginAvator
        },
        methods: {
            ...mapGetters( [ 'getHost' ] ),
            closeMyAlert(){
                this.$emit('closeAlert')
            },
            change(){
                this.imgUrl = URL.createObjectURL(this.$refs.qiniuPic.files[0])
                this.ifChoosed = true
            },
            reChoose(){
                var input_file= this.$refs.qiniuPic;
                input_file.click();
            },
            commitImg(){
                if ( !this.ifChoosed ) { //没有从新选择图片
                    this.$emit( 'closeBox')
                    return
                }
				let form = new FormData();
                form.append('file', this.$refs.qiniuPic.files[0], this.nowUser + '.jpg&' + this.nowUser);
				//接口部分
                this.$http.post( this.getHost() +  "/upImg", form, 
                {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
                }).then( response => {
                    this.$emit( 'changeAvatorAddress', response.body.data.avatorImgPath )
                    this.$emit( 'closeBox', false)
                } )
                
            },
            closeBox(  ){
                this.ifChoosed = false
                this.$emit( 'closeBox')
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~commom/sass/mixin.scss' ;

	@keyframes alertMove {
        0% { transform: scale(1)}
        25% { transform: scale(0.9)}
        75% { transform: scale(1.1)}
        100% { transform: scale(1)}
    }

    .alert_wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba( 255, 255, 255, 0.6);        
        z-index: 200;
    }
    .alert_container{
        position: absolute;
        width: 80%;
        height: 260px;
        top: 50%;
        left: 50%;
        transform: translate(  -50%, -50%);
        background-color: rgba(255, 255, 255, 0.822);
        text-align: center;
        border-radius: 3%;
        border: 1px solid rgba( 0, 0, 0, 0.2);
        border-bottom: none;
        

        .animation_box {
            animation: alertMove .4s ;
            .tip_text_container {
            
                position: relative;
                width: 100%;
                height: 160px;
                margin-top: 10px;
                border-radius: 3%;
            
                .tip_icon_box {
                    width: 100%;
                    height: 160px;
                    
                    img{
                        width: 160px;
                        height: 160px;
                        border: 1px solid #99CCFF;
                        border-radius: 50%;
                    }
                }
            }
            .btn{
                display: inline-block;
                margin-top: 5px;
                width: 49%;
                height: 40px;
                line-height: 40px;
                vertical-align: middle;
                border-radius: 5%;
                color: #fff;
            }
            .small-btn-re-up {
                background-color:#00CCFF;
            }
             .small-btn-cancel {
               border: 2px solid red;
               color: red
            }
            
            .big-btn {
                width: 100%;
                background-color: #4cd964;
            }
        }
    }
</style>
