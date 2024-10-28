<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue"
import {getCurrentUser, userUpdate} from "../services/user.ts";
import {showSuccessToast, showToast} from "vant";

const route = useRoute();
const router = useRouter()
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
})

const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  const res = await userUpdate({
    [editUser.value.editKey]: editUser.value.currentValue,
    'userId': currentUser.userId
  })
  if (res) {
    showSuccessToast('修改成功');
    router.push('/user')
  }
};

</script>

<template>
  <van-form @submit="onSubmit">

    <van-radio-group style="margin-left: 2rem;margin-top: 1rem" v-if="editUser.editKey=='gender'"
                     v-model="editUser.currentValue" shape="dot">
      <van-space direction="vertical">
        <van-radio name="1">男</van-radio>
        <van-radio name="0">女</van-radio>
        <van-radio name="-1">未知</van-radio>
      </van-space>

    </van-radio-group>

    <van-cell-group inset v-else>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        确认
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>