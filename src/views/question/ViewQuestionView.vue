<template>
  <div id="ViewQuestionsView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question" position="left">
          <a-tab-pane key="question" title="题目">
            <div class="docArea">
              <a-card
                v-if="question"
                :title="question.title"
                style="margin-top: 10px; height: 95%; flex: 1"
                :bordered="false"
              >
                <template #extra>
                  <a-space wrap>
                    <a-tag
                      v-for="(item, index) of question.tags"
                      :key="index"
                      color="green"
                      >{{ item }}
                    </a-tag>
                  </a-space>
                </template>
                <a-descriptions
                  title="判题信息"
                  :column="{ xs: 1, md: 2, lg: 3 }"
                >
                  <a-descriptions-item label="时间限制">
                    <a-tag>{{ question.judgeConfig.timeLimit }} ms</a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="内存限制">
                    <a-tag>{{ question.judgeConfig.memoryLimit }} KB</a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="堆栈限制">
                    <a-tag>{{ question.judgeConfig.stackLimit }} KB</a-tag>
                  </a-descriptions-item>
                </a-descriptions>
                <MdViewer :value="question.content || ' '" />
              </a-card>
            </div>
          </a-tab-pane>
          <a-tab-pane key="answer" title="题解" disabled> 题目题解</a-tab-pane>
          <a-tab-pane key="comment" title="评论"> 评论区</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24" class="codeArea">
        <a-row class="operationLine" :column="{ xs: 1, md: 2 }">
          <a-col :span="8">
            <a-cascader
              v-model="form.language"
              :options="languageOptions"
              placeholder="请选择代码语言"
              style="width: 100%"
            />
          </a-col>
          <a-col :span="8" style="margin-left: 20px">
            <a-button type="primary" style="width: 200px" @click="doSubmit"
              >提交代码
            </a-button>
          </a-col>
        </a-row>
        <CodeEditor
          ref="monacoEdit"
          :value="form.code"
          :readonly="false"
          :language="form.language"
          :handle-change="onCodeChange"
          style="height: 95%; flex: 1"
        ></CodeEditor>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, ref, withDefaults } from "vue";
import message from "@arco-design/web-vue/es/message";
import {
  QuestionAddRequest,
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
} from "../../../generated";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

const question = ref<QuestionAddRequest>();
const languageOptions = [
  {
    value: "java",
    label: "Java",
  },
  {
    value: "cpp",
    label: "C++",
  },
  {
    value: "python",
    label: "Python3",
  },
  {
    value: "golang",
    label: "Golang",
  },
];

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as string
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败！ " + res.message);
  }
};
onMounted(() => {
  loadData();
});

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});
const onCodeChange = (v: string) => {
  form.value.code = v;
};
const doSubmit = async () => {
  if (props.id !== "" && form.value.code !== "") {
    const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost(
      {
        ...form.value,
        questionId: props.id,
      }
    );
    if (res.code === 0) {
      message.success("提交成功！");
    } else {
      message.error("提交失败！ " + res.message);
    }
  }
};
</script>
<style>
#ViewQuestionsView {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

#ViewQuestionsView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}

#ViewQuestionsView .arco-card .arco-card-size-medium .arco-card-bordered {
  height: 100% !important;
}

#ViewQuestionsView .operationLine {
  margin: 10px 0;
  height: 32px;
  width: 100%;
}

#ViewQuestionsView .docArea {
  position: relative;
  height: calc(100vh - 160px - 2rem);
  max-height: calc(100vh - 160px - 2rem);
  overscroll-behavior: contain;
  overflow: auto;
}

#ViewQuestionsView .codeArea {
  position: relative;
  height: calc(100vh - 160px - 2rem);
  max-height: calc(100vh - 160px - 2rem);
  overflow: hidden;
}
</style>
