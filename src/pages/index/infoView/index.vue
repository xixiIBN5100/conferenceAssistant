<template>
  <view class="page">
    <!-- 顶部用户信息 -->
    <view class="user-header" style="position: relative;">
      <view class="user-avatar">
        <nut-avatar size="large" background="#1b71c8">张</nut-avatar>
      </view>
      <view class="user-info">
        <text class="user-name">张三</text>
        <text class="user-email">zhangsan@conference.com</text>
      </view>
          <view style="position: absolute;top: 52%;right: -40px;transform: translate(-50%, -50%);" @click="navigateToPage('/pages/code/index')">
      <image src="https://qiuniu.phlin.cn/bucket/20250519002734035.png" mode="widthFix" style="width: 100px; height: 100px;" />
    </view>
    </view>


    <!-- 我的议程 -->
    <view class="card">
      <view class="card-header">
        <view class="card-title">
          <nut-icon name="calendar" size="16" color="#1b71c8" />
          <text>我的议程</text>
        </view>
        <nut-button size="small" type="primary" plain @click="toggleEdit">
          {{ isEditing ? '完成' : '编辑' }}
        </nut-button>
      </view>

      <view v-if="myMeetings.length > 0" class="meeting-list">
        <view v-for="(meeting, index) in myMeetings" :key="index" class="meeting-item">
          <view class="meeting-content">
            <text class="meeting-title">{{ meeting.title }}</text>
            <view class="meeting-meta">
              <nut-icon name="clock" size="12" color="#999" />
              <text class="meeting-time">{{ meeting.time }}</text>
            </view>
          </view>
          <view class="meeting-actions">
            <nut-button v-if="!isEditing" size="small" type="primary" plain @click="navigateTo(meeting.address)">
              导航
            </nut-button>
            <nut-button v-if="isEditing" size="small" type="danger" plain @click="removeMeeting(index)">
              删除
            </nut-button>
          </view>
        </view>
      </view>
      <view v-else class="empty-state">
        <nut-icon name="empty" size="48" color="#ccc" />
        <text>暂无议程</text>
      </view>
    </view>

    <!-- 推荐议程 -->
    <view class="card">
      <view class="card-header">
        <view class="card-title">
          <nut-icon name="star" size="16" color="#1b71c8" />
          <text>推荐议程</text>
        </view>
      </view>

      <view v-if="recommendations.length > 0" class="recommend-list">
        <view v-for="(rec, index) in recommendations" :key="index" class="recommend-item">
          <view class="recommend-content">
            <text class="recommend-title">{{ rec.title }}</text>
            <view class="recommend-meta">
              <nut-icon name="clock" size="12" color="#999" />
              <text class="recommend-time">{{ rec.time }}</text>
            </view>
          </view>
          <view class="recommend-actions">
            <nut-button size="small" type="primary" @click="addMeeting(rec, index)">添加</nut-button>
            <nut-button size="small" plain @click="removeRecommendation(index)">不感兴趣</nut-button>
          </view>
        </view>
      </view>
      <view v-else class="empty-state">
        <nut-icon name="empty" size="48" color="#ccc" />
        <text>暂无推荐</text>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="card">
      <view class="menu-list">
        <view class="menu-item" @click="navigateToPage('/pages/feedback/index')">
          <view class="menu-left">
            <nut-icon name="comment" size="16" color="#1b71c8" />
            <text>意见反馈</text>
          </view>
          <nut-icon name="right" size="12" color="#999" />
        </view>
        <view class="menu-item" @click="navigateToPage('/pages/about/index')">
          <view class="menu-left">
            <nut-icon name="information" size="16" color="#1b71c8" />
            <text>关于会议</text>
          </view>
          <nut-icon name="right" size="12" color="#999" />
        </view>
      </view>
    </view>
    <!-- 退出按钮 -->
    <view class="footer">
      <nut-button class="logout-btn" type="warning" shape="round" block @click="logout">
        退出登录
      </nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Taro from "@tarojs/taro"
