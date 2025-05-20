<template>
  <view style="display: flex; flex-direction: column; align-items: center;">
    <view style="width: 90%; overflow: hidden; border-radius: 50px; border: 2px solid #b6b6b6;">
      <nut-input
        style="height: 32px"
        placeholder=" 你想知道什么? 尽管来搜"
      >
        <template #left>
          <Search />
        </template>
      </nut-input>
    </view>
    <mySwiper :images="list" :interval="2500" />
    <view>
      <img src="https://qiuniu.phlin.cn/bucket/20250520204500480.png" mode="widthFix" style="width: 80vw;"/>
    </view>
    <view style="margin-top: 20px;">
      <img src="https://qiuniu.phlin.cn/bucket/20250520204546526.png" mode="widthFix" style="width: 90vw;"/>
    </view>
    <view style="width: 90%;">
      <view style="font-size: larger;font-weight: bold;margin: 20px 0;">为您定制</view>
      <view style="border-radius: 20px;background-color: #efefef;padding: 15px;width: 90%;height: 70px;">
        <img src="https://www.kfc.com.cn/kfccda/images/npic02.jpg" mode="aspectFill" style="float: left;padding: 0;border-radius: 10px;height: 70px;width: 100px;overflow: hidden;margin-right: 20px;"/>
        <view style="font-size: large;">肯德基</view>
        <view>
          <view v-for="word in ['快餐', '性价比高', '人气旺']" style="display: inline-block; border-radius: 10px; height: 20px; font-size: small;background-color: #ffbe5d;text-align: center; line-height: 17px;padding: 0 3px;margin-right: 4px;">{{ word }}</view>
        </view>
        <view>4.7/5分</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Search } from "@nutui/icons-vue-taro";
import mySwiper from "../../../component/mySwiper/index.vue";
import { ref } from "vue";

const list = ref([
  'https://qiuniu.phlin.cn/bucket/20250520135849531.png',
  'https://qiuniu.phlin.cn/bucket/20250520135907701.png',
  'https://qiuniu.phlin.cn/bucket/20250520135923855.png'
])

</script>