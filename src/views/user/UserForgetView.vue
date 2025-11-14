<template>
  <div class="user-login">
    <h2 style="margin-bottom: 32px">找回密码</h2>
    <a-form
      ref="formRef"
      :label-align="'right'"
      :layout="horizontal"
      :model="form"
      :rules="rules"
      auto-label-width
      style="max-width: 480px; margin: 0 auto"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="用户名" tooltip="请输入用户名">
        <a-input v-model="form.userAccount" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item field="userMail" label="邮箱" tooltip="用于获取验证码">
        <a-input v-model="form.userMail" placeholder="example@mail.com">
          <template #prefix>
            <IconEmail />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="verityCode" label="验证码" tooltip="输入收到的验证码">
        <a-verification-code
          v-model="form.verityCode"
          :disabled="verityCodeProps.disabled"
          :error="verityCodeProps.error"
          style="width: 300px"
          @finish="onFinish"
        />
        <a-button style="margin-left: 16px" type="primary" @click="getCode"
          >获取验证码
        </a-button>
      </a-form-item>
      <a-form-item
        field="userPassword"
        label="新密码"
        tooltip="验证身份后解锁；密码不少于八位"
      >
        <a-input-password
          v-model="form.userPassword"
          :disabled="!verityCodeProps.disabled"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        field="checkPassword"
        label="确认密码"
        tooltip="再次输入密码以确认"
      >
        <a-input-password
          v-model="form.checkPassword"
          :disabled="!verityCodeProps.disabled"
          placeholder="请确认密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          style="width: 150px; margin: 0 auto"
          type="primary"
          >重置密码
        </a-button>
        <a-button
          style="width: 150px; margin: 0 auto"
          type="primary"
          @click="router.back()"
          >返回
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { SmsControllerService, UserControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { IconEmail } from "@arco-design/web-vue/es/icon";

const router = useRouter();
const store = useStore();
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
  userMail: "",
  verityCode: "",
} as any);
const trueCode = ref("654321");
const formRef = ref(null);
const verityCodeProps = ref({
  disabled: false,
  error: false,
  answer: "aaaaaa",
});
const getCode = async () => {
  if (!form.userMail || form.userMail === "") {
    message.error("请输入邮箱！");
  }
  const res = await SmsControllerService.sendMailForgetUsingPost(form);
  if (res.code === 0) {
    // 获取到验证码
    trueCode.value = res.data;
  }
};
const onFinish = (value: any) => {
  if (value !== trueCode.value) {
    verityCodeProps.value.error = true;
    message.error("验证码错误！");
    form.verityCode = "";
  } else {
    verityCodeProps.value.error = false;
    verityCodeProps.value.disabled = true;
  }
};
const handleSubmit = async () => {
  const redirectUrl = window.location.search;
  const res = await UserControllerService.resetPassWordUsingPost(form);
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
const rules = {
  userAccount: [
    {
      required: true,
      message: "请输入用户名！",
    },
  ],
  userPassword: [
    {
      required: true,
      message: "请输入密码！",
    },
  ],
  checkPassword: [
    {
      required: true,
      message: "请确认密码！",
    },
    {
      validator: (value: any, cb: any) => {
        if (value !== form.userPassword) {
          cb("two passwords do not match");
        } else {
          cb();
        }
      },
    },
  ],
  userMail: [
    {
      type: "email",
      required: true,
      message: "请输入邮箱！",
    },
  ],
  verityCode: [
    {
      required: true,
      message: "请输入验证码！",
    },
    {
      minLength: 6,
      message: "验证码未填完全！",
    },
    {
      match: /^\d+$/,
      message: "应为全数字！",
    },
  ],
};
</script>
