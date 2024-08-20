<template>

  <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <div id="content">
    <router-view></router-view>
  </div>

  <!--  <router-link to="/">Index gotyo</router-link>-->
  <!--  <router-link to="/team">Index team</router-link>-->

  <van-tabbar route>
    <van-tabbar-item icon="home-o" name='index' replace to="/">主页</van-tabbar-item>
    <van-tabbar-item icon="search" name='team' replace to="/team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="self" replace to="/user">用户</van-tabbar-item>
    <van-tabbar-item icon="setting-o" name="setting">设置</van-tabbar-item>
  </van-tabbar>

</template>

<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter();

const onClickLeft = () => {
  router.back()
};

const onClickRight = () => {
  router.push('/search')
};

</script>

