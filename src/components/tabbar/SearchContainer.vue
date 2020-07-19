<template>
    <div class="mate">
        
        <div class="one">
        <div class="titleList">
            <div>当前分析周期：2020/06/09</div>
            <div>指标口径说明</div>
        </div>
        <div class="oneList">
            <div :class="one.oneListIndex == 1 ?  'active' : ''" @click="changePerTitle(1)">
            <p>5G机套匹配用户</p>
            <p>334</p>
            <p>
                同：<span :class=" { 'nagetive':sameAndLoopData[0][0] < 0 } ">{{ sameAndLoopData[0][0] + '% ' }} </span>
                环：<span :class=" { 'nagetive':sameAndLoopData[0][1] < 0 } ">{{ sameAndLoopData[0][1] + '% ' }} </span>
            </p>
            <span v-if="one.oneListIndex == 1"><span class="icon"></span></span>
            </div>

            <div :class="one.oneListIndex == 2 ?  'active' : ''" @click="changePerTitle(2)">
            <p>机套未匹配5G终端用户</p>
            <p>3304</p>
            <p>
                同：<span :class=" { 'nagetive':sameAndLoopData[1][0] < 0 } ">{{ sameAndLoopData[0][0] + '% ' }} </span>
                环：<span :class=" { 'nagetive':sameAndLoopData[1][1] < 0 } ">{{ sameAndLoopData[0][1] + '% ' }} </span>
            </p>
            <span v-if="one.oneListIndex == 2"><span class="icon"></span></span>
            </div>

            <div :class="one.oneListIndex == 3 ?  'active' : ''" @click="changePerTitle(3)">
            <p>机套未匹配5G套餐用户</p>
            <p>20%</p>
            <p>
                同：<span :class=" { 'nagetive':sameAndLoopData[2][0] < 0 } ">{{ sameAndLoopData[0][0] + '% ' }} </span>
                环：<span :class=" { 'nagetive':sameAndLoopData[2][1] < 0 } ">{{ sameAndLoopData[0][1] + '% ' }} </span>
            </p>
            <span v-if="one.oneListIndex == 3"><span class="icon"></span></span>
            </div>
        </div>
        </div>
        <div class="two">
            <div class="perTitle border-top-1px">
                <span></span>{{ titleOne }}
            </div>

           
            <relationPic v-if="one.oneListIndex == 2"></relationPic>
        </div>

        <div class="three">
            <div class="perTitle"><span></span>{{ titleTwe }}</div>
            <echartsMap v-if="one.oneListIndex == 1"></echartsMap>
        </div>

        <div class="three">
            <div class="perTitle"><span></span>{{ titleTwe }}</div>
            <echartsMap v-if="one.oneListIndex == 1"></echartsMap>
        </div>

    </div>
</template>

<script>
import alertTip from '../alert/alertTip.vue'
import echartsMap from '../search/map.vue'
import relationPic from '../search/relationPic.vue'
export default {
    data() {
        return {
            one:{
                oneListIndex:1
            },
            titleList:[ 
                [ '5G机套匹配用户ARPU分析','5G机套匹配用户DOU分析' ],
                [ '机套未匹配5G终端用户ARPU分析', '机套未匹配5G终端用户DOU分析' ],
                [ '机套未匹配5G套餐用户ARPU分析', '机套未匹配5G套餐用户DOU分析' ] 
            ],
            sameAndLoopData:[
                [5,-3],
                [4,-3],
                [4,-3],
            ],
            titleOne:'5G机套匹配用户ARPU分析',
            titleTwe:'5G机套匹配用户DOU分析'
        }
    },
    components :{
        'alertTip' : alertTip,
        'echartsMap':echartsMap,
        'relationPic': relationPic
    },
    methods:{
        changePerTitle( index ){
            this.one.oneListIndex = index
            this.titleOne = this.titleList[index - 1][0]
            this.titleTwe = this.titleList[index - 1][1]
        },
    }
}
</script>
<style lang="less" scoped>
    .icon {
        width: 0;
        height: 0;
        position: absolute;
        transform: translateX(-50%);
        border: solid 10px transparent;
        border-bottom: #00b9f9 solid 10px ;
    }
    .mate{
        position: relative;
        background:#F3F5F7;
        .perTitle{
        padding:10px 0 11px 23px;
        font-size: 0.35rem;
        font-weight: 700;
        background: #F7F9FA;
        font-family: PingFangSC-Medium;
        color: #5B626A;

        >span{
            width: 4px;
            height: 14px;
            background: #26a9ff;
            display: inline-block;
            position: absolute;
            left: 12px;
            top: 14px;
            }
        
        }
        .border-top-1px{
        border-top:1px solid #9CDBFF;
        }
        .echartsCnt{
        width:100%;
        height:250px;
        background:#fff;
        }
        .one{
        padding:0 10px;
        .van-icon-question-o{
            font-size: 14px;
            position: relative;
            top: 2px;
            right: 2px;
        }
        .titleList{
            display: flex;
            height:42px;
            align-items: center;
            
            >div:nth-child(1){
            width:65%;
            color:#828B96;
            font-size: 13px;
            }
            >div:nth-child(2){
            width:35%;
            text-align: right;
            padding-right: 5px;
            box-sizing: border-box;
            font-size: 13px;
            >span{
                background: #ff5454;
                display: inline-block;
                text-align: center;
                padding: 0 4px;
                border-radius: 9px;
                color: #fff;
                margin-left: 5px;
                font-size: 13px;
            }
            }
        }
        .oneList{
            display: flex;
            flex-flow: wrap;
            margin-top: 5px;
            margin-bottom:5px;
            >div{
            text-align: center;
            width:31.83%;
            height:80px;
            padding:5px 0;
            box-sizing: border-box;
            border-top: 4px solid  #20B9FA;
            color:#00b9f9;
            line-height: 18px;
            border-radius: 4px;
            background:#fff;
            margin-bottom:10px;
            
            >p:first-child{
                font-size: 0.32rem;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                padding:0 5px;
                color:#5C636B;
            }
            >p:nth-child(2){
                font-size: 0.48rem;
                margin:5px 0;
                color:#20BFFA;
            }
            >p:nth-child(3){
                font-size: 0.30rem;
                color:#828B96 ;

                .nagetive {
                color: #ff0000;
                }
            }
            
            .van-icon{
                margin-top:15px;
                font-size: 25px;
                transform: rotate(-90deg);
                color:#00b9f9;
            }
            }
            >div:nth-child(2){
            margin:0 1.5%;
            }
            >div.active{
            background:#20B9FA;
            >p{
                color:#FFFFFF;
            }
            }
        }

        }
        .two{
        margin-top:20px;
        position:relative;
        }
        .three{
        position:relative;
        }
        .avarege{
            top:34%;
            width:19%;
            height: 20%;
            position:absolute;
            background-color: #E3F8FF;
            border-top-right-radius:70px;
            border-bottom-right-radius:70px;
            padding:10px 0 0 16px;

            .value{
            color: #28A0FF;
            font-size: 0.35rem;

            .num{
                font-size: 0.64rem;
                font-weight:700;
            }
            }

            .text{
            font-size: 0.35rem;
            color: #7A8188;
            }
            
        }
    }

</style>