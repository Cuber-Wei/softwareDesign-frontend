<template>
  <div id="AddQuestionView">
    <h1 v-if="!isUpdatePage">发布题目</h1>
    <h1 v-else>更新题目</h1>
    <a-form :model="question" label-align="left" @submit="handleSubmit">
      <a-form-item field="title" label="标题">
        <a-input
          v-model="question.title"
          class="formItem"
          placeholder="请输入标题"
        />
      </a-form-item>
      <a-form-item field="content" label="题目描述">
        <MdEditor
          :handle-change="onContentChange"
          :value="question.content"
          class="formItem"
        />
      </a-form-item>
      <a-form-item field="answer" label="参考答案">
        <MdEditor
          :handle-change="onAnswerChange"
          :value="question.answer"
          class="formItem"
        />
      </a-form-item>
      <a-form-item field="tag" label="标签">
        <a-input-tag
          v-model="question.tag"
          allow-clear
          class="formItem"
          placeholder="请输入标签"
        />
      </a-form-item>
      <a-form-item :content-flex="false" :merge-props="false" label="题目限制">
        <a-space class="formItem" direction="vertical" fill>
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
            <a-input-number
              v-model="question.judgeConfig.memoryLimit"
              class="input-demo"
              min="0"
              placeholder="请输入内存限制"
              size="large"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
            <a-input-number
              v-model="question.judgeConfig.stackLimit"
              class="input-demo"
              min="0"
              placeholder="请输入堆栈限制"
              size="large"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.timeLimit" label="时间限制">
            <a-input-number
              v-model="question.judgeConfig.timeLimit"
              class="input-demo"
              min="0"
              placeholder="请输入时间限制"
              size="large"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item label="测试用例配置">
        <a-space class="formItem" direction="vertical" fill>
          <a-form-item
            v-for="(judgeCaseItem, index) of question.judgeCase"
            :key="index + 1"
            :label="`测试用例 ${index + 1}`"
          >
            <a-space class="formInput" direction="vertical" fill>
              <a-form-item
                :key="index + 1"
                :field="`question.judgeCase[${index + 1}].input`"
                :label="`输入用例`"
              >
                <a-input
                  v-model="judgeCaseItem.input"
                  placeholder="请输入测试输入用例"
                />
              </a-form-item>
              <a-form-item
                :key="index + 1"
                :field="`question.judgeCase[${index + 1}].output`"
                :label="`输出用例`"
              >
                <a-input
                  v-model="judgeCaseItem.output"
                  placeholder="请输入测试输出用例"
                />
              </a-form-item>
              <a-button
                :style="{ width: '20%' }"
                status="danger"
                @click="handleDelete(index)"
                >删除
              </a-button>
            </a-space>
          </a-form-item>
          <a-button
            status="success"
            style="width: 20%"
            type="outline"
            @click="handleAdd"
            >新增测试用例
          </a-button>
        </a-space>
      </a-form-item>
      <a-button
        html-type="submit"
        style="width: 20%"
        type="primary"
        @click="doSubmit"
        >提交
      </a-button>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import message from "@arco-design/web-vue/es/message";
import {
  QuestionAddRequest,
  QuestionControllerService,
} from "../../../generated";
import { useRoute } from "vue-router";

const question = ref({
  answer: "# 参考答案\n",
  content: "# 题目描述\n",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  tag: ["简单"],
  title: "A + B",
} as QuestionAddRequest);

const route = useRoute();
const isUpdatePage = ref(route.path.includes("update"));

const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    question.value = res.data;
    if (!question.value.tag) {
      question.value.tag = ["简单"];
    } else {
      question.value.tag = JSON.parse(question.value.tag);
    }
    if (!question.value.judgeConfig) {
      question.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      question.value.judgeConfig = JSON.parse(question.value.judgeConfig);
    }
    if (!question.value.judgeCase) {
      question.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      question.value.judgeCase = JSON.parse(question.value.judgeCase);
    }
  } else {
    message.error("加载失败！ " + res.message);
  }
};
onMounted(() => {
  loadData();
});

const onContentChange = (v: string) => {
  question.value.content = v;
};
const onAnswerChange = (v: string) => {
  question.value.answer = v;
};

const handleAdd = () => {
  if (question.value.judgeCase.length === 10) {
    message.error("测试用例不能多于十个！");
    return;
  }
  question.value.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  if (question.value.judgeCase.length === 1) {
    message.error("测试用例不能少于一个！");
    return;
  }
  question.value.judgeCase.splice(index, 1);
};
const handleSubmit = () => {
  // console.log(question);
};

const doSubmit = async () => {
  // 区分更新还是创建
  if (isUpdatePage.value) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      question.value
    );
    if (res.code === 0) {
      message.success("更新题目成功！");
    } else {
      message.error("更新题目失败 " + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      question.value
    );
    if (res.code === 0) {
      message.success("创建题目成功！");
    } else {
      message.error("创建题目失败 " + res.message);
    }
  }
};
</script>
<style scoped>
#AddQuestionView {
  margin-left: 10%;
  width: 80%;
  display: flex;
  flex-direction: column;
}

#AddQuestionView .formItem {
  width: 100%;
}

.formInput {
  width: 100%;
  flex: 1;
}
</style>
