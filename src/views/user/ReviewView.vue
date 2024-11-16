<template>
  <div id="reviewView">
    <h2 style="margin-bottom: 32px">审核</h2>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1">
        <template #title>
          <a-badge :count="1">
            <IconFile />
            主题帖&emsp;
          </a-badge>
        </template>
        <a-tabs class="left-tabs" default-active-key="1" direction="vertical">
          <a-tab-pane key="1">
            <template #title>
              <a-badge :count="1" class="left-tab-pane">
                <IconMessage />
                待审核&emsp;
              </a-badge>
            </template>
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
                  <a-tag
                    v-for="(item, index) of record.tag"
                    :key="index"
                    color="green"
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
                  <a-button
                    type="primary"
                    @click="router.push(`/review/post/${record.postId}`)"
                  >
                    去审核
                  </a-button>
                </a-space>
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="2" title="已审核">
            <template #title>
              <IconMessage />
              已审核&emsp;
            </template>
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
                  <a-tag
                    v-for="(item, index) of record.tag"
                    :key="index"
                    color="green"
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
                  <a-button type="primary" @click="toPost(record)"
                    >查看详情
                  </a-button>
                </a-space>
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #title>
          <a-badge :count="1">
            <IconMessage />
            评论&emsp;
          </a-badge>
        </template>
        <a-tabs class="left-tabs" default-active-key="1" direction="vertical">
          <a-tab-pane key="1">
            <template #title>
              <a-badge :count="1" class="left-tab-pane">
                <IconMessage />
                待审核&emsp;
              </a-badge>
            </template>
            待审核
          </a-tab-pane>
          <a-tab-pane key="2" title="已审核">
            <template #title>
              <IconMessage />
              已审核&emsp;
            </template>
            已审核
          </a-tab-pane>
        </a-tabs>
      </a-tab-pane>
      <a-tab-pane key="3">
        <template #title>
          <a-badge :count="1">
            <IconCodeBlock />
            题解&emsp;
          </a-badge>
        </template>
        <a-tabs class="left-tabs" default-active-key="1" direction="vertical">
          <a-tab-pane key="1">
            <template #title>
              <a-badge :count="1" class="left-tab-pane">
                <IconMessage />
                待审核&emsp;
              </a-badge>
            </template>
            待审核
          </a-tab-pane>
          <a-tab-pane key="2" title="已审核">
            <template #title>
              <IconMessage />
              已审核&emsp;
            </template>
            已审核
          </a-tab-pane>
        </a-tabs>
      </a-tab-pane>
    </a-tabs>
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
    title: "帖子ID",
    dataIndex: "postId",
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
</script>
<style scoped>
#reviewView {
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-direction: column;
}

.left-tabs {
  margin-top: 2rem;
}

.left-tab-pane {
  margin-top: 8px;
}
</style>
