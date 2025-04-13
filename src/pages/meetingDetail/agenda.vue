<template>
  <view class="agenda">
    <view class="one-agenda" v-for="agenda in agendaData">
      <view class="time">{{ agenda.time }}</view>
      <view class="content">{{ agenda.content }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import "./agenda.scss"

// mock

const agendaData = [
  {
    time: "9:00",
    content: "place1"
  },
  {
    time: "10:00",
    content: "place2"
  },
  {
    time: "11:00",
    content: "place3"
  },
  {
    time: "12:00",
    content: "place4"
  },
]
</script>