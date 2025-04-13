<template>
  <view class="homeView">
    <view>
      <nut-swiper
        :init-page="2"
        :auto-play="3000"
        pagination-visible
        pagination-color="#426543"
        pagination-unselected-color="#808080"
        class="swiper"
      >
        <nut-swiper-item v-for="(item, index) in list" :key="index" class="swiper-item">
          <img :src="item" alt="" class="swiper-image" draggable="false"/>
        </nut-swiper-item>
      </nut-swiper>

      <view class="section-title">直播回放</view>
      <view>
        <nut-swiper
          :init-page="0"
          class="swiper"
          direction="horizontal"
        >
          <nut-swiper-item v-for="(item, index) in list" :key="index" class="swiper-item">
            <img :src="item" alt="" class="swiper-image"/>
          </nut-swiper-item>
        </nut-swiper>
      </view>
    </view>
    <view>
      <view class="section-title">大会亮点</view>
      <view>
        <nut-swiper
          :init-page="0"
          class="swiper"
          direction="horizontal"
        >
          <nut-swiper-item v-for="(item, index) in list" :key="index" class="swiper-item">
            <img :src="item" alt="" class="swiper-image"/>
          </nut-swiper-item>
        </nut-swiper>
      </view>
    </view>
    <view>
      <view class="section-title">重磅嘉宾</view>
      <view>
        <nut-swiper
          :init-page="0"
          class="swiper"
          direction="horizontal"
        >
          <nut-swiper-item v-for="(item, index) in list" :key="index" class="swiper-item">
            <img :src="item" alt="" class="swiper-image"/>
          </nut-swiper-item>
        </nut-swiper>
      </view>
    </view>
    <view>
      <view class="section-title">特色活动</view>
      <view>
        <nut-swiper
          :init-page="0"
          class="swiper"
          direction="horizontal"
        >
          <nut-swiper-item v-for="(item, index) in list" :key="index" class="swiper-item">
            <img :src="item" alt="" class="swiper-image"/>
          </nut-swiper-item>
        </nut-swiper>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import "./index.scss";

const list = ref([
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
])
</script>