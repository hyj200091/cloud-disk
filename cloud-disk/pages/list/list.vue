<template>
	<view style="height: 100vh;" class="flex flex-column">
		<view class="flex border-bottom border-light-secondary" style="height: 100rpx;">
			<view
			class="flex-1 flex flex-column align-center justify-center"
			v-for="(item,index) in tabBars"
			:key="index"
			:class="index === tabIndex ? 'text-main1' : ''"
			@click="changeTab(index)"
			>
			<text class="font-md">{{item.name}}</text>
			<text style="height: 8rpx;width: 140rpx;"
                class="rounded"
			   :class="tabIndex === index? 'bg-main1' : 'bg-white'"
			></text>
			</view>
		</view>
		
		<!-- swiper内容随着上面的tap切换联动 -->
		<swiper :duration="250" class="flex flex-1" :current="tabIndex"
		@change="changeTab($event.detail.current)">
		<swiper-item class="flex-1 flex" v-for="(item,index) in tabBars" :key="index">
			<scroll-view scroll-y="true" class="flex-1">
				<view style="height: 60rpx;" class="bg-light flex align-center font-sm px-2 text-muted">
					文件下载至: storage/xxxx/xxxx
				</view>
				<view class="p-2 border-bottom border-light-secondary font text-muted">
					下载中({{downing.length}})
				</view>
               <!-- 这里注意，因为下面同级还有个f-list中绑定了key为index 会冲突，所以分别给他们加上不同的前缀区分，否则会报错 -->
                    <f-list v-for="(item,index) in downing" :key="'i'+ index" :item="item" :index="index">
						<view style="height: 70rpx;" class="flex align-center text-main1">
							<text class="iconfont icon-zanting"></text>
							<text class="ml-1">{{item.download}}%</text>
						</view>
						<!-- 进度条组件 uniapp自带的无需引入 precent属性绑定下载百分比数组 -->
					    <progress slot="bottom" activeColor="#009CFF" :percent="item.download" :stroke-width="4" />
					</f-list>
					
					<view class="p-2 border-bottom border-light-secondary font text-muted">
						下载完成（{{downed.length}})
					</view>
					<f-list
					v-for="(item,index) in downed"
					:key="'d' + index "
					:item="item"
					:index="index"
					:showRight="false"
					></f-list>
			</scroll-view>
		</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import fList from '@/components/common/f-list.vue';
	export default {
		components:{
			fList
		},
		data() {
			return {
				tabIndex:0,
				tabBars: [
					{
						name: '下载列表'
					},
					{
						name: '上传列表'
					}
				],
				list: [
					{
					  type: 'image',
					  name: '风景.jpg',
					  data: 'https://soft1851.oss-cn-beijing.aliyuncs.com/markdown/37167bafbea47ee98480f5438968e0d.png',
				      create_time: '2019-12-21 09:00',
					  download: 100
					},
					{
					  type: 'image',
					  name: '壁纸.jpg',
					  data: 'https://soft1851.oss-cn-beijing.aliyuncs.com/markdown/2ca9201dd75a7895ab323e985d7748e.jpg',
				      create_time: '2019-2-21 09:00',
					  download: 50
					},
					{
					  type: 'video',
					  name: 'uniapp实战教程.mp4',
					  data: 'https://suxiangyang.oss-cn-hangzhou.aliyuncs.com/images/2.mp4',
					  create_time: '2019-11-21 09:00',
					  download: 100
					},
					{
					  type: 'none',
					  name: '压缩包.rar',
					  create_time: '2020-10-21 08:00',
					  download: 100
					},
					{
					  type: 'text',
					  name: '记事本.txt',
					  create_time: '2020-10-21 08:00',
					  download: 30
					}
				]
			};
		},
		methods:{
			changeTab(index) {
				this.tabIndex = index
			}
		},
		computed:{
			downing() {
				return this.list.filter(item => {
					return item.download < 100;
				});
			},
			downed() {
				return this.list.filter(item => {
					return item.download === 100;
				});
			}
		}
	};
</script>

<style lang="scss">

</style>
