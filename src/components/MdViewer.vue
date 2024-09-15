<template>
  <Viewer :plugins="plugins" :value="value" />
</template>
<script lang="ts" setup>
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight-ssr";
import math from "@bytemd/plugin-math-ssr";
import { Viewer } from "@bytemd/vue-next";
import { defineProps, withDefaults } from "vue";

/**
 定义组件属性类型
 */
interface Props {
  value: string;
}

/**
 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});

const plugins = [
  gfm(),
  highlight(),
  math(),
  // Add more plugins here
];
</script>
<style scoped>
:deep(.katex-html) {
  display: none;
}
</style>
