<template>
  <div id="reviewView">
    <h2 style="margin-bottom: 32px">审核</h2>
    <a-button
      type="primary"
      @click="loadData"
      style="margin-bottom: 16px; width: 100px"
      >刷新数据</a-button
    >
    <a-tabs default-active-key="0">
      <a-tab-pane key="0">
        <template #title>
          <a-badge :count="totalList.postUnaudited">
            <IconFile />
            主题帖&emsp;
          </a-badge>
        </template>
        <a-tabs class="left-tabs" default-active-key="0" direction="vertical">
          <a-tab-pane key="0">
            <template #title>
              <a-badge :count="totalList.postUnaudited" class="left-tab-pane">
                <IconMessage />
                待审核&emsp;
              </a-badge>
            </template>
            <a-space
              >每页帖子数量
              <a-input-number
                v-model="searchParams.postUnaudited.pageSize"
                min="1"
                placeholder="每页帖子数量"
                size="small"
                style="width: 200px"
              />
            </a-space>
            <a-divider :size="0"></a-divider>
            <a-table
              :columns="postColumns"
              :data="dataList.postUnaudited"
              :pagination="{
                showTotal: true,
                pageSize: searchParams.postUnaudited.pageSize,
                current: searchParams.postUnaudited.current,
                total: totalList.postUnaudited,
              }"
              @page-change="onPostUnauditedSearchParamsPageChange"
            >
              <template #postId="{ record }">
                <a-space wrap>
                  {{ record.postId }}
                </a-space>
              </template>
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
          <a-tab-pane key="1" title="已审核">
            <template #title>
              <IconMessage />
              已审核&emsp;
            </template>
            <a-space
              >每页帖子数量
              <a-input-number
                v-model="searchParams.postAudited.pageSize"
                min="1"
                placeholder="每页帖子数量"
                size="small"
                style="width: 200px"
              />
            </a-space>
            <a-divider :size="0"></a-divider>
            <a-table
              :columns="postColumns"
              :data="dataList.postAudited"
              :pagination="{
                showTotal: true,
                pageSize: searchParams.postAudited.pageSize,
                current: searchParams.postAudited.current,
                total: totalList.postAudited,
              }"
              @page-change="onPostAuditedSearchParamsPageChange"
            >
              <template #postId="{ record }">
                <a-space wrap>
                  {{ record.postId }}
                </a-space>
              </template>
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
              <template #createTime="{ record }">
                <a-space>
                  {{ moment(record.createTime).format("YYYY-MM-DD-HH:MM:SS") }}
                </a-space>
              </template>
              <template #reviewStatus="{ record }">
                <a-space>
                  <a-tag v-if="record.reviewStatus === 1" color="green"
                    >已通过</a-tag
                  >
                  <a-tag v-else-if="record.reviewStatus === 2" color="red"
                    >已退回</a-tag
                  >
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
      <a-tab-pane key="1">
        <template #title>
          <a-badge :count="totalList.postCommentUnaudited">
            <IconMessage />
            评论&emsp;
          </a-badge>
        </template>
        <a-tabs class="left-tabs" default-active-key="0" direction="vertical">
          <a-tab-pane key="0">
            <template #title>
              <a-badge
                :count="totalList.postCommentUnaudited"
                class="left-tab-pane"
              >
                <IconMessage />
                待审核
              </a-badge>
            </template>
            <a-space
              >每页评论数量
              <a-input-number
                v-model="searchParams.postCommentUnaudited.pageSize"
                min="1"
                placeholder="每页评论数量"
                size="small"
                style="width: 200px"
              />
            </a-space>
            <a-divider :size="0"></a-divider>
            <a-table
              :columns="postCommentColumns"
              :data="dataList.postCommentUnaudited"
              :pagination="{
                showTotal: true,
                pageSize: searchParams.postCommentUnaudited.pageSize,
                current: searchParams.postCommentUnaudited.current,
                total: totalList.postCommentUnaudited,
              }"
              @page-change="onPostCommentUnauditedSearchParamsPageChange"
            >
              <template #postCommentId="{ record }">
                <a-space wrap>
                  {{ record.postCommentId }}
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
                    @click="
                      router.push(`/review/postComment/${record.postCommentId}`)
                    "
                  >
                    去审核
                  </a-button>
                </a-space>
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="1" title="已审核">
            <template #title>
              <IconMessage />
              已审核&emsp;
            </template>
            <a-space
              >每页评论数量
              <a-input-number
                v-model="searchParams.postCommentAudited.pageSize"
                min="1"
                placeholder="每页评论数量"
                size="small"
                style="width: 200px"
              />
            </a-space>
            <a-divider :size="0"></a-divider>
            <a-table
              :columns="postCommentColumns"
              :data="dataList.postCommentAudited"
              :pagination="{
                showTotal: true,
                pageSize: searchParams.postCommentAudited.pageSize,
                current: searchParams.postCommentAudited.current,
                total: totalList.postCommentAudited,
              }"
              @page-change="onPostCommentAuditedSearchParamsPageChange"
            >
              <template #postCommentId="{ record }">
                <a-space wrap>
                  {{ record.postCommentId }}
                </a-space>
              </template>
              <template #createTime="{ record }">
                <a-space>
                  {{ moment(record.createTime).format("YYYY-MM-DD-HH:MM:SS") }}
                </a-space>
              </template>
              <template #reviewStatus="{ record }">
                <a-space>
                  <a-tag v-if="record.reviewStatus === 1" color="green"
                    >已通过</a-tag
                  >
                  <a-tag v-else-if="record.reviewStatus === 2" color="red"
                    >已退回</a-tag
                  >
                </a-space>
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #title>
          <a-badge :count="totalList.writeUpUnaudited">
            <IconCodeBlock />
            题解&emsp;
          </a-badge>
        </template>
        <a-tabs class="left-tabs" default-active-key="0" direction="vertical">
          <a-tab-pane key="0">
            <template #title>
              <a-badge
                :count="totalList.writeUpUnaudited"
                class="left-tab-pane"
              >
                <IconMessage />
                待审核&emsp;
              </a-badge>
            </template>
            <a-space
              >每页题解数量
              <a-input-number
                v-model="searchParams.writeUpUnaudited.pageSize"
                min="1"
                placeholder="每页题解数量"
                size="small"
                style="width: 200px"
              />
            </a-space>
            <a-divider :size="0"></a-divider>
            <a-table
              :columns="writeUpColumns"
              :data="dataList.writeUpUnaudited"
              :pagination="{
                showTotal: true,
                pageSize: searchParams.writeUpUnaudited.pageSize,
                current: searchParams.writeUpUnaudited.current,
                total: totalList.writeUpUnaudited,
              }"
              @page-change="onWriteUpUnauditedSearchParamsPageChange"
            >
              <template #writeUpId="{ record }">
                <a-space wrap>
                  {{ record.writeUpId }}
                </a-space>
              </template>
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
              <template #createTime="{ record }">
                <a-space>
                  {{ moment(record.createTime).format("YYYY-MM-DD-HH:MM:SS") }}
                </a-space>
              </template>
              <template #optional="{ record }">
                <a-space>
                  <a-button
                    type="primary"
                    @click="router.push(`/review/writeUp/${record.writeUpId}`)"
                  >
                    去审核
                  </a-button>
                </a-space>
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="1" title="已审核">
            <template #title>
              <IconMessage />
              已审核&emsp;
            </template>
            <a-space
              >每页题解数量
              <a-input-number
                v-model="searchParams.writeUpAudited.pageSize"
                min="1"
                placeholder="每页题解数量"
                size="small"
                style="width: 200px"
              />
            </a-space>
            <a-divider :size="0"></a-divider>
            <a-table
              :columns="writeUpColumns"
              :data="dataList.writeUpAudited"
              :pagination="{
                showTotal: true,
                pageSize: searchParams.writeUpAudited.pageSize,
                current: searchParams.writeUpAudited.current,
                total: totalList.writeUpAudited,
              }"
              @page-change="onWriteUpAuditedSearchParamsPageChange"
            >
              <template #writeUpId="{ record }">
                <a-space wrap>
                  {{ record.writeUpId }}
                </a-space>
              </template>
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
              <template #createTime="{ record }">
                <a-space>
                  {{ moment(record.createTime).format("YYYY-MM-DD-HH:MM:SS") }}
                </a-space>
              </template>
              <template #reviewStatus="{ record }">
                <a-space>
                  <a-tag v-if="record.reviewStatus === 1" color="green"
                    >已通过</a-tag
                  >
                  <a-tag v-else-if="record.reviewStatus === 2" color="red"
                    >已退回</a-tag
                  >
                </a-space>
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import {
  Post,
  PostCommentControllerService,
  PostControllerService,
  WriteUpControllerService,
} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const dataList = ref({
  postUnaudited: [],
  postAudited: [],
  postCommentUnaudited: [],
  postCommentAudited: [],
  writeUpUnaudited: [],
  writeUpAudited: [],
});
const totalList = ref({
  postUnaudited: 0,
  postAudited: 0,
  postCommentUnaudited: 0,
  postCommentAudited: 0,
  writeUpUnaudited: 0,
  writeUpAudited: 0,
});
const searchParams = ref({
  postUnaudited: {
    pageSize: 10,
    current: 1,
    title: "",
    tag: [],
    reviewStatus: 0,
  },
  postAudited: {
    pageSize: 10,
    current: 1,
    title: "",
    tag: [],
    notReviewStatus: 0,
  },
  postCommentUnaudited: {
    pageSize: 10,
    current: 1,
    title: "",
    reviewStatus: 0,
  },
  postCommentAudited: {
    pageSize: 10,
    current: 1,
    title: "",
    notReviewStatus: 0,
  },
  writeUpUnaudited: {
    pageSize: 10,
    current: 1,
    title: "",
    tag: [],
    reviewStatus: 0,
  },
  writeUpAudited: {
    pageSize: 10,
    current: 1,
    title: "",
    tag: [],
    notReviewStatus: 0,
  },
});

