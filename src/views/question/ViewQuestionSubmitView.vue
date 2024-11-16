<template>
  <div id="QuestionSubmitView">
    <h1>提交记录详情</h1>
    <a-descriptions :column="{ xs: 2, md: 4, lg: 6 }" title="题目限制">
      <a-descriptions-item label="时间限制">
        <a-tag>{{ questionSubmit?.questionVO.judgeConfig.timeLimit }} ms</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="内存限制">
        <a-tag
          >{{ questionSubmit?.questionVO.judgeConfig.memoryLimit }} KB
        </a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="堆栈限制">
        <a-tag
          >{{ questionSubmit?.questionVO.judgeConfig.stackLimit }} KB
        </a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="判题结果">
        <a-tag>{{ questionSubmit?.judgeInfo.message ?? "None." }}</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="代码耗时">
        <a-tag>{{ questionSubmit?.judgeInfo.time }} ms</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="代码占用">
        <a-tag>{{ questionSubmit?.judgeInfo.memory }} KB</a-tag>
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="{ xs: 2, md: 4, lg: 6 }" title="当前提交">
      <a-descriptions-item label="记录ID">
        <a-tag>{{ questionSubmit?.questionSubmitId }}</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="题目">
        <a-tag @click="toQuestion(questionSubmit?.questionId)"
          >{{ questionSubmit?.questionVO.title }}
        </a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="提交者">
        <a-tag @click="toUser(questionSubmit?.userId)"
          >{{ questionSubmit?.userVO.userName }}
        </a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="状态">
        <a-tag>{{ statusDict[questionSubmit?.status] }}</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="提交时间">
        <a-tag>
          {{ moment(questionSubmit?.createTime).format("YYYY-MM-DD-HH:MM:SS") }}
        </a-tag>
      </a-descriptions-item>
    </a-descriptions>
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <div class="docArea">
          <MdViewer :value="question" />
        </div>
      </a-col>
      <a-col :md="12" :xs="24">
        <div class="docArea">
          <MdViewer :value="code" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, ref, withDefaults } from "vue";
import {
  QuestionSubmitControllerService,
  QuestionSubmitVO,
} from "../../../generated";
import MdViewer from "@/components/MdViewer.vue";
import message from "@arco-design/web-vue/es/message";
import moment from "moment";
import { useRouter } from "vue-router";

const statusDict = {
  0: "等待判题中",
  1: "判题中",
  2: "成功",
  3: "失败",
};
const questionSubmit = ref<QuestionSubmitVO>();
const code = ref<string>();
const question = ref<string>();

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});
const loadData = async () => {
  //拿到当前题目
  const res =
    await QuestionSubmitControllerService.getQuestionSubmitVoByIdUsingGet(
      props.id as any
    );
  if (res.code === 0) {
    questionSubmit.value = res.data;
    code.value = `# 代码\n\`\`\`${questionSubmit.value?.language}\n${questionSubmit.value?.code}\n\`\`\``;
    question.value = questionSubmit.value?.questionVO?.content;
  } else {
    message.error("加载失败！ " + res.message);
  }
};
onMounted(() => {
  loadData();
});

//跳转
const router = useRouter();
const toQuestion = (id: string) => {
  router.push({
    path: `/view/question/${id}`,
  });
};
const toUser = (id: string) => {
  router.push({
    path: `/center/${id}`,
  });
};
</script>

<style scoped>
#QuestionSubmitView {
  margin-left: 10%;
  width: 80%;
  display: flex;
  flex-direction: column;
}

#QuestionSubmitView .docArea {
  position: relative;
  height: calc(75vh - 160px - 2rem);
  max-height: calc(75vh - 160px - 2rem);
  overscroll-behavior: contain;
  overflow: auto;
}
</style>
