<template>
<home-view v-if="active === 0"/>
  <nut-tabbar v-model="active" bottom safe-area-inset-bottom placeholder  >
    <nut-tabbar-item v-for="(item, index) in List" :key="index" :tab-title="item.title" :icon="item.icon" @click="active = index">
    </nut-tabbar-item>
  </nut-tabbar>
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
import HomeView from "./homeView.vue";

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

</script>
