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
          @menu-item-click="toPath"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img alt="oj-logo" class="logo" src="../assets/oj-logo.jpg" />
              <div class="title">My OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRoutes" :key="item.path"
            >{{ item.name }}
          </a-menu-item>
          <a-dropdown v-if="userRole === 'admin' || userRole === 'user'">
            <a-button
              :style="{ color: isSelectedCreate ? '#165dff' : '#4e5969' }"
              type="text"
            >
              发布
            </a-button>
            <template #content>
              <a-doption
                v-for="item in createMenu"
                :key="item.path"
                @click="toPath(item.path)"
                >{{ item.name }}
              </a-doption>
            </template>
          </a-dropdown>
          <a-dropdown v-if="userRole === 'admin'">
            <a-button
              :style="{ color: isSelectedManage ? '#165dff' : '#4e5969' }"
              type="text"
            >
              管理
            </a-button>
            <template #content>
              <a-doption
                v-for="item in manageMenu"
                :key="item.path"
                @click="toPath(item.path)"
                >{{ item.name }}
              </a-doption>
            </template>
          </a-dropdown>
        </a-menu>
      </div>
    </a-col>
    <a-col flex="250px">
      <a-link href="/user/register" style="margin-right: 32px">注册账号</a-link>
      <a-dropdown :trigger="'hover'">
        <a-avatar
          :style="{
            backgroundColor:
              showName === '未登录'
                ? '#c9cdd4'
                : showName === 'admin'
                ? '#00d0b6'
                : '#14a9f8',
          }"
        >
          {{ showName }}
        </a-avatar>
        <template #content>
          <a-doption v-if="showName === '未登录'" @click="toLogin"
            >登录
          </a-doption>
          <a-doption v-if="showName !== '未登录'" @click="logOut"
            >退出登录
          </a-doption>
          <a-doption
            v-if="showName !== '未登录'"
            @click="toPath(`/center/${userId}`)"
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
  return routes.filter((item) => {
    //是否在菜单中可见及剔除管理、发布菜单
    if (
      item.meta?.hideInMenu ||
      item.name?.slice(0, 2) === "管理" ||
      item.name?.slice(0, 2) === "发布"
    )
      return false;
    //鉴权
    return checkAccess(
      store.state.user.loginUser,
      item?.meta?.access as string
    );
  });
});
const manageMenu = computed(() => {
  return routes.filter((item) => {
    //是否以管理开头
    return (
      item.name?.startsWith("管理") &&
      !item.meta?.hideInMenu &&
      checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    );
  });
});
const createMenu = computed(() => {
  return routes.filter((item) => {
    //是否以发布开头
    return (
      item.name?.startsWith("发布") &&
      !item.meta?.hideInMenu &&
      checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    );
  });
});
const isSelectedCreate = ref(false);
const isSelectedManage = ref(false);
const selectedKeys = ref(["/"]); //默认是主页
//路由跳转时更新选中菜单项
router.afterEach((to) => {
  selectedKeys.value = [to.path];
  isSelectedManage.value = to.path.startsWith("/manage");
  isSelectedCreate.value = to.path.startsWith("/add");
});
const toPath = (toPath: string) => {
  router.push({ path: toPath });
};

//用户栏
const showName = computed(() => {
  return store.state.user?.loginUser?.userName ?? "未登录";
});
const userRole = computed(() => {
  return store.state.user?.loginUser?.userRole ?? "user";
});
const userId = computed(() => {
  return store.state.user?.loginUser?.userId ?? -1;
});
const toLogin = () => {
  if (showName.value === "未登录") {
    router.push({ path: "/user/login", replace: true });
  }
};
const logOut = () => {
  store.dispatch("user/logoutUser");
  router.push({ path: "/", replace: true });
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
}

.title {
  color: #444;
  margin-left: 16px;
}
</style>
