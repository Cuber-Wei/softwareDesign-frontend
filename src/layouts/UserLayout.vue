<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img alt="logo" class="logo" src="@/assets/oj-logo.jpg" />
          <div>My OJ</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"> My Online Judge</a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
#userLayout {
  text-align: center;
}

#userLayout .header {
  margin-top: 16px;
}

#userLayout .content {
  padding: 20px;
}

#userLayout .footer {
  background-color: white;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

#userLayout .logo {
  width: 64px;
  height: 64px;
}
</style>
