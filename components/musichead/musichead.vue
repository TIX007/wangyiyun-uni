<template>
	<view class="music-head">
		<view v-if="icon" class="music-head-icon" :class="{'music-head-iconblack' : iconblack}">
			<text class="iconfont icon-arrow-left-bold" @tap="handleToBack"></text> | <text class="iconfont icon-home" @tap="handleToHome"></text>
		</view>
		{{title}}
	</view>
</template>

<script>
	export default {
		name:"musichead",
		data() {
			return {
				
			};
		},
		props:['title','icon','iconblack'],
		methods:{
			handleToBack(){
				uni.navigateBack()
			},
			handleToHome(){
				url:'/pages/index/index'
			}
		}
	}
</script>

<style scoped>
	.music-head{ width:100%; height:75px; font-size:16px; line-height: 80px; text-align: center; color: black; position: relative; overflow: hidden;}
	.music-head-icon{ position: absolute; left:8px; top:26px; width:90px; height:31px; background:rgba(0,0,0,0.4); color:white; line-height: 31px; border-radius: 15px; display: flex; justify-content: space-evenly;}
	.music-head-iconblack{ color:black; border:1px #eaeaea solid; background:white;}
</style>
