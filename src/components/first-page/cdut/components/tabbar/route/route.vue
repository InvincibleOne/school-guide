<template>
    <scroll class="scroll-box">
        <div>
            <div id="slider" class="mui-slider ">
                    <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                        <div class="mui-scroll">
                            <a  v-for="( value, key ) in subtitle"  @click="getRoute( key )" :class="['mui-control-item', key == 'study' ? 'mui-active':  ' ' ]"  :key=" key">
                                {{ value }}
                            </a>
                        </div>
                    </div>
            </div>
            <div class="text-info">
                <h2 class="title">目标：{{ nowTarget? nowTarget : '请点击上方选择' }}</h2>
                <span class="route"><span class="stress">推荐线路：</span>{{ routeInfo.route }}</span>
            </div>
            <div class="map-box">
                <div class="scale">
                    <mt-button type="primary" size="small" @click="smaller">缩小</mt-button>
                    <mt-button type="primary" size="small" @click="larger">放大</mt-button>
                </div>
            </div>
            <div class="amap-page-container">
                <el-amap vid="amapDemo"  :center="center" :zoom="zoom" class="amap-demo">
                    <el-amap-marker v-for="(marker,index) in markers" :position="marker.position"  :key="index">
                    </el-amap-marker>
                    <el-amap-marker  v-for="(marker,index) in markers" :position="marker.position"  :key="index+10">
                        <div class="text" v-show=" zoom>14 ">
                            {{ path[index] }} 
                        </div>
                    </el-amap-marker>
                    <el-amap-polyline :editable="polyline.editable"  :path=" routeInfo.loc " :events="polyline.events"></el-amap-polyline>
                </el-amap>
            </div>
        </div>
    </scroll>
</template>

<script> 
    // NPM 方式
    // import { AMapManager } from 'vue-amap';
    // CDN 方式
    import VueAMap from 'vue-amap'
    import mui from '../../../../../../lib/mui/js/mui.js'
    import { mapGetters } from 'vuex'
    import scroll from '../../../../../scroll/scroll.vue'
    const ERR_OK = 0
    let amapManager = new VueAMap.AMapManager();
    module.exports = {
        props:[ 'cdut' ],
        data: function() {
            return {
                zoom: 15,
                center: [104.146844,30.675102],
                polyline: {
                path: [],
                lineJoin: 'round',
                strokeColor: '#FF0000',
                events: {
                    },
                    editable: false
                },
                markers: [],
                subtitle:{},
                routeInfo:{},
                loc:[],
                nowTarget: '学习',
            };
        },
        created(){
            this.getTargets()
        },
        mounted(){
            mui(".mui-scroll-wrapper").scroll({
                deceleration:0.0006
            })
            this.getRoute( 'study' )
        },
        component: {
            scroll,
        },
        methods: {
            ...mapGetters( [ 'getHost' ] ),
            mark(){
                let markers = [];
                for ( let value of  this.loc ){
                    markers.push({
                        position: value,
                    })
                }
                this.markers = markers;
            },
            
            getRoute( target ){
                this.$http.post( this.getHost() + '/getRoute', { school: 'cdut', target: target } ).then(
                    ( res ) => {
                        if ( res.body.res_code == ERR_OK ){
                            this.routeInfo = Object.assign( {}, res.body.data )
                            this.divRoute( res.body.data.route )
                            this.loc = Object.assign( [], res.body.data.loc )
                            this.nowTarget = this.subtitle[target]
                            this.mark()
                        }
                    }
                )
            },
            getTargets(  ){
                this.$http.get( this.getHost() + '/sichuan/cdut/targets' ).then(
                    ( res ) => {
                        if ( res.body.res_code == ERR_OK ){
                            this.subtitle = Object.assign( {}, res.body.data )
                        }
                    }
                )
            },
            divRoute( route ){
                let tem = route.split( '-->' )
                this.path = tem
            },
            larger(){
                this.zoom += 1
            },
            smaller(){
                this.zoom -= 1
            }
        },
        watch: {
            // loc : {
            //     handler : function( nowV, oldV ){
            //         this.add()
            //     },
            //     deep:true,
            // }
        }
    };
</script>
<style lang="scss" scoped>
    *{
        touch-action: none;
        margin: 0;
        padding: 0;
    }

    .scroll-box{
        width :100%;
        overflow :hidden;
        position :absolute;
        top : 270px;
        bottom :0px;
        background-color: #fff;
    }
    .map-box{
        position: absolute;
        bottom: 15px;
        right: 10px;
        z-index: 501;
        .scale {
            
        }
    }


    
    .amap-demo {
        width: 100%;
        padding:0px 5px;
        height: 300px;

        .text{
            font-size:13px;
            color: red;
            font-weight: 700
        }
    }
    .text-info {
        width:calc( 100% - 10px );
        margin: 0 5px 5px 5px;
        padding:6px 20px 10px 20px;
        background-color: #26A2FF;
        color: #fff;

        .title {
            font-size: 16px;
            margin: 8px 0
        }
        .route{
            display: inline-block;
            height: 16px;
            line-height: 16px;
            font-size: 13px;

            .stress{
                font-size: 15px;
                font-weight: 700;
            }
        }
    }
</style>