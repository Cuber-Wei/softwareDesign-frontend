<template>
  <div id="HomeView">
    <h1>Online Judge</h1>
    <a-row>
      <a-col :span="14">
        <MdViewer :value="content || ' '" />
      </a-col>
      <a-col :span="10">
        <img
          alt="logo"
          src="@/assets/oj-logo.jpg"
          style="display: block; margin: 0 auto"
        />
        <h2 style="margin-bottom: 2rem; text-align: center">
          <IconMindMapping />
          建站时间线
        </h2>
        <a-timeline
          label-position="relative"
          mode="alternate"
          v-bind="pendingProps"
        >
          <template #dot>
            <IconFire :style="{ color: '#e70a0a' }" />
          </template>
          <a-timeline-item label="2024-09-19" lineType="dashed">
            <a-row :style="{ display: 'inline-flex', alignItems: 'center' }">
              <IconFile
                :size="32"
                :style="{ marginRight: '16px', marginBottom: '12px' }"
              />
              <div :style="{ marginBottom: '12px' }">开题报告完成</div>
            </a-row>
          </a-timeline-item>
          <a-timeline-item label="2024-09-29" lineType="dashed">
            <a-row :style="{ display: 'inline-flex', alignItems: 'center' }">
              <IconGithub
                :size="32"
                :style="{ marginRight: '16px', marginBottom: '12px' }"
              />
              <div :style="{ marginBottom: '12px' }">
                建立
                <a-link href="https://github.com/Cuber-Wei/software-design" icon
                  >GitHub代码仓库
                </a-link>
              </div>
            </a-row>
          </a-timeline-item>
          <a-timeline-item label="2024-10-29" lineType="dashed">
            <a-row :style="{ display: 'inline-flex', alignItems: 'center' }">
              <IconFile
                :size="32"
                :style="{ marginRight: '16px', marginBottom: '12px' }"
              />
              <div :style="{ marginBottom: '12px' }">需求获取报告完成</div>
            </a-row>
          </a-timeline-item>
          <a-timeline-item label="2024-11-07" lineType="dashed">
            <a-row :style="{ display: 'inline-flex', alignItems: 'center' }">
              <IconFile
                :size="32"
                :style="{ marginRight: '16px', marginBottom: '12px' }"
              />
              <div :style="{ marginBottom: '12px' }">需求分析报告完成</div>
            </a-row>
          </a-timeline-item>
          <a-timeline-item label="2024-11-08" lineType="dashed">
            <a-row :style="{ display: 'inline-flex', alignItems: 'center' }">
              <IconCodeSquare
                :size="32"
                :style="{ marginRight: '16px', marginBottom: '12px' }"
              />
              <div :style="{ marginBottom: '12px' }">前端界面框架基本完成</div>
            </a-row>
          </a-timeline-item>
          <a-timeline-item label="2024-11-11" lineType="dashed">
            <a-row :style="{ display: 'inline-flex', alignItems: 'center' }">
              <IconFile
                :size="32"
                :style="{ marginRight: '16px', marginBottom: '12px' }"
              />
              <div :style="{ marginBottom: '12px' }">demo预览部署上线</div>
            </a-row>
          </a-timeline-item>
        </a-timeline>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import MdViewer from "@/components/MdViewer.vue";
import content from "@/assets/index.md?"; // 使用 import 引入 md
import {
  IconCodeSquare,
  IconFile,
  IconFire,
  IconGithub,
  IconMindMapping,
} from "@arco-design/web-vue/es/icon";

const pendingProps = {
  pending: "Comming Soon...",
};
</script>
<style scoped>
#HomeView {
  margin-left: 10%;
  width: 80%;
  display: flex;
  flex-direction: column;
}
</style>