import eventCenter from "../../../plugin/event/event"

const isEditing = ref(false)

const myMeetings = ref([
  { title: "AI安全专场", time: "5月9日 10:00", address: "杭州市西湖区XX路" },
  { title: "网络攻防实战", time: "5月11日 15:30", address: "杭州市西湖区YY路" },
])

const recommendations = ref([
  { title: "云安全前沿论坛", time: "5月10日 15:00" },
  { title: "高校网络安全建设", time: "5月11日 09:00" },
  { title: "大模型安全专场", time: "5月11日 17:30" },
])

eventCenter.on('conflictOff', removeMeetingsAfter)

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const removeMeeting = (index: number) => {
  myMeetings.value.splice(index, 1)
}

const navigateTo = (address: string) => {
  Taro.navigateTo({
    url: `/pages/map/index?address=${encodeURIComponent(address)}`
  })
}

const navigateToPage = (url: string) => {
  Taro.navigateTo({ url })
}

const addMeeting = (rec: { title: string; time: string }, index: number) => {
  myMeetings.value.push({ ...rec, address: "待定" })
  Taro.showToast({ title: "已添加", icon: "success" })
  recommendations.value.splice(index, 1)
}

const removeRecommendation = (index: number) => {
  recommendations.value.splice(index, 1)
}

const logout = () => {
  Taro.showModal({
    title: '确认退出？',
    content: '确定要退出登录吗？',
    success: res => {
      if (res.confirm) {
        Taro.clearStorageSync()
        Taro.redirectTo({ url: '/pages/login/index' })
      }
    }
  })
}

function removeMeetingsAfter() {
  // 过滤掉截止时间后的会议
  myMeetings.value = myMeetings.value.filter(meeting => {
    
    return !(meeting.title == "网络攻防实战" || meeting.title == "大模型安全专场")
  })
}

</script>

<style lang="scss">
.page {
  min-height: 100vh;
  background-color: #f5f6fa;
  padding: 24rpx;
  box-sizing: border-box;
  overflow-y: scroll;
}

.user-header {
  background: linear-gradient(135deg, #1b71c8, #0d47a1);
  border-radius: 24rpx;
  padding: 40rpx 32rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;
  color: #fff;

  .user-avatar {
    margin-right: 24rpx;
  }

  .user-info {
    .user-name {
      font-size: 36rpx;
      font-weight: 600;
      margin-bottom: 8rpx;
      display: block;
    }

    .user-email {
      font-size: 26rpx;
      opacity: 0.8;
    }
  }
}

.card {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.04);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .card-title {
      display: flex;
      align-items: center;
      font-size: 32rpx;
      font-weight: 600;
      color: #333;

      .nut-icon {
        margin-right: 12rpx;
      }
    }
  }
}

.meeting-list, .recommend-list {
  .meeting-item, .recommend-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #f0f0f0;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .meeting-content, .recommend-content {
      flex: 1;
      margin-right: 24rpx;

      .meeting-title, .recommend-title {
        font-size: 30rpx;
        color: #333;
        margin-bottom: 12rpx;
        display: block;
      }

      .meeting-meta, .recommend-meta {
        display: flex;
        align-items: center;
        font-size: 26rpx;
        color: #999;

        .nut-icon {
          margin-right: 8rpx;
        }
      }
    }

    .meeting-actions, .recommend-actions {
      display: flex;
      gap: 12rpx;
    }
  }
}

.menu-list {
  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #f0f0f0;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .menu-left {
      display: flex;
      align-items: center;
      font-size: 30rpx;

      .nut-icon {
        margin-right: 16rpx;
      }
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60rpx 0;
  color: #999;
  font-size: 28rpx;

  .nut-icon {
    margin-bottom: 16rpx;
  }
}

.footer {
  margin-top: 40rpx;
  padding: 0 24rpx;

  .logout-btn {
    font-size: 32rpx;
    height: 88rpx;
  }
}
</style>
