<template>
  <view class="p3z87-custom-swiper">
    <!-- 轮播容器 -->
    <view 
      class="p3z87-swiper-wrapper"
      :style="{ transform: `translateX(${-currentIndex * 100}%)`, transition: `transform ${transitionDuration}ms ease` }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <!-- 轮播项 -->
      <view 
        v-for="(item, index) in imgList" 
        :key="index" 
        class="p3z87-swiper-slide"
      >
        <img :src="item" mode="aspectFill" class="p3z87-slide-image" />
      </view>
    </view>

    <!-- 指示器 -->
    <view class="p3z87-indicator">
      <view 
        v-for="(item, index) in imgList" 
        :key="index" 
        class="p3z87-indicator-dot"
        :class="{ active: currentIndex === index }"
      />
    </view>
  </view>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'CustomSwiper',
  props: {
    // 图片列表
    images: {
      type: Array,
      default: () => [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
        'https://img.yzcdn.cn/vant/apple-3.jpg'
      ]
    },
    // 自动轮播间隔（ms）
    interval: {
      type: Number,
      default: 3000
    },
    // 切换动画时长（ms）
    transitionDuration: {
      type: Number,
      default: 500
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const currentIndex = ref(0) // 当前索引
    const imgList = ref(props.images) // 图片列表
    let timer = null // 定时器
    let startX = 0 // 触摸起始 X 坐标
    let moveX = 0 // 触摸移动距离

    // 自动轮播
    const startAutoPlay = () => {
      if (!props.autoplay) return
      clearInterval(timer)
      timer = setInterval(() => {
        nextSlide()
      }, props.interval)
    }

    // 下一张
    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % imgList.value.length
    }

    // 上一张
    const prevSlide = () => {
      currentIndex.value = (currentIndex.value - 1 + imgList.value.length) % imgList.value.length
    }

    // 触摸开始
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX
      clearInterval(timer) // 触摸时停止自动播放
    }

    // 触摸移动
    const handleTouchMove = (e) => {
      moveX = e.touches[0].clientX - startX
    }

    // 触摸结束
    const handleTouchEnd = () => {
      if (Math.abs(moveX) > 50) { // 滑动距离大于 50px 才切换
        if (moveX > 0) {
          prevSlide() // 右滑，上一张
        } else {
          nextSlide() // 左滑，下一张
        }
      }
      startAutoPlay() // 重新开始自动播放
    }

    // 初始化自动播放
    onMounted(() => {
      startAutoPlay()
    })

    // 组件卸载时清除定时器
    onUnmounted(() => {
      clearInterval(timer)
    })

    return {
      currentIndex,
      imgList,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd
    }
  }
}
</script>

<style>
.p3z87-custom-swiper {
  margin: 30px;
  width: 90vw;
  height: 300px;
  position: relative;
  overflow: hidden;
}

.p3z87-swiper-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.p3z87-swiper-slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
}

.p3z87-slide-image {
  border-radius: 20px;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.p3z87-indicator {
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.p3z87-indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
}

.p3z87-indicator-dot.active {
  background-color: #fff;
}
</style>