<template>
  <view>
    <view class="flex-style">
      <view class="flex-item active" @click="goToCar">驾车</view>
      <view class="flex-item" @click="goToWalk">步行</view>
      <view class="flex-item" @click="goToBus">公交</view>
      <view class="flex-item" @click="goToRide">骑行</view>
    </view>
    <view class="map_box">
      <map id="navi_map" :longitude="116.451028" :latitude="39.949643" :scale="12" :markers="markers" :polyline="polyline"></map>
    </view>

    <view class="text_box">
      <view class="text">{{distance}}</view>
      <view class="text">{{cost}}</view>
      <view class="detail_button" @click="goDetail">详情</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import "./index.scss"
import Taro from '@tarojs/taro'

interface Marker {
  iconPath: string
  id: number
  latitude: number
  longitude: number
  width: number
  height: number
}

interface Point {
  longitude: number
  latitude: number
}

interface Polyline {
  points: Point[]
  color: string
  width: number
}

const markers = ref<Marker[]>([{
  iconPath: "../../img/mapicon_navi_s.png",
  id: 0,
  latitude: 39.989643,
  longitude: 116.481028,
  width: 23,
  height: 33
}, {
  iconPath: "../../img/mapicon_navi_e.png",
  id: 0,
  latitude: 39.90816,
  longitude: 116.434446,
  width: 24,
  height: 34
}])

const distance = ref('')
const cost = ref('')
const polyline = ref<Polyline[]>([])

onMounted(() => {
  const key = "30c54f8a07551352138b07768bae0a11"
  const amapFile = require('../../plugin/gaode-map/amap-wx.130')
  const myAmapFun = new amapFile.AMapWX({ key })

  myAmapFun.getDrivingRoute({
    origin: '116.481028,39.989643',
    destination: '116.434446,39.90816',
    success: (data) => {
      const points: Point[] = []
      if (data.paths && data.paths[0] && data.paths[0].steps) {
        const steps = data.paths[0].steps
        for (let i = 0; i < steps.length; i++) {
          const poLen = steps[i].polyline.split(';')
          for (let j = 0; j < poLen.length; j++) {
            points.push({
              longitude: parseFloat(poLen[j].split(',')[0]),
              latitude: parseFloat(poLen[j].split(',')[1])
            })
          }
        }
      }
      polyline.value = [{
        points: points,
        color: "#0091ff",
        width: 6
      }]
      if (data.paths[0] && data.paths[0].distance) {
        distance.value = data.paths[0].distance + '米'
      }
      if (data.taxi_cost) {
        cost.value = '打车约' + parseInt(data.taxi_cost) + '元'
      }
    },
    fail: (info) => {
      console.error(info)
    }
  })
})

const goDetail = () => {
  Taro.navigateTo({
    url: '../navigation_car_detail/navigation'
  })
}

const goToCar = () => {
  Taro.redirectTo({
    url: '../navigation_car/navigation'
  })
}

const goToBus = () => {
  Taro.redirectTo({
    url: '../navigation_bus/navigation'
  })
}

const goToRide = () => {
  Taro.redirectTo({
    url: '../navigation_ride/navigation'
  })
}

const goToWalk = () => {
  Taro.redirectTo({
    url: '../navigation_walk/navigation'
  })
}
</script>