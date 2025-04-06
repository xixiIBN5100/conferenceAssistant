<template>
<view style="background-color: beige;">
  <view style="display: flex; justify-content: center; align-items: center; padding: 30px ">
    <text style="font-size: 3rem; "> 大会议程 </text>
  </view>
  <view style=" padding: 0 30px">
    <nut-input v-model="val" placeholder="输入会议名称进行搜索" />
  </view>
  <view style="margin-top: 20px; padding: 10px">
    <view style="background-color: gainsboro;font-size: 1.2rem; width: 160px; display: flex; justify-content: center; align-items: center;height: 34px">
      4 月 19 日
    </view>
    <view style="background-color: gainsboro; width: 100%; margin-top: 20px; display: flex; flex-direction: column;">
      <Image
        src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg"
        mode="widthFix"
        style="width: 100%; display: block;"
      />
      <text style="font-size: 36rpx; padding: 15px;">教育系统数字安全专题会议</text>
      <view style="font-size: 28rpx; padding: 0 15px;display: flex;align-items: center;gap: 10rpx">
        <Clock />
        <text>9:00 - 11:45</text>
      </view>
      <view style="display: flex; align-items: center; gap: 10rpx; font-size: 28rpx; padding: 0 15px 10px;">
        <location2 />
        <text>安恒大厦二层</text>
      </view>
    </view>
  </view>
  <view style="margin-top: 20px; padding: 10px">
    <view style="background-color: gainsboro;font-size: 1.2rem; width: 160px; display: flex; justify-content: center; align-items: center;height: 34px">
      4 月 19 日
    </view>
    <view style="background-color: gainsboro; width: 100%; margin-top: 20px; display: flex; flex-direction: column;">
      <Image
        src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg"
        mode="widthFix"
        style="width: 100%; display: block;"
      />
      <text style="font-size: 36rpx; padding: 15px;">教育系统数字安全专题会议</text>
      <view style="font-size: 28rpx; padding: 0 15px;display: flex;align-items: center;gap: 10rpx">
        <Clock />
        <text>9:00 - 11:45</text>
      </view>
      <view style="display: flex; align-items: center; gap: 10rpx; font-size: 28rpx; padding: 0 15px 10px;">
        <location2 />
        <text>安恒大厦二层</text>
      </view>
    </view>
  </view>
</view>
</template>

<script setup lang="ts">
import { Location2, Clock } from '@nutui/icons-vue-taro'
</script>


<style scoped>

</style>
