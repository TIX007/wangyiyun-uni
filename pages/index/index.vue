<template>
	<view class="index">
		<musichead title="网易云音乐" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true" >
				<view class="index-search" @tap="handleToSearch">
					<text class="iconfont icon-sousuo"></text>
					<input type="text" placeholder="搜索歌曲" />
				</view>
				<!-- <view class="index-list">
					<view class="index-list-item">
						<view class="index-list-img">
							<image src="../../static/logo.png" mode=""></image>
							<text>每天更新</text>
						</view>
						<view class="index-list-text">
							<view>1.盗将行</view>
							<view>1.盗将行</view>
							<view>1.盗将行</view>
						</view>
					</view>
				</view> -->
				<view class="demo-skeleton" v-if="isLoading">
					<skeleton
					  :loading="isLoading"
					  :avatarSize="skeleton1.avatarSize"
					  :row="skeleton1.row"
					  :showTitle="true"
					  avatarShape="square"
					  v-for="(item,key) in 4"
					  :key="key"
					  flexType="space-between"
					  
					>
					</skeleton>
				</view>
				<view class="index-list" v-for="(item,index) in topList" :key="index" @tap="handleToList(item.id)" >
					<view class="index-list-item">
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{item.updateFrequency}}</text>
						</view>
						<view class="index-list-text" >
							<view v-for="(item,index) in item.tracks" :key="index" @tap="handleToList">{{index + 1 }}. {{item.first | ellipsis}} -- {{item.second | ellipsis}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '@/common/css/iconfont.css'
	import musichead from '../../components/musichead/musichead.vue'
	import { topList } from '../../common/js/api.js'
	import Skeleton from '@/components/J-skeleton/J-skeleton.vue'
	export default {
		data() {
			return {
				topList:[],
				isLoading : true,
				skeleton1 : {
				avatarSize:'120px',
				row: 2,
				showTitle: true,
				
			  }
			}
		},
		components:{
			musichead,
			Skeleton
		},
		onLoad() {
			topList().then((res)=>{
				if(res.length){
					setTimeout(() => {
						this.topList = res
						this.isLoading = false
					}, 1000)
				}
				console.log(res)
			})
			/* var that = this
			uni.request({
				url:'http://localhost:3000/toplist/detail',
				success:(res)=>{
					console.log(res)
					that.topList = res.data.list
				}
			}) */
		},
		filters:{
			ellipsis (value) {
			      if (!value) return ''
			      if (value.length > 6) {
			        return value.slice(0,6) + '...'
			      }
			      return value
			    }
		},
		methods: {
			handleToList(id){
				uni.navigateTo({
					url: '/pages/list/list?id=' + id
				});
			},
			handleToSearch(){
				uni.navigateTo({
					url: '/pages/search/search'
				});
			}
		}
	}
</script>

<style scoped>
	.index{}
	.index-search{ display: flex; align-items: center; height:70rpx; margin:70rpx 30rpx 30rpx 30rpx; background:#f7f7f7; border-radius: 50rpx;}
	.index-search text{ font-size:26rpx; margin-right:26rpx; margin-left:28rpx;}
	.index-search input{ font-size:28rpx; flex:1;}
	
	.index-list{ margin:0 30rpx;}
	.index-list-item{ display: flex; margin-bottom: 34rpx;}
	.index-list-img{ width:212rpx; height:212rpx; position: relative; border-radius: 30rpx; overflow: hidden; margin-right: 22rpx;}
	.index-list-img image{ width:100%; height:100%;}
	.index-list-img text{ position: absolute; left:12rpx; bottom: 16rpx; color:white; font-size:20rpx;}
	.index-list-text{ font-size:24rpx; line-height: 66rpx;}
	
</style>
