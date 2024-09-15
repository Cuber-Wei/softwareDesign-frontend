// initial state
import { StoreOptions } from "vuex";
import ACCESSENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";
// getters
const getters = {};

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  getters,
  actions: {
    //登录，修改信息
    async getLoginUser({ commit, state }) {
      //从远程请求登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESSENUM.NOT_LOGIN,
        });
      }
    },
    //登出
    async logoutUser({ commit, state }) {
      // 后端登出
      const res = await UserControllerService.userLogoutUsingPost();
      if (res.code === 0) {
        commit("logoutUser");
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
    logoutUser(state) {
      state.loginUser = {
        userName: "未登录",
        userRole: ACCESSENUM.NOT_LOGIN,
      };
    },
  },
} as StoreOptions<any>;
