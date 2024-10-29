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
import ClipboardJS from "clipboard";

const router = useRouter()

const doCreateTeam = async () => {
  router.push("/teamAdd")
}

const teamList: Team[] = ref([])
const currentUser: UserType = ref()
onMounted(async () => {
  currentUser.value = await getCurrentUser();

  const res = await myAxios.post('/team/page', {
    pageSize: 8,
    pageNum: 1,
  })
  if (res.code === 20000) {
    teamList.value = res.data.records;
  }
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

const showInputPassword = ref(false)
const inputPassword = ref('')

const copyTeamCode = (code: string) => {
  navigator.clipboard.writeText(code).then(() => {
    showSuccessToast("复制成功")
  })
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

  <van-button class="add-button" type="primary" icon="plus" @click="doCreateTeam"/>

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
      <van-button size="small" @click="copyTeamCode(team.code)">复制队伍码</van-button>
      <van-button
          v-if="team.captainId!==currentUser.userId && team.isPublic!=2"
          type="primary" plain size="small"
          @click="doJoinTeam({
                    teamId:team.teamId,
                    password:null
                  })">
        加入队伍
      </van-button>
      <van-button
          v-if="(team.captainId!==currentUser.userId) && team.isPublic==2"
          type="primary" plain size="small"
          @click="showInputPassword = true">
        加入加密队伍
      </van-button>
      <van-button v-if="team.captainId===currentUser.userId"
                  size="small"
                  @click="doUpdateTeam(team.teamId)">修改队伍
      </van-button>
      <van-dialog v-model:show="showInputPassword" title="输入密码" show-cancel-button @confirm="doJoinTeam({
                    teamId:team.teamId,
                    password:inputPassword
                  })">
        <van-field v-model="inputPassword"/>
      </van-dialog>
    </template>
  </van-card>

</template>

<style scoped>

</style>