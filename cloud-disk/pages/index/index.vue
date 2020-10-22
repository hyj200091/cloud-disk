<template>
	<view>
		<!-- 自定义导航栏 -->
	<nav-bar>
		<template v-if="checkCount === 0">
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
		</template>
			
			<template v-else>
				<view slot="left" class="font-md ml-3 text-primary" @click="handleCheck(false)">取消</view>
				<text class="font-md font-weight-bold">已选中{{checkCount}}</text>
				<view slot="right" class="font-md mr-3 text-primary" @click="handleCheck(true)">全选</view>
			</template>
		</nav-bar>
		<!-- 搜索框 -->
		<view class="py-3 py-2">
			<view class="position-relative">
				<view 
				class="flex align-center justify-center text-light-muted"
				style="height: 70rpx;width: 70rpx;position: absolute;top: 0;left: 0;">
					<text class="iconfont icon-search"></text>
				</view>
				
				<input
				style="height: 70rpx; padding-left: 70rpx;"
				type="text"
				class="bg-light font-md rounded-circle"
				placeholder="搜索网盘文件"
				 />
			</view>
		</view>
	    <f-list v-for="(item,index) in list" :key="index" :item="item" :index="index" @select="select"></f-list>
		 <!-- 底部操作条 -->
		 <!-- 选中的个数大于0才会出现这个操作条 -->
<view v-if="checkCount > 0">
		 <!-- 这里要留一定的高度，因为底部导航操作条需要被固定在底部，并空出底部tabbar高度的地方 -->
		 <view style="height: 115rpx;"></view>
		 <!-- 操作条的样式 高度 颜色 固定在底部，垂直方向拉升的效果 -->
		 <view style="height: 115rpx;" class="flex align-stretch bg-primary text-white fixed-bottom">
			 <!-- 根据元素个数等分容器，所以要么四个等分，要么两个等分，行高的修改可以让图标和文字之间的距离变得合理，点击还会变色:hover-class -->
			 <view class="flex-1 flex flex-column align-center justify-center"
			 style="line-height: 1.5;"
			 v-for="(item,index) in actions"
			 :key="index"
			 hover-class="bg-hover-primary"
			 @click="handleBottomEvent(item)"
			 >
			 <text class="iconfont" :class="item.icon">{{item.name}}</text>
			 </view>
		 </view>
		 </view>
		 
		 <!-- 是否删除 -->
		 <f-dialog ref="dialog">是否删除选中的文件</f-dialog>
	</view>
</template>

<script>
import navBar from '@/components/common/nav-bar.vue'
import fList  from '@/components/common/f-list.vue'
import fDialog from '@/components/common/f-dialog.vue'
	export default {
		components:{
			navBar,fList,fDialog
		},
		data() {
			return {
				item:[],
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
			// uni.request({
			// 	url: 'http://localhost:7001/list',
			// 	method: 'GET',
			// 	success: res => {
			// 		console.log(res.data);
			// 	}
			// })
		},
		methods: {
			select(e){
				// console.log(e);
				// 接收到子组件传递过来的索引中的选中状态，将对应的list中的数据更新
				this.list[e.index].checked = e.value;
			},
			//取消 全选操作
			handleCheck(checked){
				this.list.forEach(item=> {
					item.checked = checked;
				})
			},
			// 处理底部操作条事件，这里仅对 删除 做了处理
			handleBottomEvent(item) { 
				console.log(item);
				switch (item.name) {
					case '删除':
					this.$refs.dialog.open(close => {
						close();
						// 在这儿可以写点删除需要做的回调事件，这里先在控制台模拟事件需要把checklist移除掉
						console.log('删除文件');
					    console.log(this.checkList);
					});
					break;
				default:
				    break;
				}
			},
		},
		onShow(){
		},
		computed:{
			
			//选中列表
			checkList(){
			return	this.list.filter(item => item.checked);
			},
			// 选中的数量
			checkCount() {
				return this.checkList.length;
			},
			//操作菜单
			actions(){
				if(this.checkCount > 1){
					return[{
						icon:"icon-xiazai",
						name:"下载"
					},
					{
						icon:"icon-shanchu",
						name:"删除"
					}]
				}
				return [{
					icon:"icon-xiazai",
					name:"下载"
				},
				{
					icon:"icon-shanchu",
					name:"删除"
				},
				{
					icon:"icon-fenxiang-1",
					name:"分享"
				},
				{
					icon:"icon-chongmingming",
					name:"重命名"
				}]
			}
		}
	}
</script>

<style>
/* 	.content {
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
	} */
</style>
