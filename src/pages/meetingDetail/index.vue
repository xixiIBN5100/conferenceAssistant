<template>
  <view class="meeting-detail">
    <view class="title-bar">
      <view class="title">{{ "西湖论剑新品发布日" }}</view>
      <view :class="isSubcribed?'unable':null" class="subcribe" @click="subMeeting">
        {{ isSubcribed?'已订阅':'订阅' }}
      </view>
      <view class="info">
        <view class="info-item">
          <Clock/>
          <view>{{ "9:00-10:00" }}</view>
        </view>
        <view class="info-item">
          <Location2/>
          <view>{{ "安恒大厦1楼" }}</view>
        </view>
        <view class="info-item">
          <Eye/>
          <view>{{ "114514" }}</view>
        </view>
      </view>
    </view>
    <view>{{ "video.jpg" }}</view>
    <view class="function-bar">
      <view class="tag-bar">
        <view :class="selectedPlate==1?'selected':null" @tap="selectedPlate=1">会议聊天</view>
        <view :class="selectedPlate==2?'selected':null" @tap="selectedPlate=2">会议议程</view>
        <view :class="selectedPlate==3?'selected':null" @tap="selectedPlate=3">会议推荐</view>
      </view>
      <chat v-show="selectedPlate==1"/>
      <agenda v-show="selectedPlate==2"/>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Location2, Clock, Eye } from '@nutui/icons-vue-taro'
import "./index.scss"
import { ref } from 'vue';
import chat from './chat.vue';
import agenda from './agenda.vue';

const selectedPlate = ref(1);
const isSubcribed = ref(false);

const subMeeting = () => {
  isSubcribed.value = !isSubcribed.value;
}

</script>