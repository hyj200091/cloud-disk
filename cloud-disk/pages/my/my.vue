<template>
  <view>
    <view class="p-3 flex align-center">
      <image
        src="https://soft1851.oss-cn-beijing.aliyuncs.com/markdown/2ca9201dd75a7895ab323e985d7748e.jpg"
        style="width: 120rpx;height: 120rpx;"
        class="rounded-circle flex-shrink mr-3"
      ></image>
      <view class="flex-1 flex flex-column text-muted font">
        <view class="flex align-end">
          <text class="font-lg text-dark mr-2">martin</text>
          男 江苏
        </view>
        <text class="text-ellipsis">无业游民</text>
      </view>
    </view>
    <view class="bg-light" style="height: 20rpx;"></view>
    <view class="p-3">
      <progress class="mb-3" percent="40" active stroke-width="3" />
      <view class="flex align-center justify-between font">
        <text class="text-light-muted">总：100GB</text>
        <text class="text-warning">已用：80GB</text>
      </view>
    </view>
    <view class="bg-light" style="height: 20rpx;"></view>
    <view class="flex justify-between p-3">
      <text class="text-muted font">设置</text>
      <image src="https://soft1851.oss-cn-beijing.aliyuncs.com/markdown/right.png" mode="" style="width:40rpx;height: 40rpx;"></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style></style>