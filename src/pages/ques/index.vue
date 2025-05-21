<template>
  <view style="padding: 40rpx; background-color: #f9f9f9; min-height: 100vh">
    <view
      style="
        font-size: 40rpx;
        font-weight: 600;
        text-align: center;
        margin-bottom: 60rpx;
      "
    >
      2025中国数谷·西湖论剑大会报名
    </view>

    <!-- 表单项 -->
    <view v-for="(item, key) in fields" :key="key" style="margin-bottom: 40rpx">
      <text
        style="
          font-size: 28rpx;
          color: #333;
          margin-bottom: 12rpx;
          display: block;
        "
        >{{ item.label }}</text
      >
      <input
        :type="item.type || 'text'"
        :placeholder="'请输入' + item.label"
        v-model="form[key]"
        style="
          width: 90%;
          padding: 28rpx;
          border-radius: 16rpx;
          border: 1px solid #ddd;
          background: #fff;
          font-size: 28rpx;
        "
      />
    </view>

    <!-- 验证码和按钮 -->
    <view style="margin-bottom: 40rpx">
      <text
        style="
          font-size: 28rpx;
          color: #333;
          margin-bottom: 12rpx;
          display: block;
        "
        >手机验证码</text
      >
      <view style="display: flex; align-items: center; gap: 16rpx">
        <input
          v-model="form.code"
          placeholder="请输入验证码"
          maxlength="6"
          style="
            flex: 1;
            padding: 28rpx;
            border-radius: 16rpx;
            border: 1px solid #ddd;
            background: #fff;
            font-size: 28rpx;
          "
        />
        <button
          @tap="handleGetCode"
          :disabled="countDown > 0"
          style="
            padding: 14rpx;
            font-size: 26rpx;
            border-radius: 16rpx;
            background-color: #007aff;
            color: white;
            transition: opacity 0.3s;
            font-weight: 500;
          "
        >
          {{ countDown > 0 ? `${countDown}s` : "获取验证码" }}
        </button>
      </view>
    </view>

    <!-- 提交按钮 -->
    <button
      @tap="handleSubmit"
      style="
        width: 90%;
        padding: 10rpx;
        background-color: #00b578;
        color: white;
        font-size: 30rpx;
        border-radius: 16rpx;
      "
    >
      提交报名
    </button>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Taro from "@tarojs/taro";

const form = ref({
  name: "",
  phone: "",
  code: "",
  email: "",
  job: "",
  org: "",
});

const fields = {
  name: { label: "姓名" },
  id: { label: "身份证号" },
  email: { label: "电子邮箱" },
  job: { label: "职务" },
  org: { label: "公司/学校" },
  phone: { label: "手机号码", type: "number" },
};

const countDown = ref(0);
let timer: NodeJS.Timeout | null = null;

const handleGetCode = () => {
  if (!/^1\d{10}$/.test(form.value.phone)) {
    Taro.showToast({ title: "请输入有效手机号", icon: "none" });
    return;
  }
  Taro.showToast({ title: "验证码已发送", icon: "success" });
  countDown.value = 60;
  timer = setInterval(() => {
    countDown.value--;
    if (countDown.value <= 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
};

const handleSubmit = () => {
  if (!form.value.name || !form.value.phone || !form.value.code) {
    Taro.showToast({ title: "请填写完整信息", icon: "none" });
    return;
  }
  // 可拓展为调用云函数或 HTTP 接口
  Taro.showToast({ title: "报名成功", icon: "success" });
};
</script>
