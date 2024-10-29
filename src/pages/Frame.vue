<template>

  <van-nav-bar
      :title="title"
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

  <van-tabbar route>
    <van-tabbar-item icon="home-o" name='index' replace to="/">主页</van-tabbar-item>
    <van-tabbar-item icon="search" name='team' replace to="/team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="self" replace to="/user">用户</van-tabbar-item>
<!--    <van-tabbar-item icon="setting-o" name="setting">设置</van-tabbar-item>-->
  </van-tabbar>

</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/route.ts";

const router = useRouter();

const DEFAULT_TITLE = "伙伴匹配"
const title = ref(DEFAULT_TITLE)

//路由守卫
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path
  })
  title.value = route?.title ?? DEFAULT_TITLE

})

const onClickLeft = () => {
  router.back()
};

const onClickRight = () => {
  router.push('/search')
};

</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
