<template>
	<view>
		<view class="uni-flex uni-row">
			<view class="video-item" @click="goDetail(item.id)" v-for=" (item,index) in videos " :key="index">
				<img style="width: 120px;height: 68px;" :src="item.cover" alt="">
				<view class="video-name">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { MVall } from '../../common/js/api.js'
	export default {
		data() {
			return {
				videos:[]
			}
		},
		methods: {
			goDetail(videoId){
				console.log(videoId);
				uni.navigateTo({
					url:'/pages/videoDetails/videoDetails?videoId=' + videoId
				})
			}
		},
		onLoad() {
			MVall().then((res)=>{
				console.log(res[1].data.data);
				this.videos = res[1].data.data
			})
		}
	}
</script>

<style scoped>
	.uni-flex{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.video-item{
		width: 120px;
		margin: 5px;
	}
	.video-name{
		font-size: 14px;
	}
</style>
