<template>
  <view class="homeView">
    <view>
      <view
        style="
          width: 100%;
          height: 210px;
          background: linear-gradient(to right bottom, #3b82f6, #98f3f0);
          display: flex;
          justify-content: center;
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
        "
      >
        <view
          style="
            display: flex;
            gap: 10px;
            align-items: center;
            flex-direction: column;
            flex: 1;
            justify-content: center;
            gap: 30px;

          "
        >
          <view style="display: flex; gap: 50px; align-items: center">
            <text style="font-size: 30px; color: white; font-weight: 500"
              >早上好, 张三</text
            >
            <nut-button style="color: #3f72af ; border: 8px #3f72af; " @click="handleClick">{{ text }}</nut-button>
          </view>
          <view style="width: 90%; overflow: hidden; border-radius: 50px">
            <nut-input
              style="height: 32px"
              placeholder=" 你想知道什么? 尽管来搜"
            >
              <template #left>
                <Search />
              </template>
            </nut-input>
          </view>
        </view>
      </view>

      <view
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
        "
      >
        <view class="section-title">最新资讯</view>
        <text style="color: #3f72af;"> 查看更多 </text>
      </view>

      <view style="display: flex; justify-content: center;" @click="goSchedule">
        <image src="https://qiuniu.phlin.cn/bucket/20250413164231058.jpg" mode="widthFix" style="width: 90%; height: auto; border-radius: 12px;"></image>
      </view>
      <view
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
        "
      >
        <view class="section-title">大会亮点</view>
        <text style="color: #3f72af;"> 查看更多 </text>
      </view>

      <view style="display: flex; justify-content: center;">
        <image src="https://qiuniu.phlin.cn/bucket/20250413162649069.jpg" mode="widthFix" style="width: 90%; height: auto; border-radius: 12px;"></image>
      </view>
      <view
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
        "
      >
        <view class="section-title">重磅嘉宾</view>
        <text style="color: #3f72af;"> 查看更多 </text>
      </view>

      <view style="display: flex; justify-content: center;">
        <image src="https://qiuniu.phlin.cn/bucket/20250413164242772.jpg" mode="widthFix" style="width: 90%; height: auto; border-radius: 12px;"></image>
      </view>
            <view
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
        "
      >
        <view class="section-title">特色活动</view>
        <text style="color: #3f72af;"> 查看更多 </text>
      </view>

      <view style="display: flex; justify-content: center;">
        <image src="https://qiuniu.phlin.cn/bucket/20250413165728544.jpg" mode="widthFix" style="width: 90%; height: auto; border-radius: 12px;"></image>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "./index.scss";
import { Search } from "@nutui/icons-vue-taro";
import Taro from "@tarojs/taro"
const text = ref("线下报名参会");
const handleClick = () => {
  Taro.navigateTo({
    url: "/pages/ques/index",
  });
  text.value = "我的报名信息"
};
const emit = defineEmits<{
  (e: "updateActive"): void;
}>();
const goSchedule = () => {
  emit("updateActive");
};

// const list = ref([
//   "https://qiuniu.phlin.cn/bucket/20250413145719631.png",
//   "https://qiuniu.phlin.cn/bucket/20250413145729963.png",
// ]);

// const list1 = ref([
//   "https://qiuniu.phlin.cn/bucket/20250413162649069.jpg",
//   "https://qiuniu.phlin.cn/bucket/20250413162657784.jpg",
// ]);

// const list2 = ref([
//   "https://qiuniu.phlin.cn/bucket/20250413164220566.jpg",
//   "https://qiuniu.phlin.cn/bucket/20250413164231058.jpg",
// ]);

// const list3 = ref([
//   "https://qiuniu.phlin.cn/bucket/20250413164242772.jpg",
//   "https://qiuniu.phlin.cn/bucket/20250413164252292.jpg",
// ]);

// const list4 = ref([
//   "https://qiuniu.phlin.cn/bucket/20250413165714887.jpg",
//   "https://qiuniu.phlin.cn/bucket/20250413165728544.jpg",
// ]);
</script>
