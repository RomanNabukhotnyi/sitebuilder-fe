<template>
  <div>
    <h4>Login Form</h4>
    <form>
      <div class="mb-3">
        <label for="txtEmail" class="form-label">Email</label>
        <input
          type="text"
          class="form-control"
          id="txtEmail"
          aria-describedby="emailHelp"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="txtPassword" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="txtPassword"
          v-model="password"
        />
      </div>
      <button type="button" class="btn btn-primary" @click="login()">
        Submit
      </button>
      <a href="/sign-up" class="p-1">sign up</a>
    </form>
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
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      await this.authStore.loginApi(payload);
      if (this.authStore.getLoginApiStatus == 'success') {
        this.$router.push('main/projects');
      } else {
        alert('failed');
      }
    },
  },
};
</script>
