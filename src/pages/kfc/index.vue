<template>
<view style="overflow-y: scroll;background-color: #f7f7f7;height: 100vh;">
  <img src="https://qiuniu.phlin.cn/bucket/20250520210616375.png" mode="widthFix" style="width: 95vw;"/>
  <view style="display: flex;flex-direction: row;gap: 3rem;width: 100vw;justify-content: center;margin: 10px 0;">
    <view :class="tickitType==0?'tickit-choose':null" class="tickit-type" @tap="tickitType=0">可兑换的券</view>
    <view :class="tickitType==1?'tickit-choose':null" class="tickit-type" @tap="tickitType=1">未使用的券</view>
  </view>
  <view style="display: flex;flex-direction: row;gap: 2rem;width: 100vw;justify-content: center;margin: 10px 0;">
    <view style="display: flex;flex-direction: column;align-items: center;padding: 20px;box-shadow: 3px 3px 10px #ababab;background-color: white;" v-for="t in tickits[tickitType]">
      <view style="color: #1f2863;">{{ t.name }}</view>
      <view style="color: #1f2863; font-size: large;">{{ t.cost }}</view>
      <view 
      style="color: #1f2863;background-color: #f3f72a;border-radius: 0.7rem;height: 1.4rem;width: 3.4rem;display: flex;align-items: center;justify-content: center;"
      @tap="useTickit(t.to)"
      >
        {{ tickitType==0? (t.used?"已兑换":"兑换"):"核销" }}
      </view>
    </view>
  </view>
  <view style="width: 100vw;display: flex;justify-content: center;margin: 20px 0;">
    <view
    style="
      border-radius: 20px;
      background-color: #003355;
      color: white;
      font-weight: bolder;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80vw;
      height: 40px;
    "
    >导航去这家</view>
  </view>
</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import "./index.scss"

const tickitType = ref(0);
const tickits = ref([
  [
    {
      name: "满50减5元券",
      cost: "免费",
      used: false,
      to: 0
    },
    {
      name: "满50减10元券",
      cost: "100积分",
      used: false,
      to: 1
    },
  ],
  [],
])

const useTickit = (to:number) => {
  if(to==0) {
    tickits.value[0][0].used = true;
    tickits.value[1].push({
      name: "2025/5/30过期",
      cost: "满50减5元",
      used: false,
      to: 2
    })
  }
  else if(to==1) {
    tickits.value[0][1].used = true;
    tickits.value[1].push({
      name: "2025/5/30过期",
      cost: "满50减5元",
      used: false,
      to: 2
    })
  }
  else {
    //new page
  }
}


</script>