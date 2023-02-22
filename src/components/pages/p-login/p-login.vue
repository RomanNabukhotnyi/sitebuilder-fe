<template>
  <div class="p-login">
    <div class="illustration">
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png"
      >
    </div>
    <div class="content">
      <h1>Great to have you here!</h1>
      <p>You can login to access your workspace.</p>
      <hr>
      <ULoginForm />
      <hr>
      <div class="footer">
        <span class="footer">No account yet? <RouterLink to="/sign-up">Sign up</RouterLink></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import ULoginForm from '../../unique/u-login-form';
</script>

<style lang="scss" src="./p-login.scss" />
