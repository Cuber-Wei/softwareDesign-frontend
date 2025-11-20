<template>
  <div id="userCenter">
    <a-layout>
      <a-layout-header>
        <a-card class="infoCard">
          <a-row class="userInfo">
            <!--头像-->
            <a-col :span="3" style="min-height: 100px">
              <div style="place-items: center; display: grid">
                <a-avatar :size="100">
                  <img :src="currUser.userAvatar" alt="avatar" />
                </a-avatar>
              </div>
            </a-col>
            <!--分割-->
            <a-col :span="1"></a-col>
            <!--用户基础信息-->
            <a-col :span="20" style="min-height: 100px">
              <!--用户名-->
              <a-row>
                <h1 class="nickName">
                  {{ currUser.userName }}
                </h1>
              </a-row>
              <!--分割-->
              <div style="margin: 16px 0"></div>
              <!--签名-->
              <a-row class="userProfile">
                <div>{{ currUser.userProfile ?? "这是默认简介" }}</div>
              </a-row>
              <!--分割-->
              <div style="margin: 16px 0"></div>
              <!--其他信息 权限角色 id-->
              <a-row>
                <a-tag bordered class="extraInfo" color="orangered"
                  >role : {{ currUser.userRole }}
                </a-tag>
                <a-tag bordered class="extraInfo" color="gray"
                  >uid : {{ currUser.userId }}
                </a-tag>
              </a-row>
            </a-col>
          </a-row>
          <!--分割-->
          <div style="margin-top: 10px"></div>
          <!--用户统计信息-->
          <a-row class="userStatistics">
            <a-col :span="12">
              <a-button class="userButton" @click="toEditDetail(currUser)"
                >修改资料
              </a-button>
              <a-button
                class="userButton"
                @click="
                  () => {
                    isMadelVisible = true;
                  }
                "
                status="danger"
                v-if="currUser?.userRole === 'user'"
                >注销账号
              </a-button>
              <a-modal
                :visible="isMadelVisible"
                @ok="deleteAccount"
                @cancel="
                  () => {
                    isMadelVisible = false;
                  }
                "
                unmountOnClose
              >
                <template #title> 危险操作！ </template>
                <div>
                  注销账号是个危险操作，注销后您将无法通过此账号进行登录！请问您是否确认注销？
                </div>
              </a-modal>
              <a-badge :count="0" v-if="currUser?.userRole === 'admin'">
                <a-button class="userButton" @click="toReview"
                  >审核事项
                </a-button>
              </a-badge>
            </a-col>
          </a-row>
        </a-card>
      </a-layout-header>
      <a-layout class="content">
        <a-layout>
          <a-layout-content class="post-show">
            <h2>我发布的</h2>
            <a-tabs default-active-key="0">
              <a-tab-pane key="0" title="帖子">
                <a-space
                  >每页帖子数量
                  <a-input-number
                    v-model="searchParams.post.pageSize"
                    min="1"
                    placeholder="每页帖子数量"
                    size="small"
                    style="width: 200px"
                  />
                </a-space>
                <a-divider :size="0"></a-divider>
                <a-table
                  :columns="postColumns"
                  :data="dataList.post"
                  :pagination="{
                    showTotal: true,
                    pageSize: searchParams.post.pageSize,
                    current: searchParams.post.current,
                    total: totalList.postTotal,
                  }"
                  @page-change="onPostPageChange"
                >
                  <template #tag="{ record }">
                    <a-space wrap>
                      <a-tag
                        v-for="(item, index) of record.tag"
                        :key="index"
                        color="green"
                        >{{ item }}</a-tag
                      >
                    </a-space>
                  </template>
                  <template #createTime="{ record }">
                    <a-space>
                      {{
                        moment(record.createTime).format("YYYY-MM-DD HH:mm:ss")
                      }}
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
                      <a-tag v-else color="gray">待审核</a-tag>
                    </a-space>
                  </template>
                  <template #optional="{ record }">
                    <a-space>
                      <a-button
                        type="primary"
                        status="danger"
                        @click="
                          () => {
                            isConfirmModalVisible = true;
                          }
                        "
                        >删除</a-button
                      >
                      <a-modal
                        :visible="isConfirmModalVisible"
                        @ok="deletePost(record)"
                        @cancel="
                          () => {
                            isConfirmModalVisible = true;
                          }
                        "
                        unmountOnClose
                      >
                        <template #title> 危险操作！ </template>
                        <div>确认删除该帖子？</div>
                      </a-modal>
                    </a-space>
                  </template>
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="1" title="评论">
                <a-space
                  >每页评论数量
                  <a-input-number
                    v-model="searchParams.postComment.pageSize"
                    min="1"
                    placeholder="每页评论数量"
                    size="small"
                    style="width: 200px"
                  />
                </a-space>
                <a-divider :size="0"></a-divider>
                <a-table
                  :columns="postCommentColumns"
                  :data="dataList.postComment"
                  :pagination="{
                    showTotal: true,
                    pageSize: searchParams.postComment.pageSize,
                    current: searchParams.postComment.current,
                    total: totalList.commentTotal,
                  }"
                  @page-change="onPostCommentPageChange"
                >
                  <template #postCommentId="{ record }">
                    <a-space wrap>
                      {{ record.postCommentId }}
                    </a-space>
                  </template>
                  <template #createTime="{ record }">
                    <a-space>
                      {{
                        moment(record.createTime).format("YYYY-MM-DD HH:mm:ss")
                      }}
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
                      <a-tag v-else color="gray">待审核</a-tag>
                    </a-space>
                  </template>
                  <template #optional="{ record }">
                    <a-space>
                      <a-button
                        type="primary"
                        status="danger"
                        @click="
                          () => {
                            isConfirmModalVisible = true;
                          }
                        "
                        >删除</a-button
                      >
                      <a-modal
                        :visible="isConfirmModalVisible"
                        @ok="deletePostComment(record)"
                        @cancel="
                          () => {
                            isConfirmModalVisible = true;
                          }
                        "
                        unmountOnClose
                      >
                        <template #title> 危险操作！ </template>
                        <div>确认删除该评论？</div>
                      </a-modal>
                    </a-space>
                  </template>
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="2" title="题解">
                <a-space
                  >每页题解数量
                  <a-input-number
                    v-model="searchParams.writeUp.pageSize"
                    min="1"
                    placeholder="每页题解数量"
                    size="small"
                    style="width: 200px"
                  />
                </a-space>
                <a-divider :size="0"></a-divider>
                <a-table
                  :columns="writeUpColumns"
                  :data="dataList.writeUp"
                  :pagination="{
                    showTotal: true,
                    pageSize: searchParams.writeUp.pageSize,
                    current: searchParams.writeUp.current,
                    total: totalList.writeUpTotal,
                  }"
                  @page-change="onWriteUpPageChange"
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
                        >{{ item }}</a-tag
                      >
                    </a-space>
                  </template>
                  <template #createTime="{ record }">
                    <a-space>
                      {{
                        moment(record.createTime).format("YYYY-MM-DD HH:mm:ss")
                      }}
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
                      <a-tag v-else color="gray">待审核</a-tag>
                    </a-space>
                  </template>
                  <template #optional="{ record }">
                    <a-space>
                      <a-button
                        type="primary"
                        status="danger"
                        @click="
                          () => {
                            isConfirmModalVisible = true;
                          }
                        "
                        >删除</a-button
                      >
                      <a-modal
                        :visible="isConfirmModalVisible"
                        @ok="deleteWriteUp(record)"
                        @cancel="
                          () => {
                            isConfirmModalVisible = true;
                          }
                        "
                        unmountOnClose
                      >
                        <template #title> 危险操作！ </template>
                        <div>确认删除该题解？</div>
                      </a-modal>
                    </a-space>
                  </template>
                </a-table>
              </a-tab-pane>
            </a-tabs>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import {
  PostCommentControllerService,
  PostCommentQueryRequest,
  PostCommentVO,
  PostControllerService,
  PostQueryRequest,
  PostVO,
  UserControllerService,
  UserVO,
  WriteUpControllerService,
  WriteUpQueryRequest,
  WriteUpVO,
} from "../generated";
import { onMounted, ref } from "vue";
import moment from "moment";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
const searchParams = ref({
  post: {
    current: 0,
    pageSize: 10,
  } as PostQueryRequest,
  postComment: {
    current: 0,
    pageSize: 10,
  } as PostCommentQueryRequest,
  writeUp: {
    current: 0,
    pageSize: 10,
  } as WriteUpQueryRequest,
});
const dataList = ref({
  post: [] as PostVO[],
  postComment: [] as PostCommentVO[],
  writeUp: [] as WriteUpVO[],
});
const totalList = ref({
  postTotal: 0,
  commentTotal: 0,
  writeUpTotal: 0,
});
// 获取用户信息并且进行处理
let currUser = ref<UserVO>({});
const loadData = async () => {
  //拿到当前用户
  const res = await UserControllerService.getUserVoByIdUsingGet(
    router.currentRoute.value.params.id as any
  );
  if (res.code === 0) {
    currUser.value = res.data as any;
  } else {
    message.error("加载失败！ " + res.message);
  }
  //获取当前用户发表过的帖子
  const postRes = await PostControllerService.listMyPostVoByPageUsingPost(
    searchParams.value.post
  );
  if (postRes.code === 0) {
    dataList.value.post = postRes.data.records as any;
    totalList.value.postTotal = postRes.data.total as any;
  } else {
    message.error("加载失败！ " + postRes.message);
  }
  //获取当前用户发表的评论
  const postCommentRes =
    await PostCommentControllerService.listMyPostCommentVoByPageUsingPost(
      searchParams.value.postComment
    );
  if (postCommentRes.code === 0) {
    dataList.value.postComment = postCommentRes.data.records as any;
    totalList.value.commentTotal = postCommentRes.data.total as any;
  } else {
    message.error("加载失败！ " + postCommentRes.message);
  }
  //获取当前用户发表的题解
  const writeUpRes =
    await WriteUpControllerService.listMyWriteUpVoByPageUsingPost(
      searchParams.value.writeUp
    );
  if (writeUpRes.code === 0) {
    dataList.value.writeUp = writeUpRes.data.records as any;
    totalList.value.writeUpTotal = writeUpRes.data.total as any;
  } else {
    message.error("加载失败！ " + writeUpRes.message);
  }
};
onMounted(() => {
  loadData();
});

