<template>
  <div class="p-sign-up">
    <div class="illustration">
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png"
      >
    </div>
    <div class="content">
      <h1>Welcome to SiteBuilder!</h1>
      <p>We're so happy you're here, let’s start by signing up.</p>
      <hr>
      <USignUpForm
        :loading="loading"
        @sign-up="signUp"
      />
      <hr>
      <div class="footer">
        <span>Already have an account?
          <RouterLink to="/login">Login</RouterLink>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import USignUpForm from '../../unique/u-sign-up-form';

import { useAuthStore } from '@/stores/auth';

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

<style lang="scss" src="./p-sign-up.scss" />
