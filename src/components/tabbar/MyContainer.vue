<template>
    <div class="my-page">
        <div class="header">
            <div class="content-box">
                <span class="avator" v-if="!nowUser">
                    <img :src="default_image" alt="">
                </span>
                <router-link to="/my" v-if="nowUser"> 
                    <span class="avator">
                        <img :src="nowUser ? login_image : default_image" alt="">
                    </span>
                </router-link>
                <router-link to="/my/login" v-if="!nowUser"> 
                    <span >登录</span>
                </router-link>
                <span v-if="nowUser">{{ nowUser }}</span>
                <span  >&nbsp;/&nbsp;</span>
                <span v-if="nowUser" @click="loginOut">退出</span>
                <router-link to="/my/register" v-if="!nowUser"> 
                    <span >注册</span>
                </router-link>
            </div>
        </div>
        
		<div class="content " :class=" [nowUser ? 'highlight' : ''] ">
            <div class="item ">
                <span class="posi ">
                    <span class="mui-icon mui-icon-person"></span>
                </span>
                <span class="text">个人中心</span>
                <span class="array">
                    <span class="mui-icon mui-icon-arrowright"></span>
                </span>
            </div>
            <div class="item">
                <span class="posi">
                    <span class="mui-icon mui-icon-chatbubble"></span>
                </span>
                <span class="text">消息中心</span>
                <span class="array">
                    <span class="mui-icon mui-icon-arrowright"></span>
                </span>
            </div>
            
            <div class="item">
                <span class="posi">
                    <span class="mui-icon mui-icon-location"></span>
                </span>
                <span class="text">我的位置</span>
                <span class="array">
                    <span class="mui-icon mui-icon-arrowright"></span>
                </span>
            </div>
            <div class="item">
                <span class="posi">
                    <span class="mui-icon mui-icon-gear"></span>
                </span>
                <span class="text">我的设置</span>
                <span class="array">
                    <span class="mui-icon mui-icon-arrowright"></span>
                </span>
            </div>
            <div class="item">
                <span class="posi">
                    <span class="mui-icon mui-icon-help"></span>
                </span>
                <span class="text">帮助信息</span>
                <span class="array">
                    <span class="mui-icon mui-icon-arrowright"></span>
                </span>
            </div>
            <div class="item">
                <span class="posi">
                    <span class="mui-icon mui-icon-settings"></span>
                </span>
                <span class="text">其他</span>
                <span class="array">
                    <span class="mui-icon mui-icon-arrowright"></span>
                </span>
            </div>
        </div>
        
        
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                default_image: this.getHost() + '/public/images/default_avator.jpg',
                login_image: this.getHost() + '/public/images/login_avator.jpg',
                nowUser:''
            }
        },
        created(){
            this.nowUser = sessionStorage.getItem( 'nowUser' )
        },
        methods : {
            ...mapGetters( [ 'getHost' ] ),
            loginOut(){
                this.nowUser = '',
                sessionStorage.setItem( 'nowUser','' )
            }
        }
    }
</script>
<style lang="scss" scoped>
    .my-page {
        width: 100%;
        height: 100%;
        .header {
            position: relative;
            width: 100%;
            height: 160px;
            background-color: #33CCEE;
            .content-box {
                position: absolute;
                width: 100%;
                height: 60px;
                top: 50%;
                transform: translateY(-50%);
                span {
                    display: inline-block;
                    height: 60px;
                    line-height: 60px;
                    vertical-align: middle;
                    color: #fff;
                    font-size: 20px;
                    font-weight: 700;
                }
                .avator {
                    width: 60px;
                    margin: 0 15px 0 40px;
                    img {
                        width: 100%;
                        height: 100%;
                        border: 2px solid rgba( 0, 0, 0, 0.2);
                        border-radius: 50%;
                    }
                }
            }
        }

       
        .content {
            position: relative;
            width: 100%;
            color: darkgray;
            
            .item {
                width: 100%;
                height: 50px;
                background-color: rgba( 255, 255, 255, 0.9);
                border-bottom: 1px solid rgba( 0, 0, 0, 0.1);
                span {
                    display: inline-block;
                    height: 50px;
                    line-height: 50px;
                    vertical-align: middle;
                }
                .posi {
                    margin: 0 30px 0 15px
                }
                .array {
                    position: absolute;
                    right: 10px;
                }
            }
        }
        .highlight{
            color: #33CCEE
        }
    }
</style>