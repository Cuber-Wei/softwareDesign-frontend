import ACCESSENUM from "@/access/accessEnum";
import router from "@/router";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAcess";

router.beforeEach(async (to, from, next) => {
  const store = useStore();
  let loginUser = store.state.user.loginUser;
  // 无用户信息，尝试获取信息
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
  }
  //更新用户登录数据
  loginUser = store.state.user.loginUser;
  // 获取要访问的页面权限信息
  const needAccess = (to.meta?.access as string) ?? ACCESSENUM.NOT_LOGIN;
  // 要跳转的页面必须要登录
  if (needAccess !== ACCESSENUM.NOT_LOGIN) {
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESSENUM.NOT_LOGIN
    ) {
      // 未登录，跳转到登陆界面
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 已登录，鉴权
    if (!checkAccess(loginUser, needAccess)) {
      // 鉴权失败，跳转到404
      next("/404");
      return;
    }
  }
  next();
});
