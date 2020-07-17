<template>
    <div class="selectRatingType-wrapper">
        <div class="types">
            <span class="type pasitive" :class="{'active':nowType === 2}" @click="selectedType(2)">{{ desc.all }}-{{ ratings.length }}</span>
            <span class="type pasitive" :class="{'active':nowType === 1}" @click="selectedType(1)">{{ desc.month }}-{{ months.length }}</span>
            <span class="type pasitive" :class="{'active':nowType === 0}" @click="selectedType(0)">{{ desc.week }}-{{ weeks.length }}</span>
        </div>
        <div class="switch">
            <span class="icon-check_circle" :class="{'on':switchOn}" @click="switchContent"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script>
    const WEEK = 0
    const MONTH = 1
    const ALL = 2
    export default {
        props: {
            ratings: {
                type: Array,
                default() {
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        month: '7天内',
                        week: '3天内'
                    };
                }
            }
        },
        data(){
            return {
                nowType : this.selectType,
                switchOn : this.onlyContent
            }
        },
        computed: {
            months() {
                return this.ratings.filter((rating) => {
                    let dif_value = new Date( Date.now() ).getTime() - new Date( rating.add_time ).getTime() ;
                    return dif_value < 1000*60*60*24*7;
                });
            },
            weeks() {
                return this.ratings.filter((rating) => {
                    let dif_value = new Date( Date.now() ).getTime() - new Date( rating.add_time ).getTime() ;
                    return dif_value < 1000*60*60*24*3;
                });
            }
        },
        methods:{
            selectedType(type){
                this.nowType = type
                this.$emit('changeSelectType',type)
            },
            switchContent(){
                this.switchOn = !this.switchOn
                this.$emit('changeOnlyContent',this.switchOn)
            }
        },
    }
</script>
<style lang="stylus" scoped>
    .selectRatingType-wrapper
        width :100%
        height :118px
        background-color #fff

        .types
            margin :0 18px
            padding :18px 0
        
            .type
                display :inline-block
                width :64px
                height :32px
                line-height :32px
                text-align :center
                vertical-align :middle
                font-size :12px
                background-color :blue
                margin-right :8px
                color :#4D555D
                &.pasitive
                    background-color :rgba(0,160,220,0.2)
                    &.active
                        color :#fff
                        background: rgb(0, 160, 220)
                &.negative
                    background-color :rgba(77,85,93,0.2)
                    &.active
                        color :#fff
                        background: rgb(77, 85, 93)

        .switch
            padding :12px 18px
            line-height: 24px
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            color: rgb(147, 153, 159)
            font-size :24px

            .on
                color: #00c850
            .text
                display: inline-block
                vertical-align: top
                font-size: 12px

</style>