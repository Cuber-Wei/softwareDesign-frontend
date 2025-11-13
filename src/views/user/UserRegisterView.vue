<template>
  <div class="user-register">
    <h2 style="margin-bottom: 32px">用户注册</h2>
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
      <a-form-item
        field="userAccount"
        label="用户名"
        tooltip="用户名长度应不小于2"
        validate-trigger="blur"
      >
        <a-input
          v-model="form.userAccount"
          :max-length="{ length: 20, errorOnly: true }"
          allow-clear
          placeholder="请输入用户名"
          show-word-limit
        >
          <template #prefix>
            <IconUser />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="userPassword"
        label="密码"
        tooltip="密码长度应不小于8"
        validate-trigger="blur"
      >
        <a-input-password
          v-model="form.userPassword"
          allow-clear
          placeholder="请输入密码，长度应不小于8"
        >
          <template #prefix>
            <IconLock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="checkPassword"
        label="确认密码"
        tooltip="请重复输入密码加以确认"
        validate-trigger="blur"
      >
        <a-input-password
          v-model="form.checkPassword"
          allow-clear
          placeholder="确认密码"
        >
          <template #prefix>
            <IconLock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item field="userMail" label="邮箱" tooltip="用于获取验证码">
        <a-input v-model="form.userMail" placeholder="example@mail.com">
          <template #prefix>
            <IconEmail />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="verityCode"
        label="验证码"
        tooltip="输入邮箱收到的验证码"
      >
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
        field="userPhone"
        label="手机号"
        tooltip="用于辅助登录和找回密码"
      >
        <a-input v-model="form.userPhone" placeholder="请输入手机号">
          <template #prefix>
            <IconPhone />
            （+86）
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="isRead">
        <a-checkbox v-model="form.isRead"
          >我已阅读并同意<a href="">用户协议</a></a-checkbox
        >
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          style="width: 150px; margin: 0 auto"
          type="primary"
          >注册
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
import { useRouter } from "vue-router";
import { SmsControllerService, UserControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import {
  IconEmail,
  IconLock,
  IconPhone,
  IconUser,
} from "@arco-design/web-vue/es/icon";

const verityCodeProps = ref({
  disabled: false,
  error: false,
  answer: "aaaaaa",
});
const trueCode = ref("654321");
const formRef = ref(null);
const router = useRouter();
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
  userMail: "",
  userPhone: "",
  verityCode: "",
  isRead: false,
} as any);
const getCode = async () => {
  if (!form.userMail || form.userMail === "") {
    message.error("请输入邮箱！");
  }
  const res = await SmsControllerService.sendMailRegisterUsingPost(form);
  if (res.code === 0) {
    // 获取到验证码
    trueCode.value = res.data;
    console.log(trueCode.value);
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
  if (!form.isRead) {
    message.error("请阅读并同意下方用户协议！");
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
  userPhone: [
    {
      required: true,
      message: "请输入手机号！",
    },
    {
      validator: (value: any, cb: any) => {
        if (/^1([3456789])\d{9}$/.test(value)) {
          return true;
        } else {
          cb("手机格式不正确");
          return false;
        }
      },
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
