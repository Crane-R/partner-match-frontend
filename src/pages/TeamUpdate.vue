<script setup lang="ts">

import {onMounted, ref} from "vue";
import myAxios from "../plugins/axios";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()

const initFormData = {
  "name": "",
  "description": "",
  "expireTime": "",
  "isPublic": null,
  "maxNum": 0,
  "password": ""
}

const updateTeamData = ref({...initFormData})

onMounted(async () => {
  if (route.query.id <= 0) {
    showFailToast("加载队伍失败，id错误")
    return
  }
  const res = await myAxios.get("/team/selectOne", {
    params: {
      teamId: route.query.id,
    }
  })
  if (res.code === 20000) {
    updateTeamData.value = res.data
  } else {
    showFailToast("加载队伍失败，请刷新重试");
  }
})

const columns = [
  {text: '公开', value: 0},
  {text: '私有', value: 1},
  {text: '加密', value: 2},
];

const showExpireTimePicker = ref(false);
const showIsPublicPicker = ref(false);

const minDate = new Date();
const expireTimeConfirm = ({selectedValues}) => {
  updateTeamData.value.expireTime = selectedValues.join('/');
  showExpireTimePicker.value = false;
};

const shouIsPublicText = ref("");
const isPublicConfirm = ({selectedOptions}) => {
  showIsPublicPicker.value = false;
  updateTeamData.value.isPublic = selectedOptions[0].value;
  shouIsPublicText.value = selectedOptions[0].text;
};


const doSummit = async () => {
  const res = await myAxios.post("/team/update", updateTeamData.value)
  console.log(res)
  if (res?.code === 20000) {
    showSuccessToast('修改成功');
    router.push({
      path: '/team',
      replace: true
    })
  }
}

</script>

<template>

  <van-form @submit="doSummit">
    <van-cell-group inset>
      <van-field
          v-model="updateTeamData.name"
          name="name"
          label="队伍名称"
          placeholder="队伍名称"
          :rules="[{ required: true, message: '请填写队伍名称' }]"
      />
      <van-field
          v-model="updateTeamData.description"
          name="description"
          label="队伍描述"
          placeholder="队伍描述"
          :rules="[{ required: true, message: '请填写队伍描述' }]"
      />
      <van-field
          v-model="updateTeamData.expireTime"
          is-link
          readonly
          name="expireTime"
          label="过期时间选择"
          placeholder="请选择过期时间"
          @click="showExpireTimePicker = true"
      />
      <van-popup v-model:show="showExpireTimePicker" position="bottom">
        <van-date-picker @confirm="expireTimeConfirm" @cancel="showExpireTimePicker = false" :min-date="minDate"/>
      </van-popup>

      <van-field
          v-model="shouIsPublicText"
          is-link
          readonly
          label="是否公开"
          placeholder="是否公开"
          @click="showIsPublicPicker = true"
      />
      <van-popup v-model:show="showIsPublicPicker" round position="bottom">
        <van-picker
            :columns="columns"
            @cancel="showIsPublicPicker = false"
            @confirm="isPublicConfirm"
        />
      </van-popup>

      <van-field name="maxNum" label="队伍最大人数">
        <template #input>
          <van-stepper v-model="updateTeamData.maxNum" min="2" max="5"/>
        </template>
      </van-field>

      <van-field
          v-if="updateTeamData.isPublic==2"
          v-model="updateTeamData.password"
          type="password"
          name="密码"
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