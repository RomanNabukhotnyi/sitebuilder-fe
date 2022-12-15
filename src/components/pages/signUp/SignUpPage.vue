<template>
  <div class="loginSignupTemplate">
    <div class="illustration">
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png"
      />
    </div>
    <div class="content">
      <h1>Welcome to SiteBuilder!</h1>
      <p>We're so happy you're here, let’s start by signing up.</p>
      <hr />
      <div class="formWrapper">
        <sign-up-form @signUp="signUp" />
      </div>
      <hr />
      <div class="footer">
        <span class="signupPageFooter"
          >Already have an account?
          <router-link to="/login">Login</router-link></span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '../../../stores/auth';
import SignUpForm from './components/SignUpForm.vue';

export default {
  components: {
    SignUpForm,
  },
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  methods: {
    async signUp(payload: { email: string; password: string }) {
      await this.authStore.signUpApi(payload);
      if (this.authStore.getSignUpApiStatus == 'success') {
        this.$router.push('/login');
      } else {
        alert('failed');
      }
    },
  },
};
</script>

<style scoped>
@import 'signUp.css';
</style>
