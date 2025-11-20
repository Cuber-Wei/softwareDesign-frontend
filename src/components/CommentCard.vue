<template>
  <a-card class="card">
    <a-row style="align-items: center">
      <a-col :span="8">
        <a-avatar :size="100">
          <img alt="头像" src="@/assets/test-avatar.jpg" />
        </a-avatar>
      </a-col>
      <a-col :span="16">
        <div class="info">评论作者：测试用户</div>
        <div class="info">评论时间：2024-11-18 11:45:14</div>
        <div class="info">评论时间：2024-11-18 11:45:14</div>
        <div
          v-if="store.state.user?.loginUser?.userRole === 'admin'"
          class="info"
        >
          <a-button status="danger">删除</a-button>
        </div>
      </a-col>
    </a-row>
    <Viewer :plugins="plugins" value="# 测试评论" />
  </a-card>
</template>
<script lang="ts" setup>
import { Viewer } from "@bytemd/vue-next";
import { defineProps, withDefaults } from "vue";
import { PostVO } from "../generated";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight-ssr";
import math from "@bytemd/plugin-math-ssr";
import { useStore } from "vuex";

const store = useStore();

/**
 定义组件属性类型
 */
interface Props {
  post: PostVO;
}

/**
 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  post: () => ({} as PostVO),
});
const plugins = [
  gfm(),
  highlight(),
  math(),
  // Add more plugins here
];
</script>
<style scoped>
.card {
  margin: 4px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.info {
  margin-right: 6px;
  padding: 4px;
}
</style>
