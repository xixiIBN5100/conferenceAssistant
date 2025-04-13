<template>
  <view class="user">
    <!-- 顶部栏：头像+昵称 -->
    <view class="title-bar">
      <nut-avatar>张</nut-avatar>
      <view class="user-info">
        <view class="name" style="font-size: 1.5rem">张三</view>
        <view class="email" style="font-size: 1.1rem">zhangsan@conference.com</view>
      </view>
    </view>

    <!-- 功能区 -->
    <view class="menu-list">
      <view class="menu-item">
        <view class="left">
          <nut-icon name="calendar" size="20" color="#1b71c8" />
          <text class="text">我的议程</text>
        </view>
        <view class="right">
          <nut-button size="mini" type="primary" @click="toggleEdit">
            {{ isEditing ? '完成' : '编辑' }}
          </nut-button>
        </view>
      </view>

      <!-- 议程列表 -->
      <view v-for="(meeting, index) in myMeetings" :key="index" class="agenda-item">
        <view class="agenda-info">
          <view class="title">{{ meeting.title }}</view>
          <view class="time">{{ meeting.time }}</view>
        </view>
        <view class="agenda-actions">
          <nut-button v-if="!isEditing" size="mini" @click="navigateTo(meeting.address)">
            导航
          </nut-button>
          <nut-button v-if="isEditing" size="mini" type="danger" @click="removeMeeting(index)">
            删除
          </nut-button>
        </view>
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

    <!-- 推荐议程 -->
    <view class="recommend-section">
      <view class="recommend-title">推荐议程</view>
      <view v-for="(rec, index) in recommendations" :key="index" class="recommend-item" >
        <view class="rec-title">{{ rec.title }}</view>
        <view class="rec-actions">
          <nut-button size="mini" type="primary" @click="addMeeting(rec, index)">添加</nut-button>
          <nut-button size="mini" @click="removeRecommendation(index)">不感兴趣</nut-button>
        </view>
      </view>
    </view>
    <!-- 其他功能项 -->

    <!-- 退出按钮 -->
    <view class="footer">
      <nut-button class="quit-btn" type="warning" shape="round" block @click="logout">
        退出登录
      </nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Taro from "@tarojs/taro"

const isEditing = ref(false)

const myMeetings = ref([
  { title: "AI安全专场", time: "4月20日 10:00", address: "杭州市西湖区XX路" },
  { title: "网络攻防实战", time: "4月20日 13:30", address: "杭州市西湖区YY路" },
])

const recommendations = ref([
  { title: "云安全前沿论坛", time: "4月20日 15:00" },
  { title: "高校网络安全建设", time: "4月21日 09:00" },
  { title: "大模型安全专场", time: "4月21日 13:30" },
])

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

const addMeeting = (rec: { title: string; time: string }, index) => {
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
        font-size: 1.1rem;
        font-weight: 600;
        color: #333;
      }

      .email {
        font-size: 1.1rem;
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

      .left {
        display: flex;
        align-items: center;

        .text {
          margin-left: 12px;
          font-size: 1.1rem;
          color: #333;
        }
      }

      .right {
        display: flex;
        align-items: center;
      }
    }

    .agenda-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 16px;
      border-top: 1px solid #f0f0f0;

      .agenda-info {
        .title {
          font-size: 1.1rem;
          font-weight: 500;
          color: #333;
        }
        .time {
          font-size: 1.1rem;
          color: #999;
          margin-top: 4px;
        }
      }

      .agenda-actions {
        display: flex;
        gap: 8px;
      }
    }
  }

  .recommend-section {
    margin: 24px 0;
    padding: 16px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);

    .recommend-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 14px;
      color: #333;
    }

    .recommend-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;


      .rec-title {
        font-size: 1.1rem;
        color: #333;
      }

      .rec-actions {
        display: flex;
        gap: 8px;
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
