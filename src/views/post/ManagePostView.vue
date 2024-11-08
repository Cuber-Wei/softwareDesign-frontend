<template>
  <div id="ManagePostView">
    <h1>管理帖子</h1>
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
          {{ moment(record.createTime).format("YYYY-MM-DD-HH:MM:SS") }}
        </a-space>
      </template>
      <template #userId="{ record }">
        <a-space>
          {{ record.userId }}
        </a-space>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toDetail(record)"
            >查看帖子
          </a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
    <a-space
      >每页帖子数量
      <a-input-number
        v-model="searchParams.pageSize"
        min="1"
        placeholder="每页帖子数量"
        size="large"
      />
    </a-space>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import { Post, PostControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await PostControllerService.listPostByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
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
    dataIndex: "postId",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "摘要",
    dataIndex: "abstract",
  },
  {
    title: "标签",
    slotName: "tag",
  },
  {
    title: "评论数",
    dataIndex: "commentNum",
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
    title: "创建用户",
    slotName: "userId",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const router = useRouter();
const doDelete = async (post: Post) => {
  const res = await PostControllerService.deletePostUsingPost({
    id: post.postId,
  });
  if (res.code === 0) {
    // 更新页面
    message.success("删除帖子成功！");
    await loadData();
  } else {
    message.error("删除帖子失败！ " + res.message);
  }
};
const toDetail = (post: Post) => {
  router.push({ path: `/view/post/${post.postId}` });
};
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
const toUser = (id: string) => {
  router.push({
    path: `/center/${id}`,
  });
};
</script>
<style scoped>
#ManagePostView {
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-direction: column;
}
</style>
