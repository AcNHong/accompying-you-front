<template>
  <user-card-list :loading="loading"  :user-list="userList" />
  <van-empty v-if="!loading && (!userList || userList.length < 1)" description="搜索结果为空" />
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";
const loading = ref(true);

const route = useRoute();
const {tags} = route.query;

const userList = ref([]);

onMounted(async () => {
  try {
    const response = await myAxios.get('/user/search/tags', {
      params: {
        tagList: tags,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false });
      },
    });
    console.log('/user/search/tags succeed', response);
    const userListData = response?.data;

    console.log('搜索结果', userListData);

    if (userListData) {
      userListData.forEach((user) => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
      });
      userList.value = userListData;
      console.log('userList:', userList);
    }
  } catch (error) {
    console.error('/user/search/tags error', error);
    Toast.fail('请求失败');
  } finally {
    loading.value = false;
  }

});

</script>

<style scoped>

</style>
