<script setup lang="ts">

import {useRoute} from "vue-router";
import axios from "axios";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/axios"
import {UserType} from "../model/user.js";

const route = useRoute();

// (function () {
//   console.log(route.query.searchText)
//   let result = axios('http://localhost:8080/api/');
//   console.log(result)
//
// }())

const users: UserType[] = ref([])
onMounted(async () => {

  const userListData = await myAxios.get('user/userQueryByTags', {
    params: {
      tagNames: '北门',
      isAnd: false
    }
  }).then(function (response) {
    console.log(response.data.data);

    users.value = response.data.data;
  }).catch(function (error) {
    console.log(error);
  }).finally(function () {
    // 总是会执行
  });
  console.log('aaa' + userListData);
  if (userListData) {
    users.value = userListData;
    console.log('ss' + users.value)
  }
  console.log('saaaas' + users.value)
})

</script>

<template>

  <van-card
      v-for="user in users"
      num="2"
      price="2.00"
      :desc="user.introduction"
      :title="user.nickName"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain mark type="primary" style="margin-right: 0.5em" v-for="tag in user.tags">{{ tag }}</van-tag>
    </template>
  </van-card>

</template>

<style scoped>

</style>