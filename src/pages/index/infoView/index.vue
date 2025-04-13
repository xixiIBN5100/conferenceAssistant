<template>
  <view class="user">
    <!-- 顶部栏：头像+昵称 -->
    <view class="title-bar">
      <nut-avatar  >张</nut-avatar>
      <view class="user-info">
        <view class="name" style="font-size: 1.5rem">张三</view>
        <view class="email"  style="font-size: 1.1rem">zhangsan@conference.com</view>
      </view>
    </view>

    <!-- 功能区 -->
    <view class="menu-list">
      <view class="menu-item" @click="goTo('my-meetings')">
        <view class="left">
          <nut-icon name="calendar" size="20" color="#1b71c8" />
          <text class="text">我的会议</text>
        </view>
        <nut-icon name="right" size="14" />
      </view>
      <view class="menu-item" @click="goTo('my-signups')">
        <view class="left">
          <nut-icon name="checklist" size="20" color="#1b71c8" />
          <text class="text">我的报名</text>
        </view>
        <nut-icon name="right" size="14" />
      </view>
      <view class="menu-item" @click="goTo('feedback')">
        <view class="left">
          <nut-icon name="comment" size="20" color="#1b71c8" />
          <text class="text">意见反馈</text>
        </view>
        <nut-icon name="right" size="14" />
      </view>
      <view class="menu-item" @click="goTo('about')">
        <view class="left">
          <nut-icon name="information" size="20" color="#1b71c8" />
          <text class="text">关于会议</text>
        </view>
        <nut-icon name="right" size="14" />
      </view>
    </view>

    <!-- 退出按钮 -->
    <view class="footer">
      <nut-button class="quit-btn" type="warning" shape="round" block @click="logout">
        退出登录
      </nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro from "@tarojs/taro"

const goTo = (path: string) => {
  Taro.navigateTo({
    url: `/pages/${path}/index`
  })
}

const logout = () => {
  Taro.showModal({
    title: '确认退出？',
    success: res => {
      if (res.confirm) {
        Taro.clearStorageSync()
        Taro.redirectTo({ url: '/pages/login/index' })
      }
    }
  })
}
</script>

<style lang="scss">
.user {
  padding: 20px;
  background-color: #f7f8fa;
  min-height: 100vh;
  box-sizing: border-box;

  .title-bar {

    display: flex;
    align-items: center;
    padding: 20px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);

    .user-info {
      margin-left: 26px;

      .name {
        font-size: 20px;
        font-weight: 600;
        color: #333;
      }

      .email {
        font-size: 14px;
        color: #888;
        margin-top: 6px;
      }
    }
  }

  .menu-list {
    margin: 24px 0;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);

    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 16px;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .left {
        display: flex;
        align-items: center;

        .text {
          margin-left: 12px;
          font-size: 1.1rem;
          color: #333;
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    .quit-btn {
      font-size: 1.1rem;
    }
  }
}
</style>
