<script setup lang="ts">
import {ref} from 'vue';

const searchText = ref('');
//标签搜索
const onSearch = () => {
  originTagList.value = originTagList.value.map(parentTag => {
    parentTag.children = parentTag.children.filter(item => item.text.includes(searchText.value));
    return parentTag;
  });
};
const onCancel = () => history.back();

const activeIds = ref([]);
const activeIndex = ref(0);

const show = ref(true);

let originTagList = ref([
  {
    text: '浙江',
    children: [
      {text: '杭州', id: '杭州'},
      {text: '温州', id: 2},
      {text: '宁波', id: 3, disabled: true},
    ],
  },
  {
    text: '江苏',
    children: [
      {text: '南京', id: 4},
      {text: '无锡', id: 5},
      {text: '徐州', id: 6},
    ],
  }
]);

//关闭标签
const doClose = (id: number) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== id;
  })
};

</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入标签关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-space>
    <van-tag v-for="id in activeIds" :show="show" closeable size="medium" type="primary" @close="doClose(id)">
      {{ id }}
    </van-tag>
  </van-space>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="originTagList"
  />

</template>


<style scoped>

</style>