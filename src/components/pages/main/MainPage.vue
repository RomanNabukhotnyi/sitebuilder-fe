<template>
  <header>
    <div class="icon">
      <RouterLink to="/main/projects">
        <img
          width="36"
          height="29"
          src="https://static.thenounproject.com/png/2317669-200.png"
      /></RouterLink>
    </div>
    <div class="title">Workspace</div>
    <div id="avatar" class="avatar" @click="menuVisible = !menuVisible">
      <img
        src="https://lh3.googleusercontent.com/a/ALm5wu1GtNGrAmCvrQInUoiVlcw1gc5hnOV9xdiTQib6=s96-c"
        width="28"
        height="28"
      />
    </div>
    <UserMenu v-model:show="menuVisible" :user="user" @logout="logout" />
  </header>

  <div>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import UserMenu from './components/UserMenu.vue';
const authStore = useAuthStore();
const router = useRouter();
const user = computed(() => authStore.user);
const menuVisible = ref(false);
const logout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
header {
  height: 52px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 0 0 rgba(193, 190, 193, 0.4);
  background-color: #fbfbfb;
  font-size: 15px;
  color: #554d56;
  position: relative;
}
.title {
  margin-left: auto;
}
.avatar {
  width: 28px;
  height: 28px;
  cursor: pointer;
  margin-left: auto;
}
.avatar img {
  border-radius: 50%;
}
</style>