const toEditDetail = (data: any) => {
  router.push({
    path: `/user/edit/${data?.userId}`,
  });
};

const isMadelVisible = ref(false);
const isConfirmModalVisible = ref(false);
const deleteAccount = async () => {
  const res = await UserControllerService.deleteUserUsingPost({
    id: currUser.value.userId as any,
  });
  if (res.code === 0) {
    message.success("账号注销成功，正在跳转到首页...");
    setTimeout(() => {
      router.push({ path: "/" });
    }, 1500);
  } else {
    message.error("账号注销失败！ " + res.message);
  }
  isConfirmModalVisible.value = false;
};
const deletePost = async (post: PostVO) => {
  const res = await PostControllerService.deletePostUsingPost({
    id: post.postId as any,
  });
  if (res.code === 0) {
    // 更新页面
    message.success("删除题解成功！");
    await loadData();
  } else {
    message.error("删除题解失败！ " + res.message);
  }
  isConfirmModalVisible.value = false;
};
const deletePostComment = async (postComment: PostCommentVO) => {
  const res = await PostCommentControllerService.deletePostCommentUsingPost({
    id: postComment.postCommentId as any,
  });
  if (res.code === 0) {
    // 更新页面
    message.success("删除题解成功！");
    await loadData();
  } else {
    message.error("删除题解失败！ " + res.message);
  }
  isConfirmModalVisible.value = false;
};
const deleteWriteUp = async (writeUp: WriteUpVO) => {
  const res = await WriteUpControllerService.deleteWriteUpUsingPost({
    id: writeUp.writeUpId as any,
  });
  if (res.code === 0) {
    // 更新页面
    message.success("删除题解成功！");
    await loadData();
  } else {
    message.error("删除题解失败！ " + res.message);
  }
  isConfirmModalVisible.value = false;
};

