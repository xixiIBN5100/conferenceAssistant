<template>
  <view style="padding: 10px">
    <view>
      <view v-if="question" style="position: absolute; right:10px; background-color: #1b71c8; display: inline-flex; color: white; padding:10px; border-radius: 5px">
        {{ question }}
      </view>
      <view v-show="showReply !== ''"  style="position: absolute; left:10px; width: 80%; top: 60px;display: flex;align-items: start">
        <nut-avatar><img src="https://qiuniu.phlin.cn/bucket/20250413174706029.png" /></nut-avatar>
        <view  style="position: absolute; left:50px; width: 80%; padding:10px; border-radius: 5px; background-color: ghostwhite">
          <view v-for="(line, index) in replyLines" :key="index" style="display: flex">
            {{ line }}
          </view>
        </view>
      </view>

    </view>

    <view style="position: absolute; bottom: 60px; display: inline-flex; align-items: center; width: 90%">
      <nut-input v-model="context" placeholder="请输入问题" />
      <nut-button type="primary" size="small" @click="trigger">发送</nut-button>
      <nut-button type="success" size="small" style="margin-left: 6px" @click="startVoice">🎙️语音</nut-button>
    </view>

  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import Taro from "@tarojs/taro"
import "./index.scss"

const context = ref('')
const question = ref('')
const showReply = ref('')

const replay = ref([
  "西湖论剑·网络安全大会汇聚行业领袖，探讨前沿技术与趋势，举办实战演练和CTF竞赛，解读政策法规，注重人才培养，发起公益行动，推动网络安全事业发展。每年吸引数千名专业人士参加，是网络安全领域的顶级盛会。",
  "根据您的个人偏好，推荐您参加技术专题论坛：\n" +
  "人工智能安全：探讨AI在网络安全中的应用和挑战，适合技术研究人员和开发人员。\n" +
  "物联网安全：讨论物联网设备的安全问题和解决方案，适合物联网领域的专业人士。\n" +
  "数据安全与隐私保护：聚焦数据安全和隐私保护的最新技术和法规，适合数据安全管理人员和合规专家。",
  "下一个议程是“筑牢校园网络安全 护航一流大学建设”，由四川大学信息化建设与管理办公室主任段磊主讲。\n"
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
