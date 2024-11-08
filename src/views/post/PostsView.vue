<template>
  <div id="PostsView">
    <h1>帖子列表</h1>
    <a-form :model="searchParams" layout="inline">
      <a-col :span="10">
        <a-form-item field="title" label="帖子名称" label-col-flex="70px">
          <a-input v-model="searchParams.title" placeholder="请输入帖子名称" />
        </a-form-item>
      </a-col>
      <a-col :span="10">
        <a-form-item field="tag" label="标签" label-col-flex="80px">
          <a-input-tag
            v-model="searchParams.tag"
            allow-clear
            class="formItem"
            placeholder="请输入标签"
          />
        </a-form-item>
      </a-col>
      <a-col :span="4">
        <a-button style="width: 50%" type="primary" @click="doSubmit"
          >提交
        </a-button>
      </a-col>
    </a-form>
    <a-divider :size="0"></a-divider>
    <a-space
      >每页帖子数量
      <a-input-number
        v-model="searchParams.pageSize"
        min="1"
        placeholder="每页帖子数量"
        size="small"
        style="width: 200px"
      />
    </a-space>
    <a-divider :size="0"></a-divider>
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
          <a-tag v-for="(item, index) of record.tag" :key="index" color="green"
            >{{ item }}
          </a-tag>
        </a-space>
      </template>
      <template #commentNum="{ record }">
        <a-space>
          {{ record.commentNum ? record.commentNum : "0" }}
        </a-space>
      </template>
      <template #createTime="{ record }">
        <a-space>
          {{ moment(record.createTime).format("YYYY-MM-DD-HH:MM:SS") }}
        </a-space>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toPost(record)">查看详情</a-button>
        </a-space>
      </template>
    </a-table>
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
  title: "",
  tag: [],
});

const loadData = async () => {
  // 校验分页数量
  if (!searchParams.value.pageSize || searchParams.value.pageSize <= 0) {
    searchParams.value.pageSize = 5;
  }
  const res = await PostControllerService.listPostVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
    console.log(dataList);
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
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tag",
  },
  {
    title: "评论数",
    slotName: "commentNum",
  },
  {
    title: "发布时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
// 跳转到做题页面
const router = useRouter();
const toPost = (post: Post) => {
  router.push({
    path: `/view/post/${post.postId}`,
  });
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const doSubmit = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>
<style scoped>
#PostsView {
  margin-left: 10%;
  width: 80%;
  display: flex;
  flex-direction: column;
}
</style>
