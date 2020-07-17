<template>
    <div class="wrapper">
        <div class="app_icon_wrapper">
            <div class="content">
                    <div class="app_icon">
                        <img src="./images/app.jpg" alt="">
                    </div>
                    <div class="app_name">
                        <span class="text">云上逛大学</span>
                    </div>
            </div>
        </div>
        <div class="mui-input-row myclass">
            <input type="text" class="mui-input-clear" placeholder="请输入用户名" v-model="username">
            <span class="mui-icon mui-icon-clear mui-hidden"></span>
        </div>
        <div class="mui-input-row mui-password myclass">
            <form action="">
                <input :type=" inputIsPassword ? 'password' : 'text' " class="mui-input-password" placeholder="请输入密码" autocomplete="off" v-model="password">
                <span class="mui-icon mui-icon-eye" @click="changeInputType" :style=" 'color:'+ (inputIsPassword ? 'grey' : 'blue') "></span>
            </form>
        </div>
        <div class="captcha">
            <div class="captcha-input">
                <div class="mui-input-row ">
                    <input type="text" placeholder="请输入验证码" v-model="capInput">
                </div>
            </div>
            <div class="captcha-pic">
                <span class="captcha-pic-wrapper"><img :src="captchas" alt="" ></span>
            </div>
            <div class="change-captcha">
                <span class="text">看不清</span>
                <span class="text" @click="changeCaptcha"><a>换一张</a></span>
            </div>
        </div>
        <button type="button" class="mui-btn mui-btn-success mui-btn-block" @click="checkInput">登录</button>
        <router-link to="/my/register" >
            <span class="turn">注册</span>
        </router-link>
        <my-alert :alertText="alertText" v-show="inputError" @closeAlert="closeAlert"></my-alert>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import myAlert from '../alert/myAlert.vue'
import { mapMutations, mapGetters } from 'vuex'
export default {
    data() {
        return {
            captchas: null,
            capInput: null,
            alertText: '',
            inputError: false,
            inputIsPassword: true,
            username: '',
            password: ''
        }
    },
    created() {
        this.changeTitle( '登录' )
        this.getCaptcha()
        
    },
    components: {
        'myAlert': myAlert
    },
    methods: {
        ...mapMutations( [ 'changeTitle' ,'changeIfLogined'] ),
        ...mapGetters( [ 'getHost' ] ),
        getCaptcha() {
            this.$http.get( this.getHost() + '/getCaptchas', { credentials: true } ).then( ( response ) => {
                response = response.body
                if ( response.status == 1 ) {
                    this.captchas = response.code;
                    // let coo = document.cookie.split( ';' )
                    // let coo = Cookies.get( 'cap' )
                }
            } )
        },
        login() {
            this.$http.post( this.getHost() + '/login', {  username: this.username.trim(), password: this.password.trim() }, 
            { emulateJSON: true } ).then(
                res => {
                    // console.log( res.body )
                    if ( res.body.res_code == 1 ) {
                        this.alertText = '用户名或密码错误，请重试！'
                        this.inputError = true
                        return 
                    }
                    else if ( res.body.res_code == 500 ) {
                        this.alertText = '服务器发生错误，请重试！'
                        this.inputError = true
                        return 
                    }
                    else {
                        this.changeIfLogined( true )
                        sessionStorage.setItem( 'nowUser', this.username )
                        this.$router.push({ path: '/my' }); 
                    }
                }
            )
        },
        changeCaptcha(){
            this.getCaptcha()
        },
        checkInput() {
            if ( this.username.length == 0 || this.password.length == 0  ) {
                this.alertText = '用户名或密码不能为空！'
                this.inputError = true
                return 
            }
            else if ( this.capInput !== Cookies.get( 'cap' ) ) {
                console.log( Cookies.get( 'cap' ) )
                this.alertText = '验证码输入不正确！'
                this.inputError = true
                this.changeCaptcha()
                return 
            }
            else {
                this.login()
            }
        },
        closeAlert() {
            this.inputError = false
        },
        changeInputType(){
            this.inputIsPassword = !this.inputIsPassword
        }
    }

}
</script>
<style lang="stylus" scoped>

    * {
        margin: 0;
        padding: 0;
    }

    .wrapper {
        position : absolute;
        width :100%;

    .app_icon_wrapper {
        position : relative
        width : 100%;
        height : 160px;
        padding-top: 40px;
        background-color #fff;

        .content {
            position: absolute;
            width: 260px;
            height : 80px;
            margin :auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            .app_icon {
                width :80px;
                height :80px;
                display: inline-block;
                height : 80px
                line-height : 80px;
                vertical-align : middle;
                img {
                    width : 80px;
                    height  : 80px;
                    border : 2px solid rgba( 0, 0, 0, 0.4 );
                    border-radius: 50%;
                }
            }

            .app_name {
                display: inline-block;
                height : 80px
                

                .text {
                    display: inline-block;
                    height : 80px
                    line-height : 80px;
                    vertical-align : middle;
                    font-size :30px;
                    font-weight: 900; 
                    padding-left: 15px;
                    color : rgba( 0, 0, 0, 0.4 );
                }
            }
        }
    }



        .myclass {
            height: 50px;
            
            input {
                height: 50px;
                font-size: 16px;
                margin-bottom: 0px;
                border-top: none ;
            }
            .mui-icon-eye {
                display: inline-block;
                line-height: 50px;
                height :50px;
                top: 0;
                vertical-align: middle;
                font-size: 22px;
                padding-right: 15px;
            }
            .mui-icon-clear {
                display: inline-block;
                line-height: 50px;
                height :50px;
                top: 0;
                vertical-align: middle;
                font-size: 22px;
                padding-right: 15px;
            }
        }
        
        .captcha {
            display :flex;
            width:100%;
            height 50px;
            color: #333;
            background-color :#fff;
            box-sizing: border-box;
            border: 1px solid rgba( 0, 0, 0, 0.3 );
            border-top: none;
            border-bottom: none;

            .captcha-input {
                flex :1;

                input {
                    height: 50px;
                    font-size: 16px;
                    margin-bottom: 0px;
                    border: none ;
                }
            }
            
            .captcha-pic {
                flex : 0 0 80px;

                .captcha-pic-wrapper {
                    display: inline-block;
                    height :50px;
                    padding-top :5px;
                    
                    img {
                        width: 80px;
                        height: 40px;
                        font-size: 20px;
                        font-weight:700;
                    }
                }
            }

            .change-captcha {
                flex: 0 0 75px;

                .text {
                    display: inline-block;
                    height 25px;
                    line-height :25px;
                    vertical-align :middle;
                    padding: 0 5px 0 10px;
                    font-size: 15px;
                }
            }
        }

        .mui-btn-block {
            height : 40px;
            padding-left :20px;
            font-weight : 700;
        }

        .turn {
            display: inline-block;
            position: relative;
            left: calc( 100% - 52px );
            height: 40px;
            line-height: 40px;
            color: purper ;
        }
    }
</style>