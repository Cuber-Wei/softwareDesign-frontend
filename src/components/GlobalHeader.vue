<template>
  <a-row
    id="globalHeader"
    :wrap="false"
    align="center"
    style="margin-bottom: 16px"
  >
    <a-col flex="auto">
      <div>
        <a-menu
          :selected-keys="selectedKeys"
          mode="horizontal"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img alt="oj-logo" class="logo" src="../assets/oj-logo.gif" />
              <div class="title">My OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRoutes" :key="item.path"
            >{{ item.name }}
          </a-menu-item>
        </a-menu>
      </div>
    </a-col>
    <a-col flex="100px">
      <a-dropdown @select="handleSelect">
        <a-button
          >{{ store.state.user?.loginUser?.userName ?? "未登录" }}
        </a-button>
        <template #content>
          <a-doption v-if="showName === '未登录'" @click="toLogin"
            >登录
          </a-doption>
          <a-doption v-if="showName !== '未登录'" @click="logOut"
            >退出登录
          </a-doption>
          <a-doption v-if="showName !== '未登录'" @click="toCenter"
            >用户中心
          </a-doption>
        </template>
      </a-dropdown>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAcess";

const store = useStore();
// 路由
const router = useRouter();
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    //是否在菜单中可见
    if (item.meta?.hideInMenu) return false;
    //鉴权
    if (!checkAccess(store.state.user.loginUser, item?.meta?.access))
      return false;
    return true;
  });
});
const selectedKeys = ref(["/"]); //默认是主页
// 路由跳转时更新选中菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({ path: key });
};

// 用户栏
const showName = computed(() => {
  return store.state.user?.loginUser?.userName ?? "未登录";
});
const toLogin = () => {
  const name = store.state.user?.loginUser?.userName;
  if (name == "未登录") {
    router.push({ path: "/user/login", replace: true });
  }
};
const logOut = () => {
  store.dispatch("user/logoutUser");
};
const toCenter = () => {
  router.push({ path: "/center", replace: true });
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 58px;
}

.title {
  color: #444;
  margin-left: 16px;
}
</style>
