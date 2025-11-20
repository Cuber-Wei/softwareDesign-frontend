<template>
  <div id="ViewPostsView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <div class="docArea">
          <a-card
            v-if="post"
            :bordered="false"
            :title="post.title"
            style="margin-top: 10px; height: 95%; flex: 1"
          >
            <template #extra>
              <a-space wrap>
                <a-tag
                  v-for="(item, index) of post.tag"
                  :key="index"
                  color="green"
                  >{{ item }}
                </a-tag>
              </a-space>
            </template>
            <a-row style="align-items: center">
              <a-col :span="8">
                <a-avatar :size="100">
                  <img
                    alt="avatar"
                    :src="post.user?.userAvatar"
                    v-if="post.user?.userAvatar !== ''"
                  />
                  <div v-else>
                    {{ post.user?.userName }}
                  </div>
                </a-avatar>
              </a-col>
              <a-col :span="16">
                <div class="info">帖子作者：{{ post?.user.userName }}</div>
                <div class="info">
                  提交时间：{{
                    moment(post.createTime).format("YYYY-MM-DD hh:mm")
                  }}
                </div>
                <div class="info">
                  发布时间：{{
                    moment(post.updateTime).format("YYYY-MM-DD hh:mm")
                  }}
                </div>
              </a-col>
            </a-row>
            <a-divider />
            <MdViewer :value="post.content || ' '" />
          </a-card>
        </div>
      </a-col>
      <a-col :md="12" :xs="24" class="docArea">
        <h2>评论</h2>
        <MdEditor
          :handle-change="onContentChange"
          :value="comment.content || ' '"
          class="formItem"
        />
        <a-button
          style="margin-top: 16px"
          type="primary"
          @click="doCommentSubmit"
          >提交
        </a-button>
        <a-divider />
        <CommentCard
          :post="comment"
          v-for="(comment, index) in commentList"
          :key="index"
        />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, ref, withDefaults } from "vue";
import message from "@arco-design/web-vue/es/message";
import {
  PostComment,
  PostCommentAddRequest,
  PostCommentControllerService,
  PostCommentQueryRequest,
  PostControllerService,
  PostVO,
} from "../../generated";
import MdViewer from "@/components/MdViewer.vue";
import MdEditor from "@/components/MdEditor.vue";
import CommentCard from "@/components/CommentCard.vue";
import moment from "moment/moment";

const post = ref<PostVO>();

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});
const commentSearchParams = ref({
  postId: props.id as any,
  pageSize: 10,
  current: 1,
  reviewStatus: 1, //已审核通过
} as PostCommentQueryRequest);
const commentList = ref<Array<PostComment>>();

const loadData = async () => {
  const res = await PostControllerService.getPostVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    post.value = res.data;
  } else {
    message.error("加载失败！ " + res.message);
  }

  //拿到当前帖子通过审核的题解
  // 校验分页数量
  if (
    !commentSearchParams.value.pageSize ||
    commentSearchParams.value.pageSize <= 0
  ) {
    commentSearchParams.value.pageSize = 5;
  }
  const commentRes =
    await PostCommentControllerService.listPostCommentVoByPageUsingPost(
      commentSearchParams.value
    );
  if (commentRes.code === 0) {
    commentList.value = commentRes.data.records;
  } else {
    message.error("加载失败！ " + commentRes.message);
  }
};
onMounted(() => {
  loadData();
});

const comment = ref({
  content: "# 说点什么...",
} as PostCommentAddRequest);

const onContentChange = (v: string) => {
  comment.value.content = v;
};

const doCommentSubmit = async () => {
  if (props.id !== "" && comment.value.content !== "") {
    const res = await PostCommentControllerService.addPostCommentUsingPost({
      ...comment.value,
      postId: props.id as any,
    });
    if (res.code === 0) {
      message.success("提交成功！");
    } else {
      message.error("提交失败！ " + res.message);
    }
  }
};
</script>
<style>
#ViewPostsView {
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
}

#ViewPostsView .info {
  margin-right: 6px;
  padding: 4px;
}

#ViewPostsView .docArea {
  position: relative;
  height: calc(100vh - 160px - 2rem);
  max-height: calc(100vh - 160px - 2rem);
  overscroll-behavior: contain;
  overflow: auto;
}

.formItem {
  width: 100%;
}
</style>
