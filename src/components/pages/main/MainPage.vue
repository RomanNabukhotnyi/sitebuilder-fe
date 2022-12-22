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
    <div class="back" @click="goBack" v-if="$route.path !== '/projects'">
      <svg
        version="1.1"
        viewBox="0 0 8 5"
        width="8px"
        height="5px"
        class="arrow"
        fill="currentColor"
      >
        <g class="chevron__group">
          <path
            d="M1.30834787,0.121426937 L4.87569247,3.68780701 C5.04143584,3.8541036 5.04143584,4.11557261 4.87569247,4.2818692 L4.2807853,4.87693487 C4.20364253,4.95546204 4.09599241,5 3.98333171,5 C3.87067101,5 3.76302089,4.95546204 3.68587812,4.87693487 L0.122730401,1.30754434 C-0.0409101338,1.14044787 -0.0409101338,0.880578628 0.122730401,0.713482155 L0.718686793,0.119419971 C0.79596299,0.0427616956 0.902628913,-0.000376468522 1.01396541,2.47569236e-06 C1.1253019,0.000381419907 1.2316441,0.0442445771 1.30834787,0.121426937 L1.30834787,0.121426937 Z"
            class="chevron__box chevron__box--left"
          />
          <path
            d="M3.12493976,3.68899585 L6.68683713,0.123119938 C6.76404711,0.0445502117 6.8717041,3.56458529e-15 6.98436032,0 C7.09701655,-3.56458529e-15 7.20467353,0.0445502117 7.28188351,0.123119938 L7.87588228,0.717098143 C8.04137257,0.883371226 8.04137257,1.14480327 7.87588228,1.31107635 L4.31398491,4.87695226 C4.23695994,4.95546834 4.1294742,5 4.01698553,5 C3.90449685,5 3.79701111,4.95546834 3.71998614,4.87695226 L3.12493976,4.28197072 C2.95998402,4.11649361 2.95814736,3.85659624 3.12074929,3.68899585 L3.12493976,3.68899585 Z"
            class="chevron__box chevron__box--right"
          />
        </g>
      </svg>
      <p>Back</p>
    </div>
    <div class="title">Workspace</div>
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
import { useAuthStore } from '../../../store/auth';
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
    goBack() {
      this.$router.back();
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
.arrow {
  width: 10px;
  height: 10px;
  transform: rotate(90deg);
}
.back {
  margin: 0 0 0 5px;
  display: flex;
  cursor: pointer;
  align-items: center;
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
