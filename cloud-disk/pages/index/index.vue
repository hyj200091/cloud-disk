<template>
	<view>
		<!-- 自定义导航栏 -->
		<nav-bar>
			<text slot="left" class="font-md ml-3">首页</text>
			<template slot="right">
				<view style="width: 60rpx; height: 60rpx;"
				class="flex align-center justify-center bg-light rounded-circle mr-3"
				>
					<text class="iconfont icon-zengjia"></text>
				</view>
				<view style="width: 60rpx; height: 60rpx;"
				 class="flex align-center justify-center bg-light rounded-circle mr-3"
				 >
				<text class="iconfont icon-gengduo"></text>
				</view>
			</template>
		</nav-bar>
		<!-- 搜索框 -->
		<view class="py-3 py-2">
			<view class="position-relative">
				<view 
				class="flex align-center justify-center text-light-muted"
				style="height: 70rpx;width: 70rpx;position: absolute;top: 0;left: 0;">
					<text class="iconfont icon-sousuo"></text>
				</view>
				
				<input
				style="height: 70rpx; padding-left: 70rpx;"
				type="text"
				class="bg-light font-md rounded-circle"
				placeholder="搜索网盘文件"
				 />
			</view>
		</view>
		<block v-for="(item,index) in list" :key="index">
	    <f-list :item="item" :index="index"></f-list>
		 </block>
	</view>
</template>

<script>
import navBar from '@/components/common/nav-bar.vue'
import fList  from '@/components/common/f-list.vue'
	export default {
		components:{
			navBar,fList
		},
		data() {
			return {
				list: [
				        {
				          type: 'dir',
				          name: '我的笔记',
				          create_time: '2020-10-21 08:00',
				          checked: false
				        },
				        {
				          type: 'image',
				          name: '风景.jpg',
				          create_time: '2020-10-21 08:00',
				          checked: false
				        },
				        {
				          type: 'video',
				          name: 'uniapp实战教程.mp4',
				          create_time: '2020-10-21 08:00',
				          checked: false
				        },
				        {
				          type: 'text',
				          name: '记事本.txt',
				          create_time: '2020-10-21 08:00',
				          checked: false
				        },
				        {
				          type: 'none',
				          name: '压缩包.rar',
				          create_time: '2020-10-21 08:00',
				          checked: false
				        }
				      ]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
