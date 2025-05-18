<template>
  <view class="login-view">
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
</template>

<script setup lang="ts">
import Taro from "@tarojs/taro";
import "./index.scss";

const loginByWechat = () => {
  wx.getUserProfile({
    desc: '用于完善用户资料', // 声明用途
    success: (res) => {
      console.log("用户信息:", res.userInfo)
      wx.setStorageSync('userInfo', res.userInfo)
    },
    fail: (err) => {
      console.log("用户拒绝授权", err)
    }
  })
  wx.setStorage({
    key: 'isLogin',
    data: 'true',
  })

  Taro.navigateBack();
}

</script>