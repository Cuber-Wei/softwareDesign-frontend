<template>
  <div id="ManageUserView">
    <h1>管理用户</h1>
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #createTime="{ record }">
        <a-space>
          {{ moment(record.createTime).format("YYYY-MM-DD-HH:MM:SS") }}
        </a-space>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
          <a-button status="danger" @click="resetPassword(record)"
            >重置密码
          </a-button>
        </a-space>
      </template>
    </a-table>
    <a-space
      >每页用户数量
      <a-input-number
        v-model="searchParams.pageSize"
        min="1"
        placeholder="每页用户数量"
        size="large"
      />
    </a-space>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import { User, UserControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment/moment";

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await UserControllerService.listUserByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载数据失败！ " + res.message);
  }
};

onMounted(() => {
  loadData();
});
// 监听分页变量，改变时更新页面
watchEffect(() => {
  loadData();
});

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "用户名",
    dataIndex: "userAccount",
  },
  {
    title: "昵称",
    dataIndex: "userName",
  },
  {
    title: "简介",
    dataIndex: "userProfile",
  },
  {
    title: "手机号",
    dataIndex: "userPhone",
  },
  {
    title: "邮箱",
    dataIndex: "userMail",
  },
  {
    title: "微信开放平台Id",
    dataIndex: "wxOpenId",
  },
  {
    title: "注册时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
const router = useRouter();
const doUpdate = (user: User) => {
  router.push({
    path: `/user/edit/${user?.userId}`,
  });
};
const doDelete = async (user: User) => {
  const res = await UserControllerService.deleteUserUsingPost({
    id: user.userId,
  });
  if (res.code === 0) {
    // 更新页面
    message.success("删除用户成功！");
    await loadData();
  } else {
    message.error("删除用户失败！ " + res.message);
  }
};
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
</script>
<style scoped>
#ManageUserView {
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-direction: column;
}
</style>
