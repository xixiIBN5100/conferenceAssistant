<template>
  <view style="height: 100vh;position: relative">
    <view>
  <nut-swiper
    :init-page="2"
    :auto-play="3000"
    pagination-visible
    pagination-color="#426543"
    pagination-unselected-color="#808080"
    style="height: 45vh; display: flex"
  >
    <nut-swiper-item v-for="(item, index) in list" :key="index" style="flex: 1">
      <img :src="item" alt="" style="height: 100%; width: 100%" draggable="false" />
    </nut-swiper-item>
  </nut-swiper>
    </view>
    <view>
      <view style="padding: 20px;font-size: 1.5rem">直播回放</view>
      <view>
        <nut-swiper
          :init-page="0"
          :auto-play="false"
          style="height: 35vh; display: flex;"
          direction="horizontal"
        >
          <nut-swiper-item v-for="(item, index) in list" :key="index" style="flex: 0 0 auto; height: 100%;" >
            <img :src="item" alt="" style="width: 100%; height: 100%; object-fit: cover;" />
          </nut-swiper-item>
        </nut-swiper>
      </view>
    </view>
    <view>
      <view style="padding: 20px;font-size: 1.5rem">大会亮点</view>
      <view>
        <nut-swiper
          :init-page="0"
          :auto-play="false"
          style="height: 35vh; display: flex;"
          direction="horizontal"
        >
          <nut-swiper-item v-for="(item, index) in list" :key="index" style="flex: 0 0 auto; height: 100%;" >
            <img :src="item" alt="" style="width: 100%; height: 100%; object-fit: cover;" />
          </nut-swiper-item>
        </nut-swiper>
      </view>
    </view>
    <view>
      <view style="padding: 20px;font-size: 1.5rem">重磅嘉宾</view>
      <view>
        <nut-swiper
          :init-page="0"
          :auto-play="false"
          style="height: 35vh; display: flex;"
          direction="horizontal"
        >
          <nut-swiper-item v-for="(item, index) in list" :key="index" style="flex: 0 0 auto; height: 100%;" >
            <img :src="item" alt="" style="width: 100%; height: 100%; object-fit: cover;" />
          </nut-swiper-item>
        </nut-swiper>
      </view>
    </view>
    <view>
      <view style="padding: 20px;font-size: 1.5rem">特色活动</view>
      <view>
        <nut-swiper
          :init-page="0"
          :auto-play="false"
          style="height: 35vh; display: flex;"
          direction="horizontal"
        >
          <nut-swiper-item v-for="(item, index) in list" :key="index" style="flex: 0 0 auto; height: 100%;" >
            <img :src="item" alt="" style="width: 100%; height: 100%; object-fit: cover;" />
          </nut-swiper-item>
        </nut-swiper>
      </view>
    </view>

    <nut-tabbar v-model="active" bottom safe-area-inset-bottom placeholder  >
      <nut-tabbar-item v-for="(item, index) in List" :key="index" :tab-title="item.title" :icon="item.icon" @click="pushUrl()">
      </nut-tabbar-item>
    </nut-tabbar>
  </view>
</template>

<script setup>
import { ref,h } from 'vue'
const list = ref([
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
])
import { Home, Category, Find, Cart, My } from '@nutui/icons-vue-taro'
import Taro from "@tarojs/taro";

const List = [
  {
    title: '首页',
    icon: h(Home)
  },
  {
    title: '精彩活动',
    icon: h(Category)
  },
  {
    title: '大会日程',
    icon: h(Find)
  },
  {
    title: '展商风采',
    icon: h(Cart)
  },
  {
    title: '我的',
    icon: h(My)
  }
]
const active = ref(0)
const pushUrl = () => {
  Taro.navigateTo("/dayTimeLimit")
}
</script>
