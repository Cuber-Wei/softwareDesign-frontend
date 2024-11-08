<template>
  <div id="ManageQuestionView">
    <h1>管理题目</h1>
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #tag="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(item, index) of JSON.parse(record.tag)"
            :key="index"
            color="green"
            >{{ item }}
          </a-tag>
        </a-space>
      </template>
      <template #createTime="{ record }">
        <a-space>
          {{ moment(record.createTime).format("YYYY-MM-DD-HH:MM:SS") }}
        </a-space>
      </template>
      <template #updateTime="{ record }">
        <a-space>
          {{ moment(record.updateTime).format("YYYY-MM-DD-HH:MM:SS") }}
        </a-space>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
    <a-space
      >每页题目数量
      <a-input-number
        v-model="searchParams.pageSize"
        min="1"
        placeholder="每页题目数量"
        size="large"
      />
    </a-space>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment/moment";

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
    console.log(res.data.records);
  } else {
    message.error("加载数据失败！ " + res.message);
  }
};

onMounted(() => {
  loadData();
});
// 监听分页变量，改变时更新页面
watchEffect(() => {
  loadData();
});

const columns = [
  {
    title: "ID",
    dataIndex: "questionId",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "题目描述",
    dataIndex: "content",
  },
  {
    title: "参考答案",
    dataIndex: "answer",
  },
  {
    title: "标签",
    slotName: "tag",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "更新时间",
    slotName: "updateTime",
  },
  {
    title: "题目配置",
    dataIndex: "judgeConfig",
  },
  {
    title: "测试用例",
    dataIndex: "judgeCase",
  },
  {
    title: "创建用户id",
    dataIndex: "userId",
  },
  {
    title: "创建用户",
    dataIndex: "userVO",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
const router = useRouter();
const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.questionId,
    },
  });
};
const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.questionId,
  });
  if (res.code === 0) {
    // 更新页面
    message.success("删除题目成功！");
    await loadData();
  } else {
    message.error("删除题目失败！ " + res.message);
  }
};
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
</script>
<style scoped>
#ManageQuestionView {
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-direction: column;
}
</style>
