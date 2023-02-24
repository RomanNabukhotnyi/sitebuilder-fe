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
      <USignUpForm />
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
import USignUpForm from '../../unique/u-sign-up-form';
</script>

<style lang="scss" src="./p-sign-up.scss" />
