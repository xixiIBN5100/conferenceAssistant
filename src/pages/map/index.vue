<template>
  <view>
    <view class="flex-style">
    <view class="flex-item active" bindtouchstart="goToCar">驾车</view>
    <view class="flex-item" bindtouchstart="goToWalk">步行</view>
    <view class="flex-item" bindtouchstart="goToBus">公交</view>
    <view class="flex-item" bindtouchstart="goToRide">骑行</view>
  </view>
  <view class="map_box">
    <map id="navi_map" longitude="116.451028" latitude="39.949643" scale="12" markers="{{markers}}" polyline="{{polyline}}"></map>
  </view>

  <view class="text_box">
    <view class="text">{{distance}}</view>
    <view class="text">{{cost}}</view>
    <view class="detail_button" bindtouchstart="goDetail">详情</view>
  </view>
  </view>
</template>

<script>
import "./index.scss"

var amapFile = require('../../plugin/gaode-map/amap-wx.130');

Page({
  data: {
    markers: [{
      iconPath: "../../img/mapicon_navi_s.png",
      id: 0,
      latitude: 39.989643,
      longitude: 116.481028,
      width: 23,
      height: 33
    },{
      iconPath: "../../img/mapicon_navi_e.png",
      id: 0,
      latitude: 39.90816,
      longitude: 116.434446,
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: []
  },
  onLoad: function() {
    var that = this;
    var key = "30c54f8a07551352138b07768bae0a11";
    // var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: '高德Key'});
    myAmapFun.getDrivingRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      success: function(data){
        var points = [];
        if(data.paths && data.paths[0] && data.paths[0].steps){
          var steps = data.paths[0].steps;
          for(var i = 0; i < steps.length; i++){
            var poLen = steps[i].polyline.split(';');
            for(var j = 0;j < poLen.length; j++){
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            } 
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if(data.paths[0] && data.paths[0].distance){
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if(data.taxi_cost){
          that.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }
          
      },
      fail: function(info){

      }
    })
  },
  goDetail: function(){
    wx.navigateTo({
      url: '../navigation_car_detail/navigation'
    })
  },
  goToCar: function (e) {
    wx.redirectTo({
      url: '../navigation_car/navigation'
    })
  },
  goToBus: function (e) {
    wx.redirectTo({
      url: '../navigation_bus/navigation'
    })
  },
  goToRide: function (e) {
    wx.redirectTo({
      url: '../navigation_ride/navigation'
    })
  },
  goToWalk: function (e) {
    wx.redirectTo({
      url: '../navigation_walk/navigation'
    })
  }
})
</script>