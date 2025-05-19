<template>
<view>
  <view class="login-view" v-if="status == 0">
    <view class="logo-view">
      <img class="logo" src="https://qiuniu.phlin.cn/bucket/20250518170545526.png" mode="widthFix" />
      <view class="logo-title">湖宝·会灵</view>
    </view>
    <view class="login-btn">
      <view class="btn" @tap="loginByWechat">
        一键授权登录
      </view>
    </view>
  </view>
  <view class="cz3x85-prefer" v-else>
    <view class="cz3x85-prefer-content">
      <view class="cz3x85-prefer-title">{{ status==1?"个人偏好 - 议程主题（选填）" : "个人偏好 - 餐饮（选填）"}}</view>
      <view class="cz3x85-prefer-tips">如果愿意，可以向我们提供您的个人偏好信息。我们会为您量身定制推荐内容。</view>
      <view class="cz3x85-prefer-checkbox">
        <view class="cz3x85-prefer-box" v-if="status==1" v-for="li in list1" :class="li.choose?'cz3x85-prefer-boxChoosed':null" @tap="updateList1(li.name)">{{ li.name }}</view>
        <view class="cz3x85-prefer-box" v-if="status==2" v-for="li in list2" :class="li.choose?'cz3x85-prefer-boxChoosed':null" @tap="updateList2(li.name)">{{ li.name }}</view>
      </view>
    </view>
    <view class="cz3x85-prefer-btns">
      <view class="cz3x85-submit" @tap="submitPrefer">提交</view>
      <view class="cz3x85-skip" @tap="skipPrefer">跳过</view>
    </view>
  </view>
</view>
</template>

<script setup lang="ts">
import Taro from "@tarojs/taro";
import "./index.scss";
import { ref } from "vue";

const status = ref(0);

const list1 = ref([
  { name:"人工智能", choose:false },
  { name:"数字基础设施", choose:false },
  { name:"物联网安全", choose:false },
  { name:"青少年网络安全", choose:false },
  { name:"产业创新", choose:false },
  { name:"行业政策", choose:false },
  { name:"高校教育", choose:false },
  { name:"工业互联网安全", choose:false },
])

const list2 = ref([
  { name:"小吃快餐", choose:false },
  { name:"甜点蛋糕", choose:false },
  { name:"农家菜", choose:false },
  { name:"海鲜", choose:false },
  { name:"火锅", choose:false },
  { name:"烤肉", choose:false },
  { name:"川菜", choose:false },
  { name:"西餐", choose:false },
])

const updateList1 = (name: string) => {
  for(const li of list1.value) {
    if(li.name == name) {
      li.choose = !li.choose;
      return;
    }
  }
}

const updateList2 = (name: string) => {
  for(const li of list2.value) {
    if(li.name == name) {
      li.choose = !li.choose;
      return;
    }
  }
}

const loginByWechat = () => {
  // wx.getUserProfile({
  //   desc: '用于完善用户资料', // 声明用途
  //   success: (res) => {
  //     console.log("用户信息:", res.userInfo)
  //     wx.setStorageSync('userInfo', res.userInfo)
  //   },
  //   fail: (err) => {
  //     console.log("用户拒绝授权", err)
  //   }
  // })
  // wx.setStorage({
  //   key: 'isLogin',
  //   data: 'true',
  // })

  status.value = 1;
  // Taro.navigateBack();
}

const skipPrefer = () => {
  Taro.navigateBack();
}

const submitPrefer = () => {
  if(status.value == 1) {
    status.value = 2;
  } else {
    Taro.navigateBack();
  }
}

</script>