import { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFoundView from "../views/404View.vue";
import ACCESSENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import UserCenterView from "@/views/UserCenterView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserForgetView from "@/views/user/UserForgetView.vue";
import UserEditView from "@/views/user/UserEditView.vue";
import UserManageView from "@/views/user/UserManageView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";
import AddPostView from "@/views/post/AddPostView.vue";
import PostsView from "@/views/post/PostsView.vue";
import ManagePostView from "@/views/post/ManagePostView.vue";
import ViewPostView from "@/views/post/ViewPostView.vue";
import AddWriteUpView from "@/views/writeup/AddWriteUpView.vue";
import ManageWriteUpView from "@/views/writeup/ManageWriteUpView.vue";
import ReviewView from "@/views/user/ReviewView.vue";
import ViewQuestionSubmitView from "@/views/question/ViewQuestionSubmitView.vue";
import ReviewDetailView from "@/views/user/ReviewDetailView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "首页",
    component: HomeView,
    meta: {
      hideInMenu: false,
      access: ACCESSENUM.NOT_LOGIN,
    },
  },

  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    meta: {
      hideInMenu: true,
      access: ACCESSENUM.NOT_LOGIN,
    },
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
      {
        path: "/user/forget",
        name: "找回密码",
        component: UserForgetView,
      },
      {
        path: "/user/edit/:id",
        name: "用户信息修改",
        component: UserEditView,
        props: true,
      },
    ],
  },
  {
    path: "/center/:id",
    name: "用户中心",
    component: UserCenterView,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESSENUM.USER,
    },
  },
  {
    path: "/review",
    name: "审核",
    component: ReviewView,
    meta: {
      hideInMenu: false,
      access: ACCESSENUM.ADMIN,
    },
  },
  {
    path: "/questions",
    name: "题目",
    component: QuestionsView,
    meta: {
      hideInMenu: false,
      access: ACCESSENUM.USER,
    },
  },
  {
    path: "/posts",
    name: "交流",
    component: PostsView,
    meta: {
      hideInMenu: false,
      access: ACCESSENUM.USER,
    },
  },

  {
    path: "/view/question/:id",
    name: "在线做题",
    component: ViewQuestionView,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESSENUM.USER,
    },
  },
  {
    path: "/view/questionSubmit/:id",
    name: "提交详情",
    component: ViewQuestionSubmitView,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESSENUM.USER,
    },
  },
  {
    path: "/view/post/:id",
    name: "查看帖子",
    component: ViewPostView,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESSENUM.USER,
    },
  },

  {
    path: "/add/question",
    name: "发布题目",
    component: AddQuestionView,
    meta: {
      hideInMenu: false,
      access: ACCESSENUM.ADMIN,
    },
  },
  {
    path: "/add/post",
    name: "发布帖子",
    component: AddPostView,
    meta: {
      hideInMenu: false,
      access: ACCESSENUM.USER,
    },
  },
  {
    path: "/add/writeup/:id",
    name: "发布题解",
    component: AddWriteUpView,
    meta: {
      hideInMenu: true,
      access: ACCESSENUM.USER,
    },
  },

  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      hideInMenu: false,
      access: ACCESSENUM.ADMIN,
    },
  },
  {
    path: "/manage/post",
    name: "管理帖子",
    component: ManagePostView,
    meta: {
      hideInMenu: false,
      access: ACCESSENUM.ADMIN,
    },
  },
  {
    path: "/manage/writeup",
    name: "管理题解",
    component: ManageWriteUpView,
    meta: {
      hideInMenu: false,
      access: ACCESSENUM.ADMIN,
    },
  },
  {
    path: "/manage/user",
    name: "管理用户",
    component: UserManageView,
    meta: {
      access: ACCESSENUM.ADMIN,
    },
  },

  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      hideInMenu: true,
      access: ACCESSENUM.ADMIN,
    },
  },

  {
    path: "/review/post/:id",
    name: "审核帖子",
    component: ReviewDetailView,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESSENUM.ADMIN,
    },
  },
  {
    path: "/review/writeUp/:id",
    name: "审核题解",
    component: ReviewDetailView,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESSENUM.ADMIN,
    },
  },
  {
    path: "/review/postComment/:id",
    name: "审核帖子评论",
    component: ReviewDetailView,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESSENUM.ADMIN,
    },
  },

  {
    path: "/404",
    name: "404",
    component: NotFoundView,
    meta: {
      hideInMenu: true,
    },
  },

  {
    path: "/:catchAll(.*)", // 不识别的path自动匹配404
    name: "None",
    redirect: "/404",
    meta: {
      hideInMenu: true,
    },
  },
];
