<template>
<view>
  <home-view v-show="active === 0"/>
  <day-view v-show="active === 1" />
  <my-view v-show="active === 2" />
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
import DayView from "./dayView.vue";

const active = ref(0)

const List = [
  {
    title: '首页',
    icon: h(Home)
  },
  {
    title: '大会日程',
    icon: h(Find)
  },
  {
    title: '我的',
    icon: h(My)
  }
]

</script>
