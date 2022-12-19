<template>
  <header>
    <div class="icon">
      <RouterLink to="/main/projects"
        ><img
          width="36"
          height="29"
          src="https://static.thenounproject.com/png/2317669-200.png"
      /></RouterLink>
    </div>
    <div>Workspace</div>
    <div class="avatar" @click="logout">
      <img
        src="https://lh3.googleusercontent.com/a/ALm5wu1GtNGrAmCvrQInUoiVlcw1gc5hnOV9xdiTQib6=s96-c"
        width="28"
        height="28"
      />
    </div>
  </header>

  <div>
    <RouterView></RouterView>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '../../../stores/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainPage',
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  methods: {
    async logout() {
      await this.authStore.userLogout();
      if (this.authStore.getLogout) {
        const resetUser = {
          email: '',
        };
        this.authStore.setUserProfile(resetUser);
        this.authStore.setLogout(false);
        this.$router.push('/login');
      }
    },
  },
});
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
}

.avatar {
  width: 28px;
  height: 28px;
  cursor: pointer;
}

.avatar img {
  border-radius: 50%;
}
</style>
