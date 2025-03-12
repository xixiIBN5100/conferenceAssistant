<template>
<view>
  <home-view v-if="active == 0"/>
  <my-view v-if="active == 4" />
  <nut-tabbar v-model="active" bottom safe-area-inset-bottom placeholder  >
    <nut-tabbar-item v-for="(item, index) in List" :key="index" :tab-title="item.title" :icon="item.icon" @click="active = index">
    </nut-tabbar-item>
  </nut-tabbar>
</view>
</template>

<script setup>
import { ref,h } from 'vue'
import { Home, Category, Find, Cart, My } from '@nutui/icons-vue-taro'
import Taro from "@tarojs/taro";
import HomeView from "./homeView.vue";
import myView from './myView.vue';

const active = ref(0)

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

</script>
