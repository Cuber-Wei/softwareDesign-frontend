<template>
  <div id="userCenter">
    <a-layout>
      <a-layout-header>
        <a-card class="infoCard">
          <a-row class="userInfo">
            <!--头像-->
            <a-col :span="3" style="min-height: 100px">
              <div style="place-items: center; display: grid">
                <a-avatar :size="100">
                  <img :src="currUser.userAvatar" alt="avatar" />
                </a-avatar>
              </div>
            </a-col>
            <!--分割-->
            <a-col :span="1"></a-col>
            <!--用户基础信息-->
            <a-col :span="20" style="min-height: 100px">
              <!--用户名-->
              <a-row>
                <h1 class="nickName">
                  {{ currUser.userName }}
                </h1>
              </a-row>
              <!--分割-->
              <div style="margin: 16px 0"></div>
              <!--签名-->
              <a-row class="userProfile">
                <div>{{ currUser.userProfile ?? "这是默认简介" }}</div>
              </a-row>
              <!--分割-->
              <div style="margin: 16px 0"></div>
              <!--其他信息 权限角色 id-->
              <a-row>
                <a-tag bordered class="extraInfo" color="orangered"
                  >role : {{ currUser.userRole }}
                </a-tag>
                <a-tag bordered class="extraInfo" color="gray"
                  >uid : {{ currUser.userId }}
                </a-tag>
              </a-row>
            </a-col>
          </a-row>
          <!--分割-->
          <div style="margin-top: 10px"></div>
          <!--用户统计信息-->
          <a-row class="userStatistics">
            <a-col :span="12">
              <a-button class="userButton" @click="toEditDetail(currUser)"
                >修改资料
              </a-button>
              <a-badge :count="9">
                <a-button class="userButton" @click="toReview"
                  >审核事项
                </a-button>
              </a-badge>
            </a-col>
          </a-row>
        </a-card>
      </a-layout-header>
      <a-layout class="content">
        <a-layout>
          <a-layout-content class="post-show">
            <h2>帖子展示页</h2>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { UserControllerService, UserVO } from "../generated";
import { onMounted, ref } from "vue";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();

// 获取用户信息并且进行处理
let currUser = ref<UserVO>({});
const loadData = async () => {
  //拿到当前用户
  const res = await UserControllerService.getUserVoByIdUsingGet(
    router.currentRoute.value.params.id as any
  );
  if (res.code === 0) {
    currUser.value = res.data as any;
  } else {
    message.error("加载失败！ " + res.message);
  }
};
onMounted(() => {
  loadData();
});

const toEditDetail = (data: any) => {
  router.push({
    path: `/user/edit/${data?.userId}`,
  });
};
const toReview = () => {
  router.push({
    path: "/review",
    replace: true,
  });
};
</script>
<style scoped>
#userCenter {
  width: 60rem;
  margin: 0 auto;
  display: flex;
}

#userCenter .infoCard {
  height: 200px;
  border-radius: 10px;
  box-shadow: #aaa 1px 1px 5px;
  margin: 1rem 0;
}

.userInfo {
  display: flex;
  align-items: center;
  min-height: 120px;
}

.nickName {
  margin-bottom: 0;
  margin-top: 0;
  font-size: 25px;
  color: black;
}

.userProfile {
  color: #bbbbbb;
  /*background-color: #aaa;*/
  width: 50%;
}

.extraInfo {
  margin-right: 6px;
  border-radius: 4px;
}

.userStatistics {
  height: 30%;
  display: flex;
  align-items: center;
}

.userButton {
  margin: 0 0.5rem;
}

#userCenter .content {
  border-radius: 10px;
  box-shadow: #aaa 1px 1px 5px;
}

.post-show {
  padding: 16px;
  min-height: 75vh;
  flex: 1;
}
</style>
