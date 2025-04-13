<template>
<view>
  <home-view v-show="active === 0" @updateActive="active = 1" />
  <day-view v-show="active === 1" />
  <my-view v-show="active === 2" />
  <info-view v-show="active === 3" />
  <nut-tabbar v-model="active" bottom safe-area-inset-bottom placeholder>
    <nut-tabbar-item v-for="(item, index) in List" :key="index" :tab-title="item.title" :icon="item.icon" @click="active = index">
    </nut-tabbar-item>
  </nut-tabbar>
</view>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { Home, Category, Find, Cart, My, My2, Jimi40 } from '@nutui/icons-vue-taro'
import Taro from "@tarojs/taro"
import HomeView from "./homeView/index.vue"
import MyView from './myView/index.vue'
import DayView from "./dayView/index.vue"
import InfoView from "./infoView/index.vue"
// import "./index.scss";

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
    title: '湖宝',
    icon: h(Jimi40)
  },
  {
    title: '我的',
    icon: h(My2)
  }
]

</script>