const toReview = () => {
  router.push({
    path: "/review",
    replace: true,
  });
};

// 表格列定义
const postColumns = [
  { title: "标题", dataIndex: "title" },
  { title: "标签", slotName: "tag" },
  { title: "发布时间", slotName: "createTime" },
  { title: "审核状态", slotName: "reviewStatus" },
  { title: "操作", slotName: "optional" },
];

const postCommentColumns = [
  { title: "内容", dataIndex: "content" },
  { title: "发布时间", slotName: "createTime" },
  { title: "审核状态", slotName: "reviewStatus" },
  { title: "操作", slotName: "optional" },
];

const writeUpColumns = [
  { title: "标题", dataIndex: "title" },
  { title: "标签", slotName: "tag" },
  { title: "发布时间", slotName: "createTime" },
  { title: "审核状态", slotName: "reviewStatus" },
  { title: "操作", slotName: "optional" },
];

// 分页处理器
const onPostPageChange = (page: number) => {
  searchParams.value.post = {
    ...searchParams.value.post,
    current: page,
  } as any;
};
const onPostCommentPageChange = (page: number) => {
  searchParams.value.postComment = {
    ...searchParams.value.postComment,
    current: page,
  } as any;
};
const onWriteUpPageChange = (page: number) => {
  searchParams.value.writeUp = {
    ...searchParams.value.writeUp,
    current: page,
  } as any;
};
</script>
<style scoped>
#userCenter {
  width: 60rem;
  margin: 0 auto;
  display: flex;
}

#userCenter .infoCard {
  height: 200px;
  border-radius: 10px;
  box-shadow: #aaa 1px 1px 5px;
  margin: 1rem 0;
}

.userInfo {
  display: flex;
  align-items: center;
  min-height: 120px;
}

.nickName {
  margin-bottom: 0;
  margin-top: 0;
  font-size: 25px;
  color: black;
}

.userProfile {
  color: #bbbbbb;
  /*background-color: #aaa;*/
  width: 50%;
}

.extraInfo {
  margin-right: 6px;
  border-radius: 4px;
}

.userStatistics {
  height: 30%;
  display: flex;
  align-items: center;
}

.userButton {
  margin: 0 0.5rem;
}

#userCenter .content {
  border-radius: 10px;
  box-shadow: #aaa 1px 1px 5px;
}

.post-show {
  padding: 16px;
  min-height: 75vh;
  flex: 1;
}
</style>
