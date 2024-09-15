<template>
  <div
    id="code-editor"
    ref="editorContainer"
    :style="{ height: editor_height }"
  ></div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, toRaw, watch } from "vue";
import * as monaco from "monaco-editor";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  language: {
    // 高亮类型（javascript、curl等,javascript：自带的，curl:自定义的高亮规则）
    type: String,
    default: "java",
  },
  handleChange: {
    type: Function,
    default: console.log,
  },
  height: {
    // 编辑器height
    type: [String, Number],
    default: 500,
  },
  readonly: {
    // 是否只读
    type: Boolean,
    default: false,
  },
  theme: {
    // 编辑器外观主题
    type: String,
    default: "vs-dark",
  },
});
const editorContainer = ref<any>(null);
const editor = ref<any>(null);
const data = ref(props.value);
const editor_height = ref(`${props.height}px`);
onMounted(() => {
  if (!editorContainer.value) {
    return;
  }
  // 初始化编辑器，确保dom已经渲染
  if (props.language === "curl") {
    // 如果是curl 类型则重新定义高亮规则,否则使用自带的高亮语言
    monaco.languages.register({ id: props.language });
    monaco.languages.setMonarchTokensProvider(props.language, {
      ignoreCase: true,
      tokenizer: {
        root: [
          [/curl/, { token: "string.escape" }],
          [/-X|-H|-d/, { token: "keyword" }],
          [/POST|GET|DELETE|PATCH|PUT/, { token: "comment.doc" }],
        ],
      },
    });
  }
  monaco.languages.registerHoverProvider(props.language, {
    // 光标移入提示功能
    provideHover: function (model, position, token) {
      const wordLine = model.getLineContent(position.lineNumber); // 获取光标悬停所在行的所有内容
      const word = model.getWordAtPosition(position)?.word; // 获取光标悬停的单词
      if (word === "name") {
        return {
          contents: [
            { value: `${word}` },
            {
              value: ["这是name的一些介绍", "这是name的一些介绍"].join("\n\n"),
            },
          ],
        };
      } else if (undefined !== word) {
        return {
          contents: [
            { value: `${word}` },
            {
              value: [wordLine].join("\n\n"),
            },
          ],
        };
      }
    },
  });
  editor.value = monaco.editor.create(editorContainer.value, {
    value: data.value,
    language: props.language,
    theme: props.theme, // vs, hc-black, or vs-dark
    readOnly: props.readonly, //是否只读  取值 true | false

    acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
    acceptSuggestionOnEnter: "on", // 接受输入建议 "on" | "off" | "smart"
    accessibilitySupport: "off", // 辅助功能支持  "auto" | "off" | "on"
    autoClosingBrackets: "always", // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
    autoClosingDelete: "always", // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
    autoClosingOvertype: "always", // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
    autoClosingQuotes: "always", // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
    autoIndent: "None", // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
    automaticLayout: true, // 自动布局
    autoSurround: "auto", // 是否应自动环绕选择
    codeLens: false, // 是否显示codeLens 通过 CodeLens，你可以在专注于工作的同时了解代码所发生的情况 – 而无需离开编辑器。 可以查找代码引用、代码更改、关联的 Bug、工作项、代码评审和单元测试。
    codeLensFontFamily: "Jetbrains Mono", // codeLens的字体样式
    codeLensFontSize: 14, // codeLens的字体大小
    colorDecorators: true, // 呈现内联色彩装饰器和颜色选择器
    columnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
    comments: {
      ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
      insertSpace: true, // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
    }, // 注释配置
    contextmenu: true, // 启用上下文菜单
    copyWithSyntaxHighlighting: true, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
    cursorBlinking: "Solid", // 光标动画样式
    cursorSmoothCaretAnimation: true, // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
    cursorStyle: "UnderlineThin", // "Block"|"BlockOutline"|"Line"|"LineThin"|"Underline"|"UnderlineThin" 光标样式
    cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
    cursorSurroundingLinesStyle: "all", // "default" | "all" 光标环绕样式
    cursorWidth: 2, // <=25 光标宽度
    disableLayerHinting: true, // 等宽优化
    emptySelectionClipboard: false, // 空选择剪切板
    folding: true, // 是否启用代码折叠
    foldingHighlight: true, // 折叠等高线
    foldingStrategy: "indentation", // 折叠方式  auto | indentation
    lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
    lineNumbersMinChars: 5, // 行号最小字符   number
    links: true, // 是否点击链接
    minimap: {
      enabled: true,
    },
    overviewRulerBorder: false, // 是否应围绕概览标尺绘制边框
    renderLineHighlight: "gutter", // 当前行突出显示方式
    roundedSelection: false, // 选区是否有圆角
    showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
    selectionClipboard: false, // 选择剪切板
    scrollBeyondLastLine: false, // 设置编辑器是否可以滚动到最后一行之后
    "semanticHighlighting.enabled": true,
  });
  editor.value.onDidChangeModelContent((val: any) => {
    //内容改变时给父组件实时返回值
    props.handleChange(toRaw(editor.value).getValue());
  });
});
watch(
  () => props.language,
  () => {
    if (editor.value) {
      monaco.editor.setModelLanguage(
        toRaw(editor.value).getModel(),
        props.language
      );
    }
  }
);
</script>

<style scoped>
#code-editor {
}
</style>
