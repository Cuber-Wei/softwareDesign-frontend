<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <div v-if="route.path.startsWith('/center')" class="userContainer">
        <a-layout-content class="userCenterView">
          <UserCenterView />
        </a-layout-content>
      </div>
      <div v-else class="container">
        <a-layout-content class="content">
          <router-view />
        </a-layout-content>
      </div>
      <a-layout-footer class="footer"> My Online Judge</a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GlobalHeader from "@/components/GlobalHeader.vue";
import { useRoute } from "vue-router";
import UserCenterView from "@/views/UserCenterView.vue";

export default defineComponent({
  components: { UserCenterView, GlobalHeader },
  setup() {
    return {
      route: useRoute(),
    };
  },
});
</script>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  background-color: white;
  position: absolute;
  height: 100px;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: #aaa 1px 1px 4px;
}

.container {
  position: relative;
  margin: calc(0.5rem + 100px) 2% calc(0.5rem + 50px) 2%;
  height: calc(100vh - 150px - 1rem);
  overscroll-behavior: contain;
  overflow: auto;
  box-shadow: #aaa 1px 1px 4px;
  border-radius: 16px;
}

.userContainer {
  position: relative;
  margin: calc(0.5rem + 100px) 2% calc(0.5rem + 50px) 2%;
  height: calc(100vh - 150px - 1rem);
  overscroll-behavior: contain;
  overflow: auto;
}

#basicLayout .content {
  padding: 10px;
}

#basicLayout .footer {
  background-color: white;
  padding: 16px;
  position: absolute;
  height: 18px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  box-shadow: #aaa 1px 1px 4px;
}

.userCenterView {
  display: flex;
  flex: 1;
  margin-bottom: 1rem;
}
</style>
