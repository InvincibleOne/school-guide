<template>
    <div class="alert_wrapper">
        <div class="alert_container">
            <div class="animation_box">
                <div class="tip_text_container">
                    <div class="tip_icon_box">
                        <div class="tip_icon">
                            <div class="tip_icon_inner"></div>
                                <span></span>
                                <span></span>
                        </div>
                    </div>
                    <div class="tip_text_box">
                        <span class="tip_text">{{ alertText }}</span>
                    </div>
                </div>
                <span class="confrim" @click="closeMyAlert">确定</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
        props: ['alertText'],
        methods: {
            closeMyAlert(){
                this.$emit('closeAlert')
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
        height: 200px;
        top: 50%;
        left: 50%;
        transform: translate(  -50%, -50%);
        background-color: #fff;
        text-align: center;
        border-radius: 3%;
        border: 1px solid rgba( 0, 0, 0, 0.2);
        border-bottom: none;
        

        .animation_box {
            animation: alertMove .4s ;
            .tip_text_container {
            
                position: relative;
                width: 100%;
                height: 150px;
                margin-top: 10px;
                background-color: #fff;
                border-radius: 3%;
            
                .tip_icon_box {
                    width: 100%;
                    height: 70px;
                    .tip_icon{
                    
                        position: relative;
                        margin-left: 40%;
                        width: 20%;
                        height: 0;
                        padding-top: 20%;
                        background-color:  #f8cb86;
                        border-radius: 50%;

                        .tip_icon_inner {
                            position: absolute;
                            width: 85%;
                            height: 85%;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%,-50%);
                            background-color: #fff;
                            border-radius: 50%;
                        }

                        span {
                            position: absolute;
                            margin-top: -85%;
                            width: 5px;
                            height: 70%;
                            left: 50%;
                            transform: translateX(-50%);
                            background-color:  #f8cb86;
                        }
                        span:nth-of-type(2){
                            margin-top: -35%;
                            height: 10%;
                            background-color: #fff;
                        }
                    }
                }
                .tip_text_box {
                    position: relative;
                    width: 100%;
                    height: 80px;
                    overflow: hidden;
                    background-color: #fff;
                    .tip_text {
                        display: inline-block;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate( -50%,  -50% );
                        width: 60%;
                    }
                }
            }
            .confrim{
                display: inline-block;
                width: 100%;
                height: 40px;
                line-height: 40px;
                vertical-align: middle;
                background-color: #4cd964;
                border-radius: 5%;
                color: #fff;
            }
        }
    }
</style>
