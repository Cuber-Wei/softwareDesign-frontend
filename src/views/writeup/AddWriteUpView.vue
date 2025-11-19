<template>
  <div id="AddWriteUpView">
    <h1>编写题解</h1>
    <a-descriptions>
      <a-descriptions-item label="题目ID"
        >{{ question.questionId }}
      </a-descriptions-item>
      <a-descriptions-item label="题目名称"
        >{{ question.title }}
      </a-descriptions-item>
    </a-descriptions>
    <a-form :model="writeup" label-align="left" @submit="handleSubmit">
      <a-form-item field="title" label="标题">
        <a-input
          v-model="writeup.title"
          class="formItem"
          placeholder="请输入标题"
        />
      </a-form-item>
      <a-form-item field="content" label="题解正文">
        <MdEditor
          :handle-change="onContentChange"
          :value="writeup.content"
          class="formItem"
        />
      </a-form-item>
      <a-form-item field="tag" label="标签">
        <a-input-tag
          v-model="writeup.tag"
          allow-clear
          class="formItem"
          placeholder="请输入标签"
        />
      </a-form-item>
      <a-button html-type="submit" style="width: 20%" type="primary"
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
  QuestionControllerService,
  WriteUpAddRequest,
  WriteUpControllerService,
} from "../../generated";
import { useRoute } from "vue-router";

const writeup = ref({
  questionId: 0,
  content: "# 题解描述\n",
  tag: ["简单"],
  title: "A + B",
} as WriteUpAddRequest);

const question = ref({
  questionId: 0,
  title: "A + B",
} as any);

const route = useRoute();

const loadData = async () => {
  const id = route.params.id;
  if (!id) {
    return;
  }
  const res: any = await QuestionControllerService.getQuestionVoByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    question.value = res.data;
    writeup.value.questionId = res.data.questionId;
  } else {
    message.error("加载失败！ " + res.message);
  }
};
onMounted(() => {
  loadData();
});

const onContentChange = (v: string) => {
  writeup.value.content = v;
};

const handleSubmit = async () => {
  const res = await WriteUpControllerService.addWriteUpUsingPost(writeup.value);
  if (res.code === 0) {
    message.success("创建题解成功！");
  } else {
    message.error("创建题解失败 " + res.message);
  }
};
</script>
<style scoped>
#AddWriteUpView {
  margin-left: 10%;
  width: 80%;
  display: flex;
  flex-direction: column;
}

#AddWriteUpView .formItem {
  width: 100%;
}
</style>
