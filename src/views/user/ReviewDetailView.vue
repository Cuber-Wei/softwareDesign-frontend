<template>
  <div class="reviewDetailView">
    <h2 style="margin-bottom: 32px">详情</h2>
    <a-form label-align="right">
      <a-form-item field="id" label="ID">
        <a-input :placeholder="id" class="formItem" disabled />
      </a-form-item>
      <a-form-item field="title" label="标题">
        <a-input
          :placeholder="data?.title ?? '帖子评论无标题'"
          class="formItem"
        />
      </a-form-item>
      <a-form-item field="content" label="内容">
        <MdViewer :value="data?.content" class="formItem" />
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          style="width: 150px; margin: 0 auto"
          type="primary"
          @click="doAuditPass"
          >审核通过
        </a-button>
        <a-button
          html-type="submit"
          style="width: 150px; margin: 0 auto"
          type="primary"
          @click="doAuditFailed"
          >退回
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import message from "@arco-design/web-vue/es/message";
import {
  AuditControllerService,
  AuditRequest,
  PostCommentControllerService,
  PostCommentVO,
  PostControllerService,
  PostVO,
  WriteUpControllerService,
  WriteUpVO,
} from "../../generated";
import { useRoute } from "vue-router";
import MdViewer from "@/components/MdViewer.vue";

const data = ref<PostVO | PostCommentVO | WriteUpVO>();
const route = useRoute();
// 获取router的参数
const id = route.params.id as string;
let type = "";
let typeNum = 0;
if (route.path.startsWith("/review/")) type = route.path.slice(8, -1);
if (type.startsWith("postComment")) {
  typeNum = 1;
} else if (type.startsWith("post")) {
  typeNum = 0;
} else if (type.startsWith("writeUp")) {
  typeNum = 2;
} else {
  message.error("审核项目不在审核范围内！");
}

const loadData = async () => {
  switch (typeNum) {
    case 0: {
      const res = await PostControllerService.getPostVoByIdUsingGet(id as any);
      if (res.code === 0) {
        data.value = res.data;
      } else {
        message.error("加载失败！ " + res.message);
      }
      break;
    }
    case 1: {
      const res =
        await PostCommentControllerService.getPostCommentVoByIdUsingGet(
          id as any
        );
      if (res.code === 0) {
        data.value = res.data;
      } else {
        message.error("加载失败！ " + res.message);
      }
      break;
    }
    case 2: {
      const res = await WriteUpControllerService.getWriteUpVoByIdUsingGet(
        id as any
      );
      if (res.code === 0) {
        data.value = res.data;
      } else {
        message.error("加载失败！ " + res.message);
      }
      break;
    }
    default:
      message.error("审核项目不在审核范围内！");
  }
};
onMounted(() => {
  loadData();
});
const auditAction = ref<AuditRequest>({
  id: id as any,
  type: typeNum,
});
const doAuditPass = async () => {
  const res = await AuditControllerService.doAuditUsingPost({
    ...auditAction.value,
    operation: 1,
  });
  if (res.code === 0) {
    message.success("提交成功！");
  } else {
    message.error("加载失败！ " + res.message);
  }
};
const doAuditFailed = async () => {
  const res = await AuditControllerService.doAuditUsingPost({
    ...auditAction.value,
    operation: 2,
  });
  if (res.code === 0) {
    message.success("提交成功！");
  } else {
    message.error("加载失败！ " + res.message);
  }
};
</script>
<style scoped>
.reviewDetailView {
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-direction: column;
}

.formItem {
  width: 100%;
}
</style>
