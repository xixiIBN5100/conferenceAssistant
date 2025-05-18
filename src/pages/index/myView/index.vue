<template>
  <view class="page" style="height: 92vh!important; min-height: 92vh !important;">
    <!-- 聊天内容区域 -->
    <scroll-view class="chat-content" scroll-y>
      <!-- 用户问题 -->
      <view v-if="question" class="user-message">
        <view class="message-content">{{ question }}</view>
      </view>

      <!-- AI回复 -->
      <view v-show="showReply !== ''" class="ai-message">
        <image class="avatar" src="https://qiuniu.phlin.cn/bucket/20250413174706029.png" mode="aspectFill" />
        <view class="message-content">
          <view v-for="(line, index) in replyLines" :key="index" class="message-line">
            {{ line }}
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部输入区域 -->
    <view class="input-box">
      <input
        class="input"
        v-model="context"
        placeholder="请输入问题"
        placeholder-class="placeholder"
      />
      <view class="button-group">
        <button class="btn send" @click="trigger">发送</button>
        <button class="btn voice" @click="startVoice">🎙️</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import Taro from "@tarojs/taro"
import "./index.scss"

const context = ref('')
const question = ref('')
const showReply = ref('欢迎使用会议助手！我是您的AI助手，可以帮您：\n1. 查询会议议程\n2. 推荐适合您的议题\n3. 解答会议相关问题\n\n请问有什么可以帮您？')

const replay = ref([
  "西湖论剑·网络安全大会汇聚行业领袖，探讨前沿技术与趋势，举办实战演练和CTF竞赛，解读政策法规，注重人才培养，发起公益行动，推动网络安全事业发展。每年吸引数千名专业人士参加，是网络安全领域的顶级盛会。",
  "根据您的个人偏好，推荐您参加技术专题论坛：\n" +
  "人工智能安全：探讨AI在网络安全中的应用和挑战，适合技术研究人员和开发人员。\n" +
  "物联网安全：讨论物联网设备的安全问题和解决方案，适合物联网领域的专业人士。\n" +
  "数据安全与隐私保护：聚焦数据安全和隐私保护的最新技术和法规，适合数据安全管理人员和合规专家。",
  '下一个议程是"筑牢校园网络安全 护航一流大学建设"，由四川大学信息化建设与管理办公室主任段磊主讲。\n'
])

const showReplay = computed(() => {
  if (question.value === "介绍一下西湖论剑大会") {
    return replay.value[0]
  } else if (question.value === "你推荐我参加哪个议程") {
    return replay.value[1]
  } else if (question.value === "下一个议程是什么") {
    return replay.value[2]
  } else {
    return "抱歉，我还不太明白你的问题～"
  }
})

const replyLines = computed(() => {
  return showReply.value.split('\n')
})

const typeText = (text: string) => {
  showReply.value = ''
  let index = 0
  const timer = setInterval(() => {
    showReply.value += text[index]
    index++
    if (index >= text.length) {
      clearInterval(timer)
    }
  }, 50)
}

const trigger = () => {
  if (!context.value) return
  question.value = context.value
  context.value = ''
  setTimeout(() => {
    typeText(showReplay.value)
  }, 1000)
}

// 📌 语音录制 & 模拟语音识别
const startVoice = () => {
  const recorderManager = Taro.getRecorderManager()

  Taro.showToast({
    title: '正在录音…',
    icon: 'none',
    duration: 1000
  })

  recorderManager.start({
    duration: 5000,
    sampleRate: 16000,
    numberOfChannels: 1,
    encodeBitRate: 96000,
    format: 'aac'
  })

  recorderManager.onStop((res) => {
    console.log('录音文件地址:', res.tempFilePath)

    // 这里正常是上传语音文件 → 云服务 → 返回文本
    // 暂时先模拟返回固定文字
    const mockRecognizedText = "介绍一下西湖论剑大会"
    context.value = mockRecognizedText
    Taro.showToast({
      title: '语音识别完成',
      icon: 'success',
      duration: 1000
    })
  })

  // 录 3 秒自动停止
  setTimeout(() => {
    recorderManager.stop()
  }, 3000)
}

</script>

<style lang="scss">
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.chat-content {
  flex: 1;
  padding: 20rpx;
  box-sizing: border-box;
}

.user-message {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20rpx;
}

.ai-message {
  display: flex;
  margin-bottom: 20rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.message-content {
  max-width: 70%;
  padding: 20rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
  line-height: 1.5;
}

.user-message .message-content {
  background-color: #1b71c8;
  color: #fff;
}

.ai-message .message-content {
  background-color: #fff;
  color: #333;
}

.message-line {
  margin: 5rpx 0;
}

.input-box {
  padding: 20rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-top: 1rpx solid #eee;
}

.input {
  flex: 1;
  height: 72rpx;
  background-color: #f5f5f5;
  border-radius: 36rpx;
  padding: 0 30rpx;
  font-size: 28rpx;
}

.placeholder {
  color: #999;
}

.button-group {
  display: flex;
  margin-left: 20rpx;
}

.btn {
  width: 80rpx;
  height: 72rpx;
  line-height: 72rpx;
  text-align: center;
  border-radius: 36rpx;
  font-size: 28rpx;
  margin-left: 10rpx;
  padding: 0;
}

.send {
  background-color: #1b71c8;
  color: #fff;
}

.voice {
  background-color: #f5f5f5;
  color: #333;
}
</style>
