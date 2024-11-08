<template>
  <div id="postHeader">
    <div :style="{ display: 'flex' }">
      <a-card :style="{ width: '100%' }" title="Arco Card">
        <template #extra>
          <a-link>More</a-link>
        </template>
        ByteDance's core product, Toutiao ("Headlines"), is a content platform
        in China and around the world. Toutiao started out as a news
        recommendation engine and gradually evolved into a platform delivering
        content in various formats.
      </a-card>
    </div>
    <a-row class="header1">
      <a-col :span="4" style="background-color: #ccc">
        <img
          alt="logo"
          src="@/assets/oj-logo.jpg"
          style="width: 100%; height: 100%"
        />
        />
      </a-col>
      <a-col :span="20" style="background-color: #eee">
        <a-row>
          <h1 style="margin-bottom: 0; font-size: 25px">{{ showName }}</h1>
        </a-row>
        <a-row>
          <div>签名</div>
        </a-row>
        <a-row>
          <div>标签</div>
        </a-row>
      </a-col>
    </a-row>

    <a-row class="header2">
      <a-col :span="12">
        <a-button>发布帖子</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const showName = computed(() => {
  return store.state.user?.loginUser?.userName ?? "未登录";
});
</script>

<style scoped>
#postHeader {
  padding: 10px;
  height: 200px;
}

.header1 {
  display: flex;
  align-items: center;
  height: 75%;
}

.header2 {
  flex: 1;
  display: flex;
  align-items: center;
}
</style>
