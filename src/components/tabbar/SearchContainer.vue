<template>
    <div class="test">
        
    </div>
</template>
<script>
import alertTip from '../alert/alertTip.vue'
export default {
    data() {
        return {
            alertText:'textafdfauedjhdhhalioejihzdafasfe'
        }
    },
    components :{
        'alertTip' : alertTip
    }
}
</script>
<style lang="scss" scoped>
    .test {
        width: 100%;
        height: 100%;
        iframe{
            width: 100%;
            height: 100%;
            
        }
    }
</style>