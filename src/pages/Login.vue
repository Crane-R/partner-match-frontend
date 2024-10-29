<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../plugins/axios"
import {showSuccessToast, showToast, Toast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter();

const username = ref('');
const password = ref('');
const onSubmit = async () => {
  const params = new URLSearchParams();
  params.append("username", username.value);
  params.append("password", password.value);
  console.log(params + 'aaa')
  const res = await myAxios.post('user/login', {
    username: username.value,
    password: password.value
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log('结果' + res)
  if (res.code == 20000) {
    // Toast.success('登录成功');
    showSuccessToast('登录成功');
    router.push({
      path: '/',
      replace: true
    });
  }
};
</script>

<template>
  <van-form @submit="onSubmit" enctype="text/plain">
    <van-cell-group inset>
      <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>