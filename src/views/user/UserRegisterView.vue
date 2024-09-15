<template>
  <div class="user-register">
    <h2 style="margin-bottom: 32px">用户注册</h2>
    <a-form
      :label-align="'right'"
      :layout="horizontal"
      :model="form"
      auto-label-width
      style="max-width: 480px; margin: 0 auto"
      @submit="handleSubmit"
    >
      <a-form-item field="name" label="用户名" tooltip=" ">
        <a-input v-model="form.userAccount" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码" tooltip="密码不少于八位">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        field="userPassword"
        label="确认密码"
        tooltip="密码不少于八位"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请确认密码"
        />
      </a-form-item>
      <a-form-item field="isRead">
        <a-checkbox v-model="form.isRead"
          >我已阅读<a href="">用户协议</a></a-checkbox
        >
      </a-form-item>
      <a-form-item>
        <a-button @click="handleSubmit">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import {
  UserControllerService,
  type UserLoginRequest,
} from "../../../generated";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
  isRead: false,
} as UserLoginRequest);

const handleSubmit = async () => {
  if (!form.isRead) {
    message.error("请阅读下方用户协议！");
    return false;
  }
  if (form.userAccount === "" || form.userPassword === "") {
    message.error("账号或密码不能为空！");
    return false;
  }
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    // 注册成功，转到登录页
    await router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败" + res.message);
  }
};
</script>
