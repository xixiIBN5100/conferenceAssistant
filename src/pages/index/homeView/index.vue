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
        <nut-swiper-item v-for="(item, index) in list" :key="index" class="swiper-item" @click="goSchedule">
          <img :src="item" alt="" class="swiper-image" draggable="false"/>
        </nut-swiper-item>
      </nut-swiper>

      <view class="section-title">直播回放</view>
      <view>
        <nut-swiper
          :init-page="0"
          class="swiper"
          direction="horizontal"
          style="height: 250px !important;"
        >
          <nut-swiper-item v-for="(item, index) in list2" :key="index" class="swiper-item-small" style="height: 250px !important;" @click="goSchedule">
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
          style="height: 200px !important;"

        >
          <nut-swiper-item v-for="(item, index) in list1" :key="index" class="swiper-item-small">
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
          style="height: 280px !important;"

        >
          <nut-swiper-item v-for="(item, index) in list3" :key="index" class="swiper-item-small">
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
          style="height: 200px !important;"

        >
          <nut-swiper-item v-for="(item, index) in list4" :key="index" class="swiper-item-small">
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


const emit = defineEmits<{
  (e: 'updateActive'): void
}>()
const goSchedule = () => {
  emit('updateActive')
}

const list = ref([
  'https://qiuniu.phlin.cn/bucket/20250413145719631.png',
  'https://qiuniu.phlin.cn/bucket/20250413145729963.png',
])

const list1 = ref([
  'https://qiuniu.phlin.cn/bucket/20250413162649069.jpg',
  'https://qiuniu.phlin.cn/bucket/20250413162657784.jpg'
])

const list2 = ref([
  "https://qiuniu.phlin.cn/bucket/20250413164220566.jpg",
  "https://qiuniu.phlin.cn/bucket/20250413164231058.jpg"
])

const list3 = ref([
  "https://qiuniu.phlin.cn/bucket/20250413164242772.jpg",
  "https://qiuniu.phlin.cn/bucket/20250413164252292.jpg"
])

const list4 = ref([
  "https://qiuniu.phlin.cn/bucket/20250413165714887.jpg",
  "https://qiuniu.phlin.cn/bucket/20250413165728544.jpg"
])
</script>
