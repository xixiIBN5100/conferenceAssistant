<template>
  <view class="chat">
    <view class="text-area">
      <view class="words" v-for="word in chatData">
        <view class="username">{{ word[0] }}</view>
        <view class="content">{{ word[1] }}</view>
      </view>
    </view>
    <view class="input-area">
      <input type="text" class="input"/>
      <view class="primary-btn">发送</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import "./chat.scss";

// mock
const chatData = [
  ['user1', '这就是我想看的'],
  ['user2', '这就是我想看的'],
  ['user3', '这就是我想看的'],
  ['user4', '这就是我想看的'],
  ['user1', '这就是我想看的'],
  ['user2', '这就是我想看的'],
  ['user3', '这就是我想看的'],
  ['user4', '这就是我想看的'],  ['user1', '这就是我想看的'],
  ['user2', '这就是我想看的'],
  ['user3', '这就是我想看的'],
  ['user4', '这就是我想看的'],  ['user1', '这就是我想看的'],
  ['user2', '这就是我想看的'],
  ['user3', '这就是我想看的'],
  ['user4', '这就是我想看的'],  ['user1', '这就是我想看的'],
  ['user2', '这就是我想看的'],
  ['user3', '这就是我想看的'],
  ['user4', '这就是我想看的'],  ['user1', '这就是我想看的'],
  ['user2', '这就是我想看的'],
  ['user3', '这就是我想看的'],
  ['user4', '这就是我想看的'],
]
</script>