<template>
    <div class="star" :class="starType">
        <span v-for="(classItem,index) in classItems" :class="classItem" class="star-item" :key="index"></span>
    </div>
</template>

<script type="text/ecmascript-6">
    const LENGTH = 5
    const FULL = 'on'
    const HALF = 'half'
    const EMPTY= 'off'

    export default {
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        computed: {
            starType() {
                return 'star-' + this.size;
            },
            classItems(){
                let results = []
                let score = Math.floor(this.score * 2) / 2
                let hasDecimal = score % 1 != 0
                let integer = Math.floor(score)
                for (let i = 0; i < LENGTH; i++){
                    if(i < integer){
                        results.push(FULL)
                    }
                    else if( i == integer && hasDecimal){
                        results.push(HALF)
                    }
                    else{
                        results.push(EMPTY)
                    }
                }
                return results
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~commom/stylus/mixin.styl"

    *
        margin :0
        padding :0
        
    .star
        font-size: 0

        .star-item
            display: inline-block
            background-repeat: no-repeat

        &.star-48
            height :20px
            .star-item
                width: 20px
                height: 20px
                margin-right: 22px
                background-size: 20px 20px

                &:last-child
                    margin-right: 0
                &.on
                    bg-image('star48_on')
                &.half
                    bg-image('star48_half')
                &.off
                    bg-image('star48_off')
        
        &.star-36

            .star-item
                width: 15px
                height: 15px
                margin-right: 6px
                background-size: 15px 15px
                
                &:last-child
                    margin-right: 0
                &.on
                    bg-image('star36_on')
                &.half
                    bg-image('star36_half')
                &.off
                    bg-image('star36_off')

        &.star-24

            .star-item
                width: 10px
                height: 10px
                margin-right: 3px
                background-size: 10px 10px
                
                &:last-child
                    margin-right: 0
                &.on
                    bg-image('star24_on')
                &.half
                    bg-image('star24_half')
                &.off
                    bg-image('star24_off')
    
</style>