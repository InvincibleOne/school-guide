<template>
    <div>
        <swiper :lunbotuList="lunbotuList" :isFull='true'></swiper>
        <div class="select-content">
            <span class="text">所属省份:</span>
            <select v-model="selectedProvince" >
                <option v-for="( item, index ) in provinces" :key="index" :value=item[0] >{{ item[1] }}</option>
            </select>
            <input type="text">
        </div>
        <scroll class="scroll-box">
            <ul class="mui-table-view mui-grid-view mui-grid-9" >
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-show=" this.selectedProvinceCopy == 'SiChuan' " @click="showMyAlert( true )">
                    <!-- <router-link to="/home/cdut"> -->
                        <img :src="getHost() + '/public/images/province/sichuan/chengduligongdaxue.jpg'">
                        <div class="mui-media-body">成都理工大学</div>
                    <!-- </router-link> -->
                </li>
                <li v-for="( value, key ) in schools" :key="key"  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click="showMyAlert( false )">
                    <!-- <router-link to="/home"> -->
                    <img :src=" getHost() + '/public/images/province/' + selectedProvinceCopy.toLowerCase() + '/' + key + '.jpg' ">
                    <div class="mui-media-body">{{ value }}</div>
                    <!-- </router-link> -->
                </li>
            </ul> 
        </scroll>
        <myAlert :alertText="alertText" @closeAlert="closeAlert" v-show="ifShowMyAlert"></myAlert>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import swiper from '../subconponents/swipe.vue'
import { mapMutations, mapGetters } from 'vuex'
import myAlert from '../alert/myAlert.vue'
const ERO_OK = 0
export default {
    data(){
        return {
            lunbotuList:[
                {img:require('../../images/lunbotu1.jpg')},
                {img:require('../../images/lunbotu2.jpg')},
                {img:require('../../images/lunbotu3.jpg')},
                {img:require('../../images/lunbotu4.jpg')},
                {img:require('../../images/lunbotu5.jpg')},
                {img:require('../../images/lunbotu6.jpg')},
            ],
            provinces: [
                [ 'SiChuan', '四川'],
                [ 'BeiJing', '北京'],
                [ 'ShangHai', '上海'],
                [ 'TianJin', '天津'],
                [ 'ChongQing', '重庆'],
                [ 'XiangGang', '香港'],
                [ 'Aomen', '澳门'],
                [ 'AnHui', '安徽'],
                [ 'FuJian', '福建'],
                [ 'GuangDong', '广东'],
                [ 'GuangXi', '广西'],
                [ 'GuiZhou', '贵州'],
                [ 'GanSu', '甘肃'],
                [ 'HaiNan', '海南'],
                [ 'HeBei', '河北'],
                [ 'HeNan', '河南'],
                [ 'HeiLongJiang', '黑龙江'],
                [ 'HuBei', '湖北'],
                [ 'HuNan', '湖南'],
                [ 'JiLin', '吉林'],
                [ 'JiangSu', '江苏'],
                [ 'JiangXi', '江西'],
                [ 'LiaoNing', '辽宁'],
                [ 'NeiMengGu', '内蒙古'],
                [ 'NingXia', '宁夏'],
                [ 'QingHai', '青海'],
                [ 'ShanXi', '陕西'],
                [ 'SanXi', '山西'],
                [ 'ShanDong', '山东'],
                [ 'TaiWan', '台湾'],
                [ 'XiZang', '西藏'],
                [ 'XinJiang', '新疆'],
                [ 'YunNan', '云南'],
                [ 'ZheJiang', '浙江'],
            ],
            selectedProvince:'SiChuan',
            selectedProvinceCopy:'SiChuan',
            alertText:'数据采集中，暂时不能查看！',
            ifShowMyAlert:false,
            schools:{},
            nowUser: '',
        }
    },
    created(){
        // this.change()
        this.getSchools( 'sichuan' )
        this.nowUser = sessionStorage.getItem( 'nowUser' )
    },
    props:['ifShow'],
    methods:{
        ...mapGetters(['getHost']),
        getSchools( province ){
                this.$http.post( this.getHost() + '/getSchools', { province: province } ).then((response) => {
                    response = response.body;
                    if (response.res_code === ERO_OK) {
                        this.schools = Object.assign({}, response.message)
                        this.selectedProvinceCopy = this.selectedProvince
                        // console.log( response.message )  
                    }
                });
            },
        closeAlert(){
            this.ifShowMyAlert = false
            if ( !this.nowUser ){
                this.$router.push({ path: '/my' }); 
            }
        },
            
        showMyAlert( ifCdut = false ){
            if (  ! this.nowUser  ){
                this.alertText = '您还未登录，请先登录！'
                this.ifShowMyAlert = true
                return
            }
            else if ( ifCdut ){
                this.$router.push({ path: '/home/cdut' }); 
                return 
            }
            this.ifShowMyAlert = true
        },
    },
    components:{
        swiper,
        myAlert
    },
    watch: {
        selectedProvince:{
            handler: function( newValue, oldValue ){
                this.getSchools( newValue )
            }
        }
    }
}
</script>
<style lang="scss" scoped>

    * {
        margin: 0;
        padding: 0;
    }
    .scroll-box{
        width :100%;
        overflow :hidden;
        position :absolute;
        top : 278px;
        bottom :50px;
        background-color: #fff;
    }
    .select-content {
        margin-top: 10px;
        position: relative;
        background-color: #fff;
        display: block;

        .text {
            display: inline-block; 
            text-align: center;
            width: 42%;
        }

        select {
            display: inline-block; 
            font-size: 18px;
            width:55%;
            height: 40px;
            border: 2px solid rgba(0,0,0,0.3);
        }

        input {
            position: absolute;
            margin-left: 32%;
            width:65%;
            height: 40px;
        }
    }

    .select-content:after {
        content:"▼";    
        padding: 12px 8px;
        position: absolute; 
        margin-left: 88%;  
        z-index: 1;
        text-align: center;
        width: 10%;
        height: 100%;      
        pointer-events: none;
        box-sizing: border-box;   
    }

    .mui-grid-view.mui-grid-9{
        background-color: white;
        img{
            width: 60px;
            height: 60px;
        }
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: none;
    }
    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
        height: 30px;
    }
    .mui-table-view-cell>a:not(.mui-btn) {
        white-space: pre-wrap
    }
</style>