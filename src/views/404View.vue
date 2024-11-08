<template>
  <div id="not-found">
    <h1 style="margin-bottom: 2rem; text-align: center">404 Not Found</h1>
    <a-row>
      <a-col :span="12">
        <a-card
          v-for="item in leftCode"
          :key="item.id"
          :bordered="false"
          :title="item.lang"
          class="code-card"
        >
          <template #extra>
            <a-link href="/">To Index</a-link>
            <IconRight />
          </template>
          <MdViewer :value="item.code" />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card
          v-for="item in rightCode"
          :key="item.id"
          :bordered="false"
          :title="item.lang"
          class="code-card"
        >
          <template #extra>
            <a-link href="/">To Index</a-link>
            <IconRight />
          </template>
          <MdViewer :value="item.code" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import MdViewer from "@/components/MdViewer.vue";
import codeJson from "@/assets/404.json";
import { IconRight } from "@arco-design/web-vue/es/icon";

const leftCode = codeJson.filter((item) => item.id % 2 === 0);
const rightCode = codeJson.filter((item) => item.id % 2 !== 0);
</script>
<style scoped>
#not-found {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
}

.code-card {
  width: 90%;
  margin: 1rem auto;
  min-height: 250px;
  border-radius: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
