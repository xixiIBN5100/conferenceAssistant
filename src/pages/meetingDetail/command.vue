<template>
  <view class="command">
    <view class="meeting" v-for="meeting in meetingData">
      <view class="date">{{ meeting.data }}</view>
      <view class="meeting-details">
        <Image
          :src="meeting.imgUrl"
          mode="widthFix"
          class="meeting-image"
        />
        <text class="meeting-title">{{ meeting.title }}</text>
        <view class="meeting-time">
          <Clock />
          <text>{{ meeting.time }}</text>
        </view>
        <view class="meeting-location">
          <location2 />
          <text>{{ meeting.location }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import "./command.scss"

const meetingData = [
  {
    data: "4月9日",
    imgUrl: "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
    title: "教育系统会议",
    time: "9：00-10：00",
    location: "安恒大厦一楼"
  },
  {
    data: "4月9日",
    imgUrl: "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
    title: "教育系统会议",
    time: "9：00-10：00",
    location: "安恒大厦一楼"
  },
]
</script>