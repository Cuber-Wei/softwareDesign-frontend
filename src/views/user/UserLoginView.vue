<template>
  <div id="user-login">
    <h2 style="margin-bottom: 32px">用户登录</h2>
    <a-space class="outer-tabs" direction="vertical" size="large">
      <a-tabs
        :animation="true"
        :justify="true"
        :lazy-load="true"
        default-active-key="1"
        size="large"
        trigger="hover"
        type="rounded"
      >
        <a-tab-pane key="1" class="inner-tabs" title="帐密登录">
          <a-form
            ref="formRef"
            :label-align="'right'"
            :layout="horizontal"
            :model="form"
            :rules="rules"
            auto-label-width
            style="max-width: 480px; margin: 32px auto"
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
                placeholder="请输入密码"
              >
                <template #prefix>
                  <IconLock />
                </template>
              </a-input-password>
              <a-link href="/user/forget" style="width: 100px"
                >忘记密码？
              </a-link>
            </a-form-item>
            <a-form-item>
              <a-button
                html-type="submit"
                style="width: 150px; margin: 0 auto"
                type="primary"
                >登录
              </a-button>
              <a-button
                style="width: 150px; margin: 0 auto"
                type="primary"
                @click="router.push('/')"
                >返回首页
              </a-button>
            </a-form-item>
            <div>
              未有账号？
              <a-link href="/user/register">点此注册</a-link>
              !
            </div>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" class="inner-tabs" title="验证码登录">
          <a-form
            ref="formRef"
            :label-align="'right'"
            :layout="horizontal"
            :model="form"
            :rules="rules"
            auto-label-width
            style="max-width: 480px; margin: 32px auto"
            @submit="handleSubmit"
          >
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
              tooltip="输入收到的验证码"
            >
              <a-verification-code
                v-model="form.verityCode"
                :disabled="verityCodeProps.disabled"
                :error="verityCodeProps.error"
                style="width: 300px"
                @finish="onFinish"
              />
              <a-button
                style="margin-left: 16px"
                type="primary"
                @click="getCode"
                >获取验证码
              </a-button>
            </a-form-item>
            <!--            <a-form-item-->
            <!--              field="userPhone"-->
            <!--              label="手机号"-->
            <!--              tooltip="邮箱与手机号至少必填一个"-->
            <!--            >-->
            <!--              <a-input v-model="form.userPhone" placeholder="请输入手机号">-->
            <!--                <template #prefix>-->
            <!--                  <IconPhone />-->
            <!--                  （+86）-->
            <!--                </template>-->
            <!--              </a-input>-->
            <!--            </a-form-item>-->
            <a-form-item>
              <a-button
                html-type="submit"
                style="width: 150px; margin: 0 auto"
                type="primary"
                >登录
              </a-button>
              <a-button
                style="width: 150px; margin: 0 auto"
                type="primary"
                @click="router.push('/')"
                >返回首页
              </a-button>
            </a-form-item>
            <div>
              未有账号？
              <a-link href="/user/register">点此注册</a-link>
              !
            </div>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="3" class="inner-tabs" title="微信扫码登录">
          <a-space direction="vertical" size="large" style="margin: 32px auto">
            <h3>请使用微信扫描以下二维码进行登录</h3>
            <img alt="二维码" src="@/assets/QRcode.jpg" style="width: 256px" />
          </a-space>
        </a-tab-pane>
      </a-tabs>
    </a-space>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { UserControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { IconEmail, IconLock, IconUser } from "@arco-design/web-vue/es/icon";

const router = useRouter();
const store = useStore();
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
  userMail: "",
  userPhone: "",
  verityCode: "",
} as any);

const trueCode = ref("654321");
const formRef = ref(null);
const verityCodeProps = ref({
  disabled: false,
  error: false,
  answer: "aaaaaa",
});
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
      type: "userMail",
      required: true,
      message: "请输入邮箱！",
    },
  ],
  userPhone: [
    {
      required: false,
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
<style scoped>
#user-login {
  width: 80%;
  min-height: 70vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.outer-tabs {
  width: 80%;
  margin: 1rem auto;
}

.inner-tabs {
  display: flex;
  /*min-height: 45vh;*/
  flex-direction: column;
}
</style>
