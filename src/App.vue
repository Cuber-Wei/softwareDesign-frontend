<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
  padding: 0 !important;
  margin: 0 !important;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}

::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

@font-face {
  font-family: "JetBrains Mono";
  src: url("@/assets/JetBrainsMono-Regular.ttf") format("truetype");
}

pre code {
  font-family: "JetBrains Mono", serif;
}
</style>
<script lang="ts" setup>
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
//全局初始化函数,有全局单次调用的代码可以写在这里
const doInit = () => {
  console.log("Initializing");
};
onMounted(() => {
  doInit();
});
</script>
