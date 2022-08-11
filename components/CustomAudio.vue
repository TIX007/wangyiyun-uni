<template>
	<view class="radius shadow fotter-container"  v-if="musicData.songId">
		<view class="fixed-container" @click.stop="toSongDetail">
			<view class="cu-avatar playImage round" :style="'background-image:url(' + musicData.imgUrl + ')'"></view>
			<view class="play-center">
				<view class="music-name">{{ musicData.musicName }}</view>
				<view class="music-author">{{ musicData.songName }}</view>
			</view>
			<view class="play-right">
				<view class="play-list relative" @click.stop="changePlaying">
					<text :class="['iconfont', musicData.paused ? 'icon-playStop' : 'icon-bofang']" style="font-size: 28px"></text>
				</view>
				<text class="iconfont icon-liebiao play-list" @click.stop="modelShow = true"></text>
			</view>
		</view>
		<!-- <play-list v-model="modelShow"></play-list> -->
	</view>
</template>

<script>
// import playList from './playList.vue';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			modelShow: false
		};
	},
	components: {
		// playList
	},
	computed: mapState({
		musicData: state => state.musicData,
	}),
	methods: {
		//修改播放状态
		changePlaying() {
			// #ifdef MP-WEIXIN
			this.bgAudioManager = uni.getBackgroundAudioManager();
			this.bgAudioManager.title = this.songDetail.name
			// #endif
			
			// #ifdef H5
			// 由于H5不支持autoplay(自动播放)所以初始为播放按钮并且不旋转
			if(!this.bgAudioManager){
				this.bgAudioManager = uni.createInnerAudioContext()
			}
			// #endif
			console.log(this.bgAudioManager.paused);
			if( this.bgAudioManager.paused ){
				this.bgAudioManager.play()
			}else{
				this.bgAudioManager.pause()
			}
			// let list = this.$audio.audiolist;
			// let index = list.findIndex(item => item.id == this.musicData.id);
			// this.$audio.operate(index);
			// this.$store.commit('SET_PASUED', !this.paused);
		},

		toSongDetail() {
			if (this.modelShow) return;
			console.log('1221');
			uni.navigateTo({
				url:'/pages/detail/detail?songId=' + this.musicData.songId
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.fotter-container {
	height: 110rpx;
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 9999;

	.fixed-container {
		position: fixed;
		z-index: 20;
		width: 100%;
		height: 110rpx;
		bottom: 0;
		box-shadow: 0 1px 2px rgb(0, 21, 0.1);
		display: flex;
		background: #fff;
	}

	.playImage {
		width: 80rpx;
		height: 80rpx;
		margin: auto 15px auto 10px;
	}

	.play-center {
		flex: auto;
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		max-width: calc(100% - 300rpx);

		.music-name {
			color: #000;
			font-size: 32rpx;
			margin-bottom: 4px;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.music-author {
			font-size: 24rpx;
			color: rgba(0, 0, 0, 0.5);
			width: 100%;
		}
	}

	.play-right {
		width: 92px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.play-list {
			font-size: 30px;
			margin-right: 12px;
		}
	}
}
</style>
