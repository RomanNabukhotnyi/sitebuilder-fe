<template>
  <div class="template">
    <div class="illustration">
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png"
      />
    </div>
    <div class="content">
      <h1>Welcome to SiteBuilder!</h1>
      <p>We're so happy you're here, let’s start by signing up.</p>
      <hr />
      <SignUpForm :loading="loading" @signUp="signUp" />
      <hr />
      <div class="footer">
        <span
          >Already have an account?
          <RouterLink to="/login">Login</RouterLink>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';
import SignUpForm from './components/SignUpForm.vue';
const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();
const loading = computed(() => authStore.loading);
const signUp = async (payload: { email: string; password: string }) => {
  await authStore.signUp(payload);
  toast.success('Sign up is successful!');
  router.push('/login');
};
</script>

<style scoped>
.template {
  display: flex;
  padding-top: 124px;
}
.illustration {
  display: flex;
  width: 50%;
  justify-content: end;
}
.illustration img {
  height: min-content;
  max-height: 80%;
  align-self: center;
}
.content {
  display: flex;
  flex-direction: column;
  color: #554d56;
}
.content h1 {
  font-weight: 300;
  font-size: 36px;
  line-height: 42px;
}
.content > p {
  font-size: 15px;
  line-height: 18px;
}
.content hr {
  margin: 31px 104px;
  width: 40px;
  height: 2px;
  opacity: 0.5;
  border-radius: 1px;
  background-color: #edeced;
}

.footer {
  font-size: 15px;
  line-height: 18px;
  color: #554d56;
}
a,
a:visited {
  color: #419bf9;
  font-weight: 500;
  text-decoration: none;
}
</style>
