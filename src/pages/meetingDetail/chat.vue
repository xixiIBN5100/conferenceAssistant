<template>
  <view class="chat">
    <view class="text-area">
      <view class="words" v-for="word in chatData">
        <view class="username">{{ word[0] }}</view>
        <view class="content">{{ word[1] }}</view>
      </view>
    </view>
    <view class="input-area">
      <input type="text" class="input" v-model="inputMsg"/>
      <view class="primary-btn" @tap="sendMsg">发送</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "./chat.scss";

const inputMsg = ref("");

const sendMsg = () => {
  chatData.value.push(["user_me", inputMsg.value]);
  inputMsg.value = "";
}

// mock
const chatData = ref([
  ['user1', '这就是我想看的'],
  ['user2', '这就是我想看的'],
  ['user3', '这就是我想看的'],
  ['user4', '这就是我想看的'],
])

</script>