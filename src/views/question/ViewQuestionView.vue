<template>
  <div id="ViewQuestionsView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question" position="left">
          <a-tab-pane key="question" title="题目">
            <div class="docArea">
              <a-card
                v-if="question"
                :bordered="false"
                :title="question.title"
                style="margin-top: 10px; height: 95%; flex: 1"
              >
                <template #extra>
                  <a-space wrap>
                    <a-tag
                      v-for="(item, index) of question.tag"
                      :key="index"
                      color="green"
                      >{{ item }}
                    </a-tag>
                  </a-space>
                </template>
                <a-descriptions
                  :column="{ xs: 1, md: 2, lg: 3 }"
                  title="题目限制"
                >
                  <a-descriptions-item label="时间限制">
                    <a-tag>{{ question.judgeConfig.timeLimit }} ms</a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="内存限制">
                    <a-tag>{{ question.judgeConfig.memoryLimit }} KB</a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="堆栈限制">
                    <a-tag>{{ question.judgeConfig.stackLimit }} KB</a-tag>
                  </a-descriptions-item>
                </a-descriptions>
                <MdViewer :value="question.content || ' '" />
              </a-card>
            </div>
          </a-tab-pane>
          <a-tab-pane key="answer" title="题解">
            <div class="docArea">
              <h2>题目题解</h2>
              <a-button
                style="margin-top: 16px"
                type="primary"
                @click="toWriteWP"
                >编写题解
              </a-button>
              <a-divider />
              <WriteUpCard
                :post="item"
                v-for="(item, index) in writeUpList"
                :key="index"
              />
            </div>
          </a-tab-pane>
          <a-tab-pane key="submits" title="提交记录">
            <div class="docArea">
              <h2>提交记录</h2>
              <a-descriptions
                :column="{ xs: 1, md: 2, lg: 3 }"
                title="判题信息"
              >
                <a-descriptions-item label="题目标题">
                  <a-tag>{{ question?.title }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="题目ID">
                  <a-tag>{{ question?.questionId }}</a-tag>
                </a-descriptions-item>
                <a-checkbox v-model="isPersonal" @change="checkboxChange"
                  >只看自己
                </a-checkbox>
              </a-descriptions>
              <a-divider :size="0"></a-divider>
              <a-space
                >每页题目数量
                <a-input-number
                  v-model="searchParams.pageSize"
                  min="1"
                  placeholder="每页提交记录数量"
                  size="small"
                  style="width: 200px"
                />
                <a-button type="primary" @click="loadData">刷新</a-button>
              </a-space>
              <a-divider :size="0"></a-divider>
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
                <template #userVO="{ record }">
                  <a-space>
                    {{ record.userVO.userName }}
                  </a-space>
                </template>
                <template #createTime="{ record }">
                  <a-space>
                    {{
                      moment(record.createTime).format("YYYY-MM-DD hh:mm:ss")
                    }}
                  </a-space>
                </template>
                <template #optional="{ record }">
                  <a-space>
                    <a-button type="primary" @click="toDetail(record)"
                      >查看详情
                    </a-button>
                  </a-space>
                </template>
              </a-table>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-col>

      <a-col :md="12" :xs="24" class="codeArea">
        <a-row :column="{ xs: 1, md: 2 }" class="operationLine">
          <a-col :span="8">
            <a-cascader
              v-model="form.language"
              :options="languageOptions"
              placeholder="请选择代码语言"
              style="width: 100%"
            />
          </a-col>
          <a-col :span="8" style="margin-left: 20px">
            <a-button style="width: 200px" type="primary" @click="doSubmit"
              >提交代码
            </a-button>
          </a-col>
        </a-row>
        <CodeEditor
          ref="monacoEdit"
          :handle-change="onCodeChange"
          :language="form.language"
          :readonly="false"
          :value="form.code"
          style="height: 95%; flex: 1"
        ></CodeEditor>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, ref, watchEffect, withDefaults } from "vue";
import message from "@arco-design/web-vue/es/message";
import {
  QuestionAddRequest,
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionSubmitVO,
  WriteUpControllerService,
  WriteUpVO,
} from "../../generated";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import WriteUpCard from "@/components/WriteUpCard.vue";
import { useRouter } from "vue-router";
import moment from "moment/moment";
import { useStore } from "vuex";

