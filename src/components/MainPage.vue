<template>
  <header>
    <div class="icon">
      <a href="/main/projects"
        ><img
          width="36"
          height="29"
          src="https://static.thenounproject.com/png/2317669-200.png"
          alt="Sitebuilder"
      /></a>
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
        <span class="placeholder1 ellipsis">Search workspace</span>
        <span class="placeholder2">⌘+K</span>
      </div>
      <a href=""
        ><button class="notification">
          <svg width="24" height="26" viewBox="0 0 24 26">
            <path
              fill="#979197"
              fill-rule="evenodd"
              d="M15.996 20.82l-5.66 2.046a.601.601 0 0 0-.361.769l6.795-2.458a.603.603 0 0 0-.774-.358zm3.77-7.738l-4.387-8.665C13.583.87 9.087-.9 5.335.457 1.58 1.815-.715 6.046.202 9.907l2.243 9.44-.4.145a2.394 2.394 0 0 0-1.44 3.07 2.416 2.416 0 0 0 3.09 1.433l18.119-6.555a2.394 2.394 0 0 0 1.44-3.07 2.416 2.416 0 0 0-3.089-1.433l-.4.145zm-5.157 12.7c-1.876.68-3.951-.282-4.634-2.147l6.795-2.458a3.587 3.587 0 0 1-2.161 4.605z"
            ></path>
          </svg></button
      ></a>
      <div class="popoverContainer" @click="logout">
        <button>
          <div
            class="avatar"
            style="width: 28px; height: 28px; background-size: contain"
          >
            <img
              src="https://lh3.googleusercontent.com/a/ALm5wu1GtNGrAmCvrQInUoiVlcw1gc5hnOV9xdiTQib6=s96-c"
              width="28"
              height="28"
              alt="👤"
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
    <div class="сircle">
      <img
        width="28"
        height="28"
        src="https://cdn.zeplin.io/assets/webapp/img/icLifeBuoy.svg"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '../stores/auth';

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

<style>
::backdrop {
  display: block;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

::selection {
  -webkit-text-fill-color: currentColor;
  background-color: var(--cornflower-blue-20pc);
  text-shadow: none;
}

.main {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: auto;
  scroll-padding-top: 88px;
}

header {
  position: relative;
  height: 52px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 500;
  box-shadow: 0 1px 0 0 rgba(193, 190, 193, 0.4);
  background-color: #fbfbfb;
  font-size: 15px;
  color: #554d56;
}

header .icon {
  justify-content: flex-start;
}

header .icon,
header .searchAndAvatar {
  display: flex;
  align-items: center;
  overflow: hidden;
  flex: 1;
}

header .title {
  overflow: hidden;
  flex: 0 1 auto;
}

header .icon a {
  font-size: 0;
}

a {
  text-decoration: none;
  font-weight: normal;
}

header .title,
header .searchAndAvatar {
  position: relative;
}

header .searchAndAvatar {
  justify-content: flex-end;
}

.bottomLine {
  position: absolute;
  width: 100%;
  height: 4px;
  left: 0;
  bottom: 0;
  background-color: #fbfbfb;
}

.searchAndAvatar .search {
  display: flex;
  align-items: center;
  width: 182px;
  height: 24px;
  border-radius: 2px;
  padding: 4px 6px;
  font-size: 15px;
  line-height: 16px;
  color: #979197;
  background-color: #edeced;
  cursor: pointer;
}

header .searchAndAvatar > :nth-child(n + 2) {
  margin-left: 24px;
}

a {
  text-decoration: none;
  font-weight: normal;
}

.popoverContainer {
  line-height: 0;
  cursor: pointer;
}

.searchAndAvatar .search svg {
  margin-right: 6px;
  width: 16px;
  height: 16px;
}

svg:not(:root),
symbol,
image,
marker,
pattern,
foreignObject {
  overflow-x: hidden;
  overflow-y: hidden;
}

.searchAndAvatar .search .placeholder1,
.searchAndAvatar .search:hover .placeholder2 {
  flex: 1;
  text-align: center;
}

.searchAndAvatar .search:hover .placeholder1,
.searchAndAvatar .search:not(:hover) .placeholder2 {
  display: none;
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.notification {
  position: relative;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  position: relative;
  background: transparent none;
  font-size: 18px;
  cursor: pointer;
}

.avatar {
  border-radius: 50%;
  background-color: var(--avatar-bg-color, #fff);
  background-position: 50%;
  background-repeat: no-repeat;
  width: 28px;
  height: 28px;
  background-size: contain;
}

.avatar img {
  display: block;
  border-radius: 50%;
  object-fit: contain;
}

.main .tabs {
  position: relative;
  display: flex;
  padding: 36px 36px 0;
}

.main .tabs .tab {
  position: relative;
  font-size: 18px;
  line-height: 21px;
  color: #419bf9;
  padding-bottom: 6px;
  cursor: pointer;
  border-bottom: 4px solid #419bf9;
}

label {
  display: block;
}

.main .tabs .tab input {
  display: none;
}

input {
  -webkit-text-fill-color: currentColor;
}

.main .tabs .tab:not(:first-child) {
  margin-left: 24px;
}

.сircle {
  position: fixed;
  right: 12px;
  bottom: 12px;
  z-index: 1000000;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f7f7f7;
  box-shadow: 0 0 2px 0 rgba(85, 77, 86, 0.5);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

input:is([type='radio'], [type='checkbox']) {
  margin-top: 3px;
  margin-right: 2px;
  margin-bottom: 3px;
  margin-left: 2px;
  padding-top: initial;
  padding-right: initial;
  padding-bottom: initial;
  padding-left: initial;
  background-color: initial;
  border-top-color: initial;
  border-top-style: initial;
  border-top-width: initial;
  border-right-color: initial;
  border-right-style: initial;
  border-right-width: initial;
  border-bottom-color: initial;
  border-bottom-style: initial;
  border-bottom-width: initial;
  border-left-color: initial;
  border-left-style: initial;
  border-left-width: initial;
}

input,
textarea,
select,
button,
meter,
progress {
  writing-mode: horizontal-tb;
}

.main .tabs hr {
  position: absolute;
  bottom: -1px;
  width: calc(100% - 72px);
  height: 1px;
  background-color: #f7f7f7;
  z-index: 25;
  border: 0;
  margin: 0;
  opacity: 1;
}
</style>
