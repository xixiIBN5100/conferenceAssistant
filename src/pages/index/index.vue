<template>
<view>
  <view style="display: flex; flex-direction: column; height: 100vh;width: 100vw;">
    <home-view v-show="active === 0" @updateActive="active = 1" />
    <day-view v-show="active === 1" />
    <find-view v-show="active === 2"/>
    <my-view v-show="active === 3" />
    <info-view v-show="active === 4" />
    <nut-tabbar v-model="active" bottom safe-area-inset-bottom placeholder>
      <nut-tabbar-item v-for="(item, index) in List" :key="index" :tab-title="item.title" :icon="item.icon" @click="active = index">
      </nut-tabbar-item>
    </nut-tabbar>
  </view>
</view>
</template>

<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { Home, Find, My2, Jimi40, Search } from '@nutui/icons-vue-taro'
import Taro from "@tarojs/taro"
import HomeView from "./homeView/index.vue"
import MyView from './myView/index.vue'
import DayView from "./dayView/index.vue"
import InfoView from "./infoView/index.vue"
import FindView from "./findView/index.vue"
import { watch } from 'vue'
// import "./index.scss";

const active = ref(0)
// const showPreferSetting = ref(false);
watch(active, () => {
  if(active.value === 3) {
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
  }
})
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
    title: '发现',
    icon: h(Search)
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

onMounted(() => {
  //检测是否登录
  const isLogin = ref("false");
  // wx.getStorage({
  //   key: 'islogin',
  //   success: (res) => isLogin.value=res.data, // 输出: 'value'
  // })
  if(isLogin.value == "false") {
    Taro.navigateTo({
      url: "/pages/login/index"
    })
  }

  // 检测是否进行偏好设置
  // const isSettedPrefer = ref("false");
  // wx.getStorage({
  //   key: 'isSettedPrefer',
  //   success: (res) => isSettedPrefer.value=res.data, // 输出: 'value'
  // })
  // if(isSettedPrefer.value == "false") {
  //   showPreferSetting.value = true;
  // }
})

</script>
