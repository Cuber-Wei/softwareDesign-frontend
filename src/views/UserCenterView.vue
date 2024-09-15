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
                  <img alt="avatar" src="../assets/test-avatar.jpg" />
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
                  {{ showData.userName }}
                </h1>
              </a-row>
              <!--分割-->
              <div style="margin: 16px 0"></div>
              <!--签名-->
              <a-row class="userProfile">
                <div>{{ showData.userProfile }}</div>
              </a-row>
              <!--分割-->
              <div style="margin: 16px 0"></div>
              <!--其他信息 权限角色 id-->
              <a-row>
                <div class="extraInfo">{{ showData.userRole }}</div>
                <div class="extraInfo">uid:{{ showData.userId }}</div>
              </a-row>
            </a-col>
          </a-row>
          <!--分割-->
          <div style="margin-top: 10px"></div>
          <!--用户统计信息-->
          <a-row class="userStatistics">
            <a-col :span="12">
              <a-button>发布帖子</a-button>
              <a-button>修改资料</a-button>
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
<script lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { UserControllerService } from "../../generated";
import { ref } from "vue";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    // 获取用户信息并且进行处理
    let showData = ref({});
    UserControllerService.getLoginUserUsingGet()
      .then((res) => {
        if (res.code === 0) {
          showData.value = {
            userName: res.data?.userName,
            userAvatar: res.data?.userAvatar ?? "oj-logo.gif",
            userProfile: res.data?.userProfile ?? "这是默认签名",
            userRole: res.data?.userRole,
            userId: res.data?.id,
          };
        } else {
          showData.value = {
            userName: "未登录",
            userAvatar: "oj-logo.gif",
            userProfile: "这是默认签名",
            userRole: "未登录",
            userId: -1,
          };
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return {
      router,
      store,
      showData,
    };
  },
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
  //background-color: #aaa;
  width: 50%;
}

.extraInfo {
  margin-right: 6px;
  border-radius: 4px;
  background-color: #dddddddd;
  padding: 4px;
}

.userStatistics {
  height: 30%;
  display: flex;
  align-items: center;
}

#userCenter .content {
  border-radius: 10px;
  box-shadow: #aaa 1px 1px 5px;
}

.post-show {
  padding: 16px;
  flex: 1;
}
</style>
