<template>
  <div class="user-login">
    <h2 style="margin-bottom: 32px">用户登录</h2>
    <a-form
      :label-align="'left'"
      :model="form"
      auto-label-width
      style="max-width: 480px; margin: 0 auto"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="用户账号" tooltip="请输入账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码" tooltip="密码不少于八位">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          style="width: 150px; margin: 0 auto"
          type="primary"
          >登录
        </a-button>
      </a-form-item>
    </a-form>
    <div>未有账号？<a href="/user/register">点此注册</a>!</div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import {
  UserControllerService,
  type UserLoginRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const handleSubmit = async () => {
  const redirectUrl = window.location.search;
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    // 登录成功跳转页面
    // 重定向
    if (redirectUrl.startsWith("?redirect=")) {
      await router.push({
        path: redirectUrl.split("?redirect=")[1],
        replace: true,
      });
    } else {
      // 主页
      await router.push({
        path: "/",
        replace: true,
      });
    }
  } else {
    message.error("登录失败" + res.message);
  }
};
</script>
