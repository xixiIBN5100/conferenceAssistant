<template>
  <view class="chat">
    <view class="text-area">
      <view v-for="(line, index) in replyLines" :key="index" class="words">
        <view class="username">{{ line[0] }}</view>
        <view class="content"> {{ line[1] }} </view>
      </view>
    </view>

    <view class="input-area">
      <nut-input v-model="context" placeholder="请输入问题" />
      <nut-button type="primary" size="small" @click="send">发送</nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "./chat.scss";

const context = ref('')

const replyLines = ref([
  ['李四', '小程序做的很好'],
  ['王五', '大会很精彩'],
  ['李四', '感觉主讲人很有气场'],
  ['刘六', '听了讲座受益匪浅'],
])

const send = () => {
  if (!context.value) return
  replyLines.value.push(['张三', context.value])
  context.value = ''
}

</script>