const loadData = async () => {
  // 校验分页数量
  if (
    !searchParams.value.postUnaudited.pageSize ||
    searchParams.value.postUnaudited.pageSize <= 0
  ) {
    searchParams.value.postUnaudited.pageSize = 5;
  }
  let res = await PostControllerService.listPostVoByPageUsingPost(
    searchParams.value.postUnaudited
  );
  if (res.code === 0) {
    dataList.value.postUnaudited = res.data.records;
    totalList.value.postUnaudited = res.data.total;
  } else {
    message.error("加载数据失败！ " + res.message);
  }
  // 校验分页数量
  if (
    !searchParams.value.postAudited.pageSize ||
    searchParams.value.postAudited.pageSize <= 0
  ) {
    searchParams.value.postAudited.pageSize = 5;
  }
  res = await PostControllerService.listPostVoByPageUsingPost(
    searchParams.value.postAudited
  );
  if (res.code === 0) {
    dataList.value.postAudited = res.data.records;
    totalList.value.postAudited = res.data.total;
  } else {
    message.error("加载数据失败！ " + res.message);
  }

  // 校验分页数量
  if (
    !searchParams.value.postCommentUnaudited.pageSize ||
    searchParams.value.postCommentUnaudited.pageSize <= 0
  ) {
    searchParams.value.postCommentUnaudited.pageSize = 5;
  }
  res = await PostCommentControllerService.listPostCommentVoByPageUsingPost(
    searchParams.value.postCommentUnaudited
  );
  if (res.code === 0) {
    dataList.value.postCommentUnaudited = res.data.records;
    totalList.value.postCommentUnaudited = res.data.total;
  } else {
    message.error("加载数据失败！ " + res.message);
  }
  // 校验分页数量
  if (
    !searchParams.value.postCommentUnaudited.pageSize ||
    searchParams.value.postCommentUnaudited.pageSize <= 0
  ) {
    searchParams.value.postCommentUnaudited.pageSize = 5;
  }
  res = await PostCommentControllerService.listPostCommentVoByPageUsingPost(
    searchParams.value.postCommentUnaudited
  );
  if (res.code === 0) {
    dataList.value.postCommentAudited = res.data.records;
    totalList.value.postCommentAudited = res.data.total;
  } else {
    message.error("加载数据失败！ " + res.message);
  }

  // 校验分页数量
  if (
    !searchParams.value.writeUpUnaudited.pageSize ||
    searchParams.value.writeUpUnaudited.pageSize <= 0
  ) {
    searchParams.value.writeUpUnaudited.pageSize = 5;
  }
  res = await WriteUpControllerService.listWriteUpVoByPageUsingPost(
    searchParams.value.writeUpUnaudited
  );
  if (res.code === 0) {
    dataList.value.writeUpUnaudited = res.data.records;
    totalList.value.writeUpUnaudited = res.data.total;
  } else {
    message.error("加载数据失败！ " + res.message);
  }
  // 校验分页数量
  if (
    !searchParams.value.writeUpAudited.pageSize ||
    searchParams.value.writeUpAudited.pageSize <= 0
  ) {
    searchParams.value.writeUpAudited.pageSize = 5;
  }
  res = await WriteUpControllerService.listWriteUpVoByPageUsingPost(
    searchParams.value.writeUpAudited
  );
  if (res.code === 0) {
    dataList.value.writeUpAudited = res.data.records;
    totalList.value.writeUpAudited = res.data.total;
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

const postColumns = [
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
    title: "审核结果",
    slotName: "reviewStatus",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
// 跳转到帖子详情页面
const router = useRouter();
const toPost = (post: Post) => {
  router.push({
    path: `/view/post/${post.postId}`,
  });
};

const onPostUnauditedSearchParamsPageChange = (page: number) => {
  searchParams.value.postUnaudited = {
    ...searchParams.value.postUnaudited,
    current: page,
  };
};
const onPostAuditedSearchParamsPageChange = (page: number) => {
  searchParams.value.postAudited = {
    ...searchParams.value.postAudited,
    current: page,
  };
};

const postCommentColumns = [
  {
    title: "评论ID",
    dataIndex: "postCommentId",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "发布时间",
    slotName: "createTime",
  },
  {
    title: "审核结果",
    slotName: "reviewStatus",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
const onPostCommentUnauditedSearchParamsPageChange = (page: number) => {
  searchParams.value.postCommentUnaudited = {
    ...searchParams.value.postCommentUnaudited,
    current: page,
  };
};
const onPostCommentAuditedSearchParamsPageChange = (page: number) => {
  searchParams.value.postCommentAudited = {
    ...searchParams.value.postCommentAudited,
    current: page,
  };
};

const writeUpColumns = [
  {
    title: "题解ID",
    dataIndex: "writeUpId",
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
    title: "审核结果",
    slotName: "reviewStatus",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const onWriteUpUnauditedSearchParamsPageChange = (page: number) => {
  searchParams.value.writeUpUnaudited = {
    ...searchParams.value.writeUpUnaudited,
    current: page,
  };
};
const onWriteUpAuditedSearchParamsPageChange = (page: number) => {
  searchParams.value.writeUpAudited = {
    ...searchParams.value.writeUpAudited,
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
