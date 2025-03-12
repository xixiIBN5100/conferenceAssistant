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
          <img :src="item" alt="" style="height: 100%; width: 100%" draggable="false"/>
        </nut-swiper-item>
      </nut-swiper>

      <view style="padding: 20px;font-size: 1.5rem">直播回放</view>
      <view>
        <nut-swiper
          :init-page="0"
          style="height: 35vh; display: flex;"
          direction="horizontal"
        >
          <nut-swiper-item v-for="(item, index) in list" :key="index" style="flex: 0 0 auto; height: 100%;">
            <img :src="item" alt="" style="width: 100%; height: 100%; object-fit: cover;"/>
          </nut-swiper-item>
        </nut-swiper>
      </view>
    </view>
    <view>
      <view style="padding: 20px;font-size: 1.5rem">大会亮点</view>
      <view>
        <nut-swiper
          :init-page="0"
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
          style="height: 35vh; display: flex;"
          direction="horizontal"
        >
          <nut-swiper-item v-for="(item, index) in list" :key="index" style="flex: 0 0 auto; height: 100%;" >
            <img :src="item" alt="" style="width: 100%; height: 100%; object-fit: cover;" />
          </nut-swiper-item>
        </nut-swiper>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const list = ref([
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
])
</script>