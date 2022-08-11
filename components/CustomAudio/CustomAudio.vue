<template>
	<view class="customAudio flex">
		<view class="left">
			<image :src="music.img" mode=""></image>
		</view>
		<view class="right">
			<view class="progressBox flex">
				<text class="startTime">{{ getMinuteTime(now_time) }}</text>
				<view class="progress">
					<slider
						class="slider"
						:value="(now_time / trueTime) * 100"
						:disabled="sliderDisabled"
						@change="sliderChange"
					/>
				</view>
				<text class="endTime">{{ total_time }}</text>
			</view>
			<view class="bottom flex">
				<view class="control flex">
					<view class="prev side flex" @click="playNext('prev')">
						<image
							src="https://dayuding.wisesoft.org.cn/images/yijiyou/scenic-spot/prev.png"
							mode="widthFix"
						></image>
					</view>
					<view class="start_stop flex">
						<view class="flex" @click="playAudio">
							<text v-if="playType" class="iconfont icon-24gf-pause2"></text>
							<text v-else class="iconfont icon-bofang1"></text>
						</view>
					</view>
					<view class="next side flex" @click="playNext('next')">
						<image
							src="https://dayuding.wisesoft.org.cn/images/yijiyou/scenic-spot/next.png"
							mode="widthFix"
						></image>
					</view>
				</view>
				<view class="list">
					<text class="iconfont icon-24gf-playlistMusic3"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// import eventBus from '@/utils/eventBus.js'

export default {
	name: 'CustomAudio',
	props: {
		music: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			// 音频实例
			AUDIO: '',
			// 当前是否播放
			playType: false,
			now_time: 0,
			// 总时长
			total_time: '',
			timeupdata: '',
			interval: '',
			audioUrl: '',
			// 滑动器禁用
			sliderDisabled: false,
			// 暂停，开始
			startBtn: true,
			trueTime: ''
		}
	},

	mounted() {
		this.initPlay()
	},
	created() {},
	methods: {
		// 初始化播放器
		initPlay() {
			this.AUDIO = uni.createInnerAudioContext()
			this.AUDIO.src = this.music.src
			this.AUDIO.onCanplay(() => {
				this.total_time = this.getMinuteTime(this.AUDIO.duration)
				this.trueTime = this.AUDIO.duration
			})
			this.AUDIO.autoplay = false
		},
		// 暂停、开始
		playAudio() {
			if (this.playType) {
				if (this.trueTime > 0) {
					console.log('暂停')
					clearInterval(this.timeupdata)
					this.AUDIO.pause()
					this.playType = !this.playType
				}
			} else {
				console.log('播放')
				this.timeupdata = setInterval(() => {
					this.now_time += 1
					// console.log('当前时间', this.getMinuteTime(this.now_time))
					if (this.now_time >= this.trueTime) {
						this.AUDIO.stop()
						this.playType = false
						this.now_time = 0
						clearInterval(this.timeupdata)
					}
				}, 1000)
				this.AUDIO.play()
				this.playType = !this.playType
			}
		},
		// 上一曲、下一曲
		playNext(type) {
			this.destroyed()
			const data = this.music
			if (type === 'prev') {
				console.log('上一曲')
			} else {
				console.log('下一曲')
				data.type = 'next'
				// eventBus.$emit('cutMusic', data)
			}
		},

		// 进度条拖动
		sliderChange(e) {
			const second = (e.detail.value / 100) * this.trueTime
			this.now_time = second
			this.AUDIO.seek(second)
		},

		// 销毁当前实例
		destroyed() {
			this.playType = false
			this.AUDIO.stop()
			this.clear()
		},

		clear() {
			this.total_time = ''
			this.trueTime = ''
			this.now_time = 0
			clearInterval(this.timeupdata)
		},

		// 秒转换分秒
		getMinuteTime(data) {
			const newData = data
			let minute = parseInt(newData / 60, 10)
			let second = parseInt(newData % 60, 10)
			if (minute.toString().length === 1) minute = `0${minute}`
			if (second.toString().length === 1) second = `0${second}`
			return `${minute}:${second}`
		}
	}
}
</script>

<style lang="scss" scoped>
.customAudio {
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: space-between;

	.left {
		image {
			width: 110rpx;
			height: 110rpx;
			background-color: #4cd964;
			border-radius: 8rpx;
		}
	}

	.right {
		width: 80%;
		height: 100%;

		// background-color: #4cd964;
		.progressBox {
			font-size: 24rpx;
			color: #033333;
			align-items: center;
			justify-content: space-between;

			.progress {
				width: 100%;

				.slider {
					margin: 5rpx 30rpx 5rpx 30rpx;
				}
			}
		}

		.bottom {
			align-items: center;
			justify-content: space-between;
			margin-top: 10rpx;

			.control {
				align-items: center;
				// background-color: #808080;
				width: 60%;
				justify-content: space-around;
				margin-left: 20%;

				.side {
					width: 50rpx;
					// height: 25rpx;
					align-items: center;

					// background-color: #007aff;
					image {
						width: 100%;
						height: 100%;
					}
				}

				.start_stop {
					color: #ffffff;
					width: 67rpx;
					height: 67rpx;
					background: rgba(255, 255, 255, 0.65);
					box-shadow: 0rpx 1rpx 12rpx 1rpx rgba(204, 204, 204, 0.5);
					align-items: center;
					justify-content: center;
					border-radius: 50%;

					.flex {
						width: 48rpx;
						height: 48rpx;
						align-items: center;
						justify-content: center;
						border-radius: 50%;
						background: #febf00;

						.iconfont {
							font-size: 26rpx;
						}
					}
				}
			}

			.list {
				font-weight: bolder;
				color: #000;
			}
		}
	}
}

::v-deep .progress .uni-slider-handle {
	width: 16rpx;
	height: 16rpx;
	border: 2px solid #febf00;
	margin-top: -13rpx !important;
	margin-left: -11rpx !important;
	background-color: #fff;
}

::v-deep .progress .uni-slider-thumb {
	width: 16rpx !important;
	height: 16rpx !important;
	background: #4cd964;
	display: none;
}

::v-deep .progress .uni-slider-track {
	background-color: #febf00 !important;
}
</style>


