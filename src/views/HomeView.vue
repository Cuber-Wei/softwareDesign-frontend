<template>
  <div class="HomeView">
    <CodeEditor :handle-change="onCodeChange" :value="codeValue" />
    <hr />
    <MdEditor :handle-change="onMdChange" :value="mdValue" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";
import MdEditor from "@/components/MdEditor.vue";

const mdValue = ref();
const codeValue = ref();
const onMdChange = (v: string) => {
  mdValue.value = v;
};
const onCodeChange = (v: string) => {
  codeValue.value = v;
};
</script>
<style scoped></style>
