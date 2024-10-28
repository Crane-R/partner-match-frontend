<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/axios";
import {UserType} from "../model/user";
import {Team} from "../model/team";
import {teamStatusEnum} from "../constants/team.ts";
import type {UserTeamAddDto} from "../model/UserTeamAddDto.ts";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter()

const doCreateTeam = async () => {
  router.push("/teamAdd")
}

const teamList: Team[] = ref([])
onMounted(async () => {
  const res = await myAxios.post('/team/page', {
    pageSize: 8,
    pageNum: 1,
  })
  console.log(res)
  if (res.code === 20000) {
    teamList.value = res.data.records;
  }
  console.log(teamList.value)

})

const doJoinTeam = async (addDto: UserTeamAddDto) => {
  const res = await myAxios.post("/userTeam/add", {
    ...addDto
  })
  if (res.code === 20000) {
    showSuccessToast("加入成功")
  } else {
    showFailToast(res.description)
  }
}

</script>

<template>
  队伍
  <van-button type="primary" @click="doCreateTeam">创建队伍</van-button>
  <van-button type="primary">主要按钮</van-button>

  <van-card
      v-for="team in teamList"
      :price="team.code"
      :desc="team.description"
      :title="team.name"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      currency=""
  >
    <template #tags>
      <van-tag plain type="primary">最大{{ team.maxNum }}人</van-tag>
      <van-tag plain type="primary">{{ teamStatusEnum[team.isPublic] }}</van-tag>
    </template>
    <template #footer>
      <div>
        过期时间：{{ team.expireTime }}
      </div>
      <van-button size="small">复制队伍码</van-button>
      <van-button type="primary" plain size="small"
                  @click="doJoinTeam({
                    teamId:team.teamId,
                    password:team.isPublic==teamStatusEnum['2']?'123':null
                  })">
        加入队伍
      </van-button>
    </template>
  </van-card>


</template>

<style scoped>

</style>