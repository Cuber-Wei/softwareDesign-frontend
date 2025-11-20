<template>
  <div id="AddPostView">
    <h1>发布帖子</h1>
    <a-form :model="post" label-align="left" @submit="handleSubmit">
      <a-form-item field="title" label="标题">
        <a-input
          v-model="post.title"
          class="formItem"
          placeholder="请输入标题"
        />
      </a-form-item>
      <a-form-item field="content" label="帖子正文">
        <MdEditor
          :handle-change="onContentChange"
          :value="post.content"
          class="formItem"
        />
      </a-form-item>
      <a-form-item field="tag" label="标签">
        <a-input-tag
          v-model="post.tag"
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
import { PostAddRequest, PostControllerService } from "../../generated";
import { useRoute } from "vue-router";

const post = ref({
  title: "",
  content: "",
  tag: ["简单"] as string[],
} as PostAddRequest);

const route = useRoute();

const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res: any = await PostControllerService.getPostVoByIdUsingGet(id as any);
  if (res.code === 0) {
    post.value = res.data;
    if (!post.value.tag) {
      post.value.tag = ["简单"];
    } else {
      post.value.tag = JSON.parse(res.data.tag);
    }
  } else {
    message.error("加载失败！ " + res.message);
  }
};
onMounted(() => {
  loadData();
});

const onContentChange = (v: string) => {
  post.value.content = v;
};

const handleSubmit = async () => {
  const res = await PostControllerService.addPostUsingPost(post.value);
  if (res.code === 0) {
    message.success("创建帖子成功！");
  } else {
    message.error("创建帖子失败 " + res.message);
  }
};
</script>
<style scoped>
#AddPostView {
  margin-left: 10%;
  width: 80%;
  display: flex;
  flex-direction: column;
}

#AddPostView .formItem {
  width: 100%;
}
</style>
