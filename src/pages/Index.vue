<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/axios"
import {UserType} from "../model/user.js";
import {getCurrentUser} from "../services/user.ts";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();

let user = ref()

const users: UserType[] = ref([])
onMounted(async () => {
  user.value = await getCurrentUser()

  const userListData = await myAxios.get('user/usersRecommend', {
    params: {
      pageSize: 8,
      pageNum: 1,
    }
  }).then(function (response) {
    users.value = response.data.records;
  }).catch(function (error) {
    console.log(error);
  }).finally(function () {
    // 总是会执行
  });
  if (userListData) {
    users.value = userListData;
  }
})

const loadingMatch = ref(false)
const doMatchUsers = async () => {
  loadingMatch.value = true
  const num = 10;
  const res = await myAxios.get("/user/usersMatch", {
    params: {
      num,
    }
  })
  if (res.code === 20000) {
    showSuccessToast("匹配成功")
    users.value = res.data;
  } else {
    showFailToast(res.description)
  }
  loadingMatch.value = false
}

</script>

<template>

  <template v-if="!user">
    请先登录
    <van-button plain hairline block type="primary" replace to="/login">跳转至登录页</van-button>
  </template>

  <template v-else>
    <van-notice-bar
        left-icon="volume-o"
        text="寻找与你相似的人。"
    />

    <van-button type="primary" round hairline @click="doMatchUsers">寻找与你相似的用户</van-button>
    <div>超强算法，助你寻找心动之人，但耗时较长</div>

    <van-skeleton title avatar :row="3" :loading="loadingMatch" v-for="user in users">
      <van-card
          :desc="user.introduction"
          :title="user.nickname"
          :thumb="user.avatarUrl"
      >
        <template #tags>
          <van-tag plain mark type="primary" style="margin-right: 0.5em" v-for="tag in user.tags">{{ tag }}</van-tag>
        </template>
      </van-card>

    </van-skeleton>


  </template>

</template>

<style scoped>

</style>