const store = useStore();
const currUser = store.state.user.loginUser;
const question = ref<QuestionAddRequest>();
const writeUpList = ref<Array<WriteUpVO>>();
const isPersonal = ref(false); //只看自己？
const languageOptions = [
  {
    value: "java",
    label: "Java",
  },
];

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const loadData = async () => {
  //拿到当前题目
  const questionRes = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (questionRes.code === 0) {
    question.value = questionRes.data;
  } else {
    message.error("加载失败！ " + questionRes.message);
  }

  //拿到当前题目通过审核的题解
  // 校验分页数量
  if (
    !writeUpSearchParams.value.pageSize ||
    writeUpSearchParams.value.pageSize <= 0
  ) {
    writeUpSearchParams.value.pageSize = 5;
  }
  const writeUpRes =
    await WriteUpControllerService.listWriteUpVoByPageUsingPost(
      writeUpSearchParams.value as any
    );
  if (writeUpRes.code === 0) {
    writeUpList.value = writeUpRes.data.records;
  } else {
    message.error("加载失败！ " + writeUpRes.message);
  }

  // 校验分页数量
  if (!searchParams.value.pageSize || searchParams.value.pageSize <= 0) {
    searchParams.value.pageSize = 5;
  }
  const questionSubmitRes =
    await QuestionSubmitControllerService.listQuestionSubmitByPageUsingPost(
      searchParams.value as any
    );
  if (questionSubmitRes.code === 0) {
    dataList.value = questionSubmitRes.data.records;
    total.value = questionSubmitRes.data.records.length;
  } else {
    message.error("加载数据失败！ " + questionSubmitRes.message);
  }
};
onMounted(() => {
  loadData();
});

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});
const onCodeChange = (v: string) => {
  form.value.code = v;
};
const doSubmit = async () => {
  if (props.id !== "" && form.value.code !== "") {
    const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost(
      {
        ...form.value,
        questionId: props.id as any,
      }
    );
    if (res.code === 0) {
      message.success("提交成功！");
    } else {
      message.error("提交失败！ " + res.message);
    }
  }
};
//题解相关
const writeUpSearchParams = ref({
  questionId: props.id,
  pageSize: 10,
  current: 1,
  reviewStatus: 1, //已审核通过
});
const toWriteWP = () => {
  router.push({
    path: `/add/writeUp/${props.id}`,
  });
};
//提交记录相关
const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  questionId: props.id,
  pageSize: 10,
  current: 1,
  userId: "", //只看自己？
});

// 监听分页变量，改变时更新页面
watchEffect(() => {
  loadData();
});

const columns = [
  {
    title: "记录id",
    dataIndex: "questionSubmitId",
  },
  {
    title: "提交者",
    slotName: "userVO",
  },
  {
    title: "语言",
    dataIndex: "language",
  },
  {
    title: "状态",
    slotName: "status",
  },
  {
    title: "提交时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
// 跳转到做题页面
const router = useRouter();
const checkboxChange = () => {
  if (isPersonal.value) {
    searchParams.value = {
      ...searchParams.value,
      userId: currUser.userId as any,
    };
  }
};
const toDetail = (questionSubmit: QuestionSubmitVO) => {
  router.push({
    path: `/view/questionSubmit/${questionSubmit.questionSubmitId}`,
  });
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
</script>
<style>
#ViewQuestionsView {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

#ViewQuestionsView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}

#ViewQuestionsView .arco-card .arco-card-size-medium .arco-card-bordered {
  height: 100% !important;
}

#ViewQuestionsView .operationLine {
  margin: 10px 0;
  height: 32px;
  width: 100%;
}

#ViewQuestionsView .docArea {
  position: relative;
  height: calc(100vh - 160px - 2rem);
  max-height: calc(100vh - 160px - 2rem);
  overscroll-behavior: contain;
  overflow: auto;
}

#ViewQuestionsView .codeArea {
  position: relative;
  height: calc(100vh - 160px - 2rem);
  max-height: calc(100vh - 160px - 2rem);
  overflow: hidden;
}
</style>
