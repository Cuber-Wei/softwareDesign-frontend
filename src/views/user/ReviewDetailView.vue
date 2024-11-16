<template>
  <div class="reviewDetailView">
    <h2 style="margin-bottom: 32px">详情</h2>
    <a-form label-align="right" @submit="handleSubmit">
      <a-form-item field="id" label="ID">
        <a-input :placeholder="post?.postId" class="formItem" disabled />
      </a-form-item>
      <a-form-item field="title" label="标题">
        <a-input :placeholder="post?.title" class="formItem" />
      </a-form-item>
      <a-form-item field="content" label="内容">
        <MdViewer :value="post?.content" class="formItem" />
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          style="width: 150px; margin: 0 auto"
          type="primary"
          @click="doSubmit"
          >审核通过
        </a-button>
        <a-button
          html-type="submit"
          style="width: 150px; margin: 0 auto"
          type="primary"
          @click="doSubmit"
          >退回
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import message from "@arco-design/web-vue/es/message";
import { PostControllerService, PostVO } from "../../../generated";
import { useRoute } from "vue-router";
import MdViewer from "@/components/MdViewer.vue";

const post = ref<PostVO>();

const loadData = async () => {
  const route = useRoute();
  // 获取router的参数
  const id = route.params.id as string;
  const res = await PostControllerService.getPostVoByIdUsingGet(id as any);
  if (res.code === 0) {
    post.value = res.data;
    console.log(post.value);
  } else {
    message.error("加载失败！ " + res.message);
  }
};
onMounted(() => {
  loadData();
});
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
