<template>
  <view style="flex: 1; background-color: #f5f5f5; position: relative;">
    <!-- 聊天内容区域 -->
    <view class="chat-content" style="overflow-y: scroll;height: 80vh;">
      <!-- last chat -->
      <view v-for="chat in chatHistory" :class="chat.user==0? 'ai-message' : 'user-message'">
        <image class="avatar" v-if="chat.user==0" src="https://qiuniu.phlin.cn/bucket/20250413174706029.png" mode="aspectFill" />
        <view class="message-content">{{ chat.chat }}</view>
      </view>
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
    </view>

    <!-- 底部输入区域 -->
    <view style="
      position: fixed;
      bottom: 90px;
      box-sizing: border-box;
      gap: 6px;
      width: 100%;
      padding: 20rpx;
      background-color: #fff;
      display: flex;
      align-items: center;
      border-top: 1rpx solid #eee;"
    >
      <input
        class="input"
        v-model="context"
        placeholder="请输入问题"
        placeholder-class="placeholder"
      />
      <button class="btn send" @click="trigger">发送</button>
      <button class="btn voice" @click="startVoice">🎙️</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import Taro from "@tarojs/taro"
import "./index.scss"
import eventCenter from "../../../plugin/event/event"

const context = ref('')
const question = ref('')
const showReply = ref('')

const chatHistory = ref([{
  chat: "欢迎使用会议助手！我是您的AI助手，可以帮您：\n1. 查询会议议程\n2. 推荐适合您的议题\n3. 解答会议相关问题\n\n请问有什么可以帮您？",
  user: 0
}])

const replay = ref([
  "西湖论剑·网络安全大会汇聚行业领袖，探讨前沿技术与趋势，举办实战演练和CTF竞赛，解读政策法规，注重人才培养，发起公益行动，推动网络安全事业发展。每年吸引数千名专业人士参加，是网络安全领域的顶级盛会。",
  "根据您的个人偏好，推荐您参加技术专题论坛：\n" +
  "人工智能安全：探讨AI在网络安全中的应用和挑战，适合技术研究人员和开发人员。\n" +
  "物联网安全：讨论物联网设备的安全问题和解决方案，适合物联网领域的专业人士。\n" +
  "数据安全与隐私保护：聚焦数据安全和隐私保护的最新技术和法规，适合数据安全管理人员和合规专家。",
  '下一个议程是"筑牢校园网络安全 护航一流大学建设"，由四川大学信息化建设与管理办公室主任段磊主讲。\n',
  "好的，我来帮您处理。为确保预订顺利，我需要您确认以下信息：\n1、是否有预算范围（如每晚不超过XXX元）或星级偏好（如经济型、三星、四星、五星）？\n2、是否需要双床房、大床房或\n其他特殊需求（如无烟房）？\n3、是否需要开具发票？如需，请提供抬头和税号。\n请您确认或补充以上信息后，我将立即为您推荐并预订合适的酒店。",
  "我已为您筛选出几家符合条件的五星级酒店，靠近大会举办地：\n1、杭州索菲特西湖大酒店（五星）\n价格：大床房￥499/晚\n距离会场约0.5公里，环境优美，近地铁站\n早餐：每日1份\n设施：免费WiFi、24h前台\n2、杭州尊蓝钱江豪华精选酒店（五星）\n价格：大床房￥498/晚\n距离会场约1.2公里\n早餐：每日1份\n设施：免费WiFi、健身房、24h前台\n3、杭州纳德自由酒店（五星）\n价格：大床房￥469/晚\n距离会场约1.5公里\n早餐：每日1份\n设施：免费WiFi、健身房、24h前台\n请您确认是否选择其中一家进行预订，或是否需要我继续查找其他选项？确认后我将立即为您锁定房间并生成订单。",
  "好的，已为您锁定以下房间：\n杭州索菲特西湖大酒店\n房型：豪华大床房（非吸烟楼层）\n 入住时间：2025年5月18日（周日）14:00后\n 离店时间：2025年5月21日（周三）12:00前\n价格：￥499/晚 × 3晚 = ￥1497\n早餐：每日1份\n发票信息：浙江工业大学 / 税号：1233000047000441XK\n地址：杭州市西湖区留和路299号，距离会场约0.5公里，地铁3号线屏峰站旁，可地铁直达西湖，地理位置优越。\n免费停车 & 健身房可用\n当前房源紧张，我将立即提交预订申请。预计3分钟内生成确认信息，稍后我会将订单编号与确认函通过短信发送给您。如有变更需要，请尽快告知。\n湖宝已为您守好这段行程，祝您大会顺利、入住愉快。",
  "好的，已经为您去除冲突行程。",
])

const showReplay = computed(() => {
  if (question.value === "介绍一下西湖论剑大会") {
    return replay.value[0]
  } else if (question.value === "你推荐我参加哪个议程") {
    return replay.value[1]
  } else if (question.value === "下一个议程是什么") {
    return replay.value[2]
  } else if(question.value.includes("大会期间")) {
    return replay.value[3]
  } else if(question.value.includes("大床房")) {
    return replay.value[4]
  } else if(question.value.includes("西湖大酒店")) {
    return replay.value[5]
  } else if(question.value.includes("冲突")) {
    eventCenter.trigger('conflictOff', { key: 1 })
    return replay.value[6]
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
  if(question.value != "") {//存入历史
    chatHistory.value.push({
      chat: question.value,
      user: 1
    });
    chatHistory.value.push({
      chat: showReplay.value,
      user: 0
    });
  }
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

.input {
  flex: 5;
  height: 72rpx;
  background-color: #f5f5f5;
  border-radius: 36rpx;
  padding: 0 30rpx;
  font-size: 28rpx;
}

.placeholder {
  color: #999;
}

.btn {
  flex: 1;
  height: 72rpx;
  line-height: 72rpx;
  text-align: center;
  border-radius: 36rpx;
  font-size: 28rpx;
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
