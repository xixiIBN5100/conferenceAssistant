<template>
<view class="dayView">
  <view style="font-size: 30px;font-weight: bolder;color: #003355;margin: 10px;">
    <text> 大会议程 </text>
  </view>
  <view>
    <view style="font-weight: bold;margin: 10px;font-size: 23px;">2025年5月</view>
    <view style="display: flex;flex-direction: row;gap: 8px;margin: 15px;font-size: 20px;">
      <view v-for="(meet, index) in meetingData" class="dataBtn" :class="time==index?'dataBtnChoosed':null" @tap="time = index">
        <view>{{ meet.week }}</view>
        <view>{{ meet.date }}</view>
      </view>
    </view>
  </view>
  <view style="width: 100vw;background-color: #181818;border-radius: 30px;padding-top: 6px;" >
    <view style="color: #ebebeb;margin-left: 12px;font-size: small;margin-bottom: 6px;">
      <view style="display: inline;color: aquamarine;font-size: large;">•</view> 2025年5月{{ meetingData[time].date }}日（{{ meetingData[time].week }}）
    </view>
    <view style="height: 50vh; width: 100vw;background-color: white;border-radius: 30px;padding-top: 10px;display: flex;flex-direction: column;align-items: center;gap: 10px;">
      <view style="position: relative; border: solid 2px #1ab0a6;border-left: solid 5px #1ab0a6; border-radius: 10px;padding: 5px;width: 85vw;" v-for="meeting in meetingData[time].meetings">
        <view class="meeting-details">
          <view style="display: flex; align-items: center;margin-bottom: 6px;">
            <Clock />
            <text style="font-size: small;color: #808080;padding-left: 10px;">{{ meeting.time }}</text>
          </view>
          <view style="font-weight: bold;margin-bottom: 6px;" @tap="pageToDetail">{{ meeting.title }}</view>
          <view style="display: flex; align-items: center;">
            <location2 />
            <text style="font-size: small;color: #808080;padding-left: 10px;">{{ meeting.location }}</text>
          </view>
        </view>
        <view :class="meeting.isSub? null : 'unsubedBtn'" class="subedBtn" @tap="subMeeting(meeting.title)">{{ meeting.isSub? "取消订阅" : "订阅" }}</view>
      </view>
    </view>
  </view>
</view>
</template>

<script setup lang="ts">
import { Location2, Clock } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import "./index.scss";

const time = ref(1);

const pageToDetail = () => {
  Taro.navigateTo({
    url: "/pages/meetingDetail/index"
  })
}

const subMeeting = (title: string): void => {
  meetingData.value.forEach(day => {
    day.meetings.forEach(meeting => {
      if (meeting.title === title) {
        meeting.isSub = !meeting.isSub;
      }
    });
  });
};

// mock
// const meetingData = ref([
//   {
//     data: "4月9日",
//     imgUrl: "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
//     title: "西湖论剑新品发布日",
//     time: "9：00-10：00",
//     location: "安恒大厦一楼",
//     isSub: false
//   },
//   {
//     data: "4月4日",
//     imgUrl: "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
//     title: "区块链技术入门培训",
//     time: "9:55",
//     location: "杭州西湖文创园",
//     isSub: false
//   },
// ]);

const meetingData = ref([
  {
    month: "五月",
    date: "9",
    week: "周五",
    meetings: []
  },
  {
    month: "五月",
    date: "10",
    week: "周六",
    meetings: [
      {
        data: "4月9日",
        imgUrl: "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
        title: "西湖论剑新品发布日",
        time: "9：00-10：00",
        location: "安恒大厦一楼",
        isSub: false
      },
      {
        data: "4月4日",
        imgUrl: "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
        title: "区块链技术入门培训",
        time: "9:55",
        location: "杭州西湖文创园",
        isSub: false
      },
    ]
  },
  {
    month: "五月",
    date: "11",
    week: "周日",
    meetings: []
  },
])

</script>