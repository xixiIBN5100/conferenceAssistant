<template>
  <view
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      flex-direction: column;
      gap: 40px;
    "
  >
    <view
      style="
        width: 90%;
        height: 430px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        padding: 20px;
        margin-top: 10px;
      "
    >
      <view
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          font-size: 25px;
        "
      >
        <view> 面向摄像头展示二维码</view>
        <view> 完成签到/打卡</view>
      </view>
      <nut-divider dashed style="color: #ff858a"> </nut-divider>
      <view
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 10px;
        "
      >
        <view style="font-size: 25px">张三</view>
        <image
          src="../../assist/code.png"
          mode="aspectFill"
          style="height: 200px; width: 200px"
        />

        <view>{{ nowTime }}</view>
        <view>每隔60秒自动刷新一次</view>
      </view>
    </view>
    <view
      style="
        width: 100%;
        display: flex;
        overflow: hidden;
        border-radius: 16px;
        height: 50px;
      "
    >
      <NutButton style="flex: 1; background-color: #3f72af; height: 50px"
        ><text style="color: white">手动刷新</text></NutButton
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
const nowTime = ref("");

const updateTime = () => {
  const now = new Date();
  const format = `${now.getFullYear()}年${pad(now.getMonth() + 1)}月${pad(
    now.getDate()
  )}日 ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  nowTime.value = format;
};

const pad = (n) => (n < 10 ? "0" + n : n);

let timer;

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>
