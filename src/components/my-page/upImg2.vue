<template>
    <div>
            <label class="control-label" style="float: left;">图片地址:</label>
            <input type="file" id="qiniuPic" style="display: none;" name="qiniuPic" accept="image/*" ref="qiniuPic" @change=" change ">
            <div class="file_scan" style="width: 100px;float: left; margin-top: 20px;" @click="photo_add">
                添加浏览
            </div>
            <div style="clear: left;">
                <img style="width: 270px;height: 135px;border-radius: 5px" id="img" :src=" src " alt="" ref="imgPre">
            </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            src:''
        }
    },
    methods: {
        photo_add() {
            var input_file= this.$refs.qiniuPic;
            input_file.click();
        },
        change(){
            this.src = URL.createObjectURL(this.$refs.qiniuPic.files[0])
            console.log( this.src )
        }

    }
}
</script>
<style lang="scss" scoped>
    .file_scan
    {
        text-align: center;
        width: 80px;
        height: 30px;
        background: #EBD9DB;
        outline: none;
        text-decoration: none;
        line-height: 30px;
        cursor: pointer;
    }
</style>