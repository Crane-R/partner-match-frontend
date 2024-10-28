<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/axios";
import {Team} from "../model/team";
import {teamStatusEnum} from "../constants/team.ts";
import type {UserTeamAddDto} from "../model/UserTeamAddDto.ts";
import {showFailToast, showSuccessToast, showToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {UserType} from "../model/user";

const router = useRouter()

const teamList: Team[] = ref([])
const currentUser: UserType = ref()
onMounted(async () => {
  currentUser.value = await getCurrentUser();

  const res = await myAxios.get('/team/teamListBySelfCreate')
  if (res.code === 20000) {
    teamList.value = res.data.records;
  }
})

const refreshData =async () => {
  const res = await myAxios.get('/team/teamListBySelfCreate')
  if (res.code === 20000) {
    teamList.value = res.data.records;
  }
}

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

let searchText = "";
const onSearch = async (val: string) => {
  const res = await myAxios.post("/team/page", {
    pageSize: 8,
    pageNum: 1,
    name: val,
  })
  if (res.code === 20000) {
    teamList.value = res.data.records;
  }
}

const doUpdateTeam = (id: number) => {
  router.push({
    path: "/teamUpdate",
    query: {
      id
    },
  })
}

const doDiscardTeam = async (id: number) => {
  const res = await myAxios.post("/team/disband", {
    teamId: id
  })
  if (res.code === 20000) {
    showSuccessToast("解散成功")
    await refreshData()
  } else {
    showFailToast(res.description)
  }
}

</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
    />
  </form>

  <van-empty v-if="teamList?.length<1" description="找不到队伍"/>

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
      <van-button
          v-if="team.captainId!==currentUser.userId"
          type="primary" plain size="small"
          @click="doJoinTeam({
                    teamId:team.teamId,
                    password:team.isPublic==teamStatusEnum['2']?'123':null
                  })">
        加入队伍
      </van-button>
      <van-button v-if="team.captainId===currentUser.userId"
                  size="small"
                  @click="doUpdateTeam(team.teamId)">修改队伍
      </van-button>
      <van-button v-if="team.captainId===currentUser.userId"
                  size="small"
                  @click="doDiscardTeam(team.teamId)">解散队伍
      </van-button>
    </template>
  </van-card>


</template>

<style scoped>

</style>