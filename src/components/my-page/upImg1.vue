<template>
	<div class="power">
		<ul class="clearfix">
			<li class="one"  v-for='(item ,index ) in imgs' :key="index">
				<img :src="item">
			</li>
			<li style="position:relative" v-if="imgs.length>=1 ? false : true">
				<img :src=" getHost() + '/public/images/person/' + nowUser + '.jpg'"><input  @change='add_img' type="file">
			</li>
		</ul>
	</div>
</template>

<script>
    import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				imgs: [],
				//判断图片的类型
				imgData: {
					accept: 'image/jpeg, image/png, image/jpg',
				},
				nowUser:''
			}
		},
		created(){
			this.nowUser = sessionStorage.getItem( 'nowUser' )
		},
		methods: {
            ...mapGetters( [ 'getHost' ] ),
			add_img(event) {
				let reader = new FileReader();
				let img1 = event.target.files[0];
				console.log( img1 )
				let type = img1.type; //文件的类型，判断是否是图片
				let size = img1.size; //文件的大小，判断图片的大小
				if (this.imgData.accept.indexOf(type) == -1) {
					alert('请选择我们支持的图片格式！');
					return false;
				}
				//图片的大小
				if (size > 3145728) {
					alert('请选择3M以内的图片！');
					return false;
				}
				var uri = ''
				let form = new FormData();
				form.append('file', img1, this.nowUser + '.jpg');
				//接口部分
                this.$http.post( this.getHost() +  "/upImg", form, 
                {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(response => {
					uri = this.getHost()+ response.data.avatorImgPath
					reader.readAsDataURL(img1);
					var that = this;
					reader.onloadend = function() {
						that.imgs.push(uri);
					}
				}).catch(function(err) {
					console.log(err);
				});
			}
		}
	}
</script>

<style scoped>
.one{
	width: 3rem;
	height:3rem;
}
.one img{
	width: 3rem;
	height:3rem;
}
</style>

