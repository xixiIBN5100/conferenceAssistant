<template>
<view>
  <preferance-setting v-if="preferanceSetting"/>
  <view v-else>
    <home-view v-show="active === 0" @updateActive="active = 1" />
    <day-view v-show="active === 1" />
    <my-view v-show="active === 2" />
    <info-view v-show="active === 3" />
    <nut-tabbar v-model="active" bottom safe-area-inset-bottom placeholder>
      <nut-tabbar-item v-for="(item, index) in List" :key="index" :tab-title="item.title" :icon="item.icon" @click="active = index">
      </nut-tabbar-item>
    </nut-tabbar>
  </view>
</view>
</template>

<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { Home, Find, My2, Jimi40 } from '@nutui/icons-vue-taro'
import Taro from "@tarojs/taro"
import HomeView from "./homeView/index.vue"
import MyView from './myView/index.vue'
import DayView from "./dayView/index.vue"
import InfoView from "./infoView/index.vue"
import preferanceSetting from "./preferance/index.vue"
// import "./index.scss";

const active = ref(0)
const showPreferSetting = ref(false);

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
    title: '智联会讯',
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
  const isSettedPrefer = ref("false");
  // wx.getStorage({
  //   key: 'isSettedPrefer',
  //   success: (res) => isSettedPrefer.value=res.data, // 输出: 'value'
  // })
  if(isSettedPrefer.value == "false") {
    showPreferSetting.value = true;
  }
})

</script>
