<template>
  <a-card class="card">
    <a-row style="align-items: center">
      <a-col :span="8">
        <a-avatar :size="100">
          <img :src="props.post.user?.userAvatar" alt="头像" />
        </a-avatar>
      </a-col>
      <a-col :span="16">
        <div class="info">题解作者：{{ props.post.user?.userName }}</div>
        <div class="info">编写时间：{{ props.post?.createTime }}</div>
        <div class="info">发布时间：{{ props.post?.updateTime }}</div>
      </a-col>
    </a-row>
    <Viewer :plugins="plugins" :value="props.post?.content" />
  </a-card>
</template>
<script lang="ts" setup>
import { Viewer } from "@bytemd/vue-next";
import { defineProps, withDefaults } from "vue";
import { PostVO } from "../generated";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight-ssr";
import math from "@bytemd/plugin-math-ssr";

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
