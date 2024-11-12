<template>
  <div class="user-login">
    <h2 style="margin-bottom: 32px">用户信息修改</h2>
    <a-form
      :label-align="'right'"
      :layout="horizontal"
      :model="form"
      auto-label-width
      style="max-width: 480px; margin: 0 auto"
      @submit="handleSubmit"
    >
      <a-form-item
        v-if="currUser.loginUser.userRole === ACCESSENUM.ADMIN"
        field="userName"
        label="用户ID"
      >
        <a-input
          v-model="form.userId"
          :max-length="{ length: 20, errorOnly: true }"
          disabled
        >
          <template #prefix>
            <IconIdcard />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="userName" label="昵称">
        <a-input
          v-model="form.userName"
          :max-length="{ length: 20, errorOnly: true }"
        >
          <template #prefix>
            <IconUser />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="userAvatar" label="头像">
        <a-upload
          :fileList="file ? [file] : []"
          :show-file-list="false"
          action="/"
          style="height: 128px"
          @change="onChange"
          @progress="onProgress"
        >
          <template #upload-button>
            <div
              :class="`arco-upload-list-item${
                file && file.status === 'error'
                  ? ' arco-upload-list-item-error'
                  : ''
              }`"
            >
              <div
                v-if="file && file.url"
                class="arco-upload-list-picture custom-upload-avatar"
              >
                <img :src="form.userAvatar" alt="头像" />
                <div class="arco-upload-list-picture-mask">
                  <IconEdit />
                </div>
                <a-progress
                  v-if="file.status === 'uploading' && file.percent < 100"
                  :percent="file.percent"
                  :style="{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                  }"
                  size="mini"
                  type="circle"
                />
              </div>
              <div v-else class="arco-upload-picture-card">
                <div class="arco-upload-picture-card-text">
                  <div
                    style="
                      margin-top: 10px;
                      font-weight: 600;
                      width: 128px;
                      height: 128px;
                    "
                  >
                    <img
                      :src="form.userAvatar"
                      alt="头像"
                      style="width: 128px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </a-upload>
      </a-form-item>
      <a-form-item field="userProfile" label="简介">
        <a-input
          v-model="form.userProfile"
          :max-length="{ length: 50, errorOnly: true }"
          allow-clear
          show-word-limit
        >
          <template #prefix>
            <IconFile />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="userPhone" label="手机">
        <a-input
          v-model="form.userPhone"
          :max-length="{ length: 20, errorOnly: true }"
        >
          <template #prefix>
            <IconPhone />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="userMail" label="邮箱">
        <a-input
          v-model="form.userMail"
          :max-length="{ length: 20, errorOnly: true }"
        >
          <template #prefix>
            <IconEmail />
          </template>
        </a-input>
      </a-form-item>
      <!--Todo: <a-button type="primary" @click="changePassword">修改密码</a-button>-->
    </a-form>
    <a-button :size="'large'" type="primary" @click="submit">提交</a-button>
    <a-button
      :size="'large'"
      style="margin-left: 1rem"
      type="primary"
      @click="cancel"
      >返回
    </a-button>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { UserControllerService, UserVO } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  IconEmail,
  IconFile,
  IconIdcard,
  IconPhone,
  IconUser,
} from "@arco-design/web-vue/es/icon";
import ACCESSENUM from "@/access/accessEnum";

const router = useRouter();
const store = useStore();
const currUser = computed(() => {
  return store.state.user;
});
const form = ref({
  userId: "",
  userName: "",
  userAvatar:
    "https://q.qlogo.cn/headimg_dl?dst_uin=3134210778&spec=640&img_type=jpg",
  userProfile: "",
  userPhone: "",
  userMail: "",
});
//隐私处理函数
const doPrivacy = (str: string) => {
  if (str.length < 3) {
    return str;
  }
  return str.substring(0, 2) + "****" + str.substring(str.length - 2);
};
const loadData = async () => {
  const route = useRoute();
  const userId = route.params.id;
  const res = await UserControllerService.getUserVoByIdUsingGet(
    userId as string
  );
  if (res.code === 0) {
    form.value.userId = res.data?.userId;
    form.value.userName = res.data?.userName;
    form.value.userAvatar = res.data?.userAvatar;
    form.value.userProfile = res.data?.userProfile;
    // 隐私处理
    form.value.userPhone = res.data?.userPhone;
    form.value.userMail = res.data?.userMail;
    console.log(res.data);
  } else {
    message.error("加载失败！ " + res.message);
  }
};
onMounted(() => {
  loadData();
});

const file = ref();

const onChange = (_, currentFile) => {
  file.value = {
    ...currentFile,
    // url: URL.createObjectURL(currentFile.file),
  };
};
const onProgress = (currentFile) => {
  file.value = currentFile;
};
const handleSubmit = (data: UserVO) => {
  console.log(data);
};
const submit = async () => {
  let res = {};
  if (currUser.value.loginUser.userRole === "admin") {
    res = await UserControllerService.updateUserUsingPost({
      ...form.value,
    });
  } else {
    res = await UserControllerService.updateMyUserUsingPost({
      ...form.value,
    });
  }
  if (res.code === 0) {
    message.success("修改成功！");
  } else {
    message.error("修改失败！" + res.message);
  }
};
const cancel = () => {
  router.back();
};
</script>
<style></style>
