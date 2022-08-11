<template>
	<view>
		<view v-show="!isLoading">
			<video id="myVideo" :src="videoUrl"
			  controls></video>
		</view>
	</view>
</template>

<script>
	import { MVdetail } from "@/common/js/api.js"
	export default {
		data() {
			return {
				videoUrl:'',
				isLoading:true
			}
		},
		onLoad(options) {
			console.log(options.videoId)
			this.getVideo(options.videoId)
		},
		methods: {
			getVideo(videoId){
				this.$store.commit('NEXT_ID',videoId)
				
				uni.showLoading({
				    title: '加载中'
				});
				this.isLoading = true
				
				MVdetail(videoId).then((res)=>{
					console.log(res[1].data);
					if (res[1].data.code === 200) {
						this.videoUrl = res[1].data.data.url
					}
					
					this.isLoading = false
					uni.hideLoading();
				})
				
			},
			
			// videoErrorCallback: function(e) {
			// 	uni.showModal({
			// 		content: e.target.errMsg,
			// 		showCancel: false
			// 	})
			// },
		}
	}
</script>

<style>

</style>
