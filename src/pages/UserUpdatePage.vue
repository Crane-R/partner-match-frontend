<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser, setCurrentUser, userLogout} from "../services/user.ts";
import {formatDate} from "../services/DateFormat.ts";
import {showSuccessToast} from "vant";


// let user = {
//   id: 123,
//   username: 'John',
//   nickname: 'John',
//   avatarUrl: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.PobTVuzuQy7tAZtvVEc3VQAAAA?rs=1&pid=ImgDetMain',
//   gender: 1,
//   userStatus: 0,
//   createTime: new Date().toLocaleDateString(),
//   userRole: '普通用户',
//   tags: '帅哥'
// }

let user = ref()

onMounted(async () => {
  //获取当前用户信息
  user.value = await getCurrentUser()
})

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

// 退出登录
const logout = async () => {
  setCurrentUser(null)
  await userLogout()
  showSuccessToast('退出登录');
  router.push('/login')
}

</script>

<template>

  <template v-if="user">
    <van-cell title="头像" is-link @click="toEdit('avatarUrl','头像',user.avatarUrl)">
      <img style="height: 64px" :src="user.avatarUrl" alt="头像">
    </van-cell>
    <van-cell title="用户名" :value="user.username"/>
    <van-cell title="昵称" is-link :value="user.nickname" @click="toEdit('nickname','昵称',user.nickname)"/>
    <van-cell title="简介" is-link :value="user.introduction" @click="toEdit('introduction','简介',user.introduction)"/>
    <van-cell title="性别" is-link :value="user.gender==0?'女':user.gender==1?'男':'未知'"
              @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="用户状态" :value="user.userStatus==0?'正常':'冻结'"/>
    <van-cell title="创建时间" :value="formatDate(new Date(user.createTime))"/>
    <van-cell title="用户角色" :value="user.userRole==0?'普通用户':'管理员'"/>
    <van-cell title="标签" is-link @click="toEdit('tags','标签',user.tags)">
      <van-space>
        <van-tag v-for="tag in user.tags" type="primary">{{ tag }}</van-tag>
      </van-space>
    </van-cell>
    <van-button plain hairline block type="primary" @click="logout">退出登录</van-button>
  </template>
  <template v-else>
    请先登录
    <van-button plain hairline block type="primary" replace to="/login">跳转至登录页</van-button>
  </template>

</template>

<style scoped>

</style>