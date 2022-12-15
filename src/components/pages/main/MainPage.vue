<template>
  <header>
    <div class="icon">
      <router-link to="/main/projects"
        ><img
          width="36"
          height="29"
          src="https://static.thenounproject.com/png/2317669-200.png"
          alt="Sitebuilder"
      /></router-link>
    </div>
    <div class="title">
      <div>Workspace</div>
    </div>
    <div class="searchAndAvatar">
      <div class="search">
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            fill="#979197"
            fill-rule="evenodd"
            d="M2.01 11.715c-2.68-2.68-2.68-7.025 0-9.705 2.68-2.68 7.025-2.68 9.705 0 2.35 2.35 2.64 5.978.87 8.643.034.028.068.06.1.09l2.912 2.913c.536.536.54 1.4 0 1.94-.536.537-1.402.54-1.94 0l-2.913-2.91c-.032-.033-.063-.067-.09-.102-2.666 1.77-6.295 1.48-8.644-.87zm1.94-1.94c1.61 1.607 4.216 1.607 5.824 0 1.608-1.61 1.608-4.216 0-5.824-1.608-1.607-4.215-1.607-5.823 0-1.607 1.61-1.607 4.216 0 5.824z"
          ></path>
        </svg>
        <span class="placeholder1">Search workspace</span>
        <span class="placeholder2">⌘+K</span>
      </div>
      <router-link to=""
        ><button class="notification">
          <svg width="24" height="26" viewBox="0 0 24 26">
            <path
              fill="#979197"
              fill-rule="evenodd"
              d="M15.996 20.82l-5.66 2.046a.601.601 0 0 0-.361.769l6.795-2.458a.603.603 0 0 0-.774-.358zm3.77-7.738l-4.387-8.665C13.583.87 9.087-.9 5.335.457 1.58 1.815-.715 6.046.202 9.907l2.243 9.44-.4.145a2.394 2.394 0 0 0-1.44 3.07 2.416 2.416 0 0 0 3.09 1.433l18.119-6.555a2.394 2.394 0 0 0 1.44-3.07 2.416 2.416 0 0 0-3.089-1.433l-.4.145zm-5.157 12.7c-1.876.68-3.951-.282-4.634-2.147l6.795-2.458a3.587 3.587 0 0 1-2.161 4.605z"
            ></path>
          </svg></button
      ></router-link>
      <div @click="logout">
        <button>
          <div
            class="avatar"
            style="width: 28px; height: 28px; background-size: contain"
          >
            <img
              src="https://lh3.googleusercontent.com/a/ALm5wu1GtNGrAmCvrQInUoiVlcw1gc5hnOV9xdiTQib6=s96-c"
              width="28"
              height="28"
            />
          </div>
        </button>
      </div>
    </div>
    <div class="bottomLine">
      <div></div>
    </div>
  </header>

  <div class="main">
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '../../../stores/auth';

export default {
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
        console.log(this.authStore.getUserProfile);
        this.authStore.setLogout(false);
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style scoped>
@import 'main.css';
</style>
