<script setup lang="ts">

import {useRouter} from "vue-router";

const user = {
  id: 123,
  username: 'John',
  nickname: 'John',
  avatarUrl: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.PobTVuzuQy7tAZtvVEc3VQAAAA?rs=1&pid=ImgDetMain',
  gender: 1,
  userStatus: 0,
  createTime: new Date().toLocaleDateString(),
  userRole: '普通用户',
  tags: '帅哥'
}

const router = useRouter()

const toEdit = (editKey: string, editName: string, currentValue: any) => {
  router.push({
    path: '/userEdit',
    query: {
      editKey,
      editName,
      currentValue
    }
  })
}

</script>

<template>
  <van-cell title="头像" is-link @click="toEdit('avatarUrl','头像',user.avatarUrl)">
    <img style="height: 64px" :src="user.avatarUrl" alt="头像">
  </van-cell>
  <van-cell title="用户名" :value="user.username"/>
  <van-cell title="昵称" is-link :value="user.nickname" @click="toEdit('nickname','昵称',user.nickname)"/>
  <van-cell title="性别" is-link :value="user.gender==1?'男':'女'" @click="toEdit('gender','性别',user.gender)"/>
  <van-cell title="用户状态" :value="user.userStatus"/>
  <van-cell title="创建时间" :value="user.createTime"/>
  <van-cell title="用户角色" :value="user.userRole"/>
  <van-cell title="标签" is-link @click="toEdit('tags','标签',user.tags)">
    <van-tag type="primary">{{ user.tags }}</van-tag>
  </van-cell>

</template>

<style scoped>

</style>