<template>
  <div class="p-main">
    <header>
      <div class="icon">
        <RouterLink :to="{ name: ROUTE_NAMES.PROJECTS }">
          <img
            width="36"
            height="29"
            src="https://static.thenounproject.com/png/2317669-200.png"
          >
        </RouterLink>
      </div>
      <div class="title">
        Workspace
      </div>
      <div
        id="avatar"
        class="avatar"
        @click="menuVisible = true"
      >
        <img
          src="https://lh3.googleusercontent.com/a/ALm5wu1GtNGrAmCvrQInUoiVlcw1gc5hnOV9xdiTQib6=s96-c"
          width="28"
          height="28"
        >
      </div>
      <UMainUserMenu
        v-model:show="menuVisible"
        :user="user"
        @logout="logout"
      />
    </header>

    <div>
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import UMainUserMenu from '@/components/unique/u-main-user-menu';

import { useAuthStore } from '@/stores/auth';
import { ROUTE_NAMES } from '@/constants/route-names-constants';

const authStore = useAuthStore();
const router = useRouter();
const user = computed(() => authStore.user);
const menuVisible = ref(false);

const logout = async () => {
  await authStore.logout();
  router.push({ name: ROUTE_NAMES.LOGIN });
};
</script>

<style lang="scss" src="./p-main.scss" />
