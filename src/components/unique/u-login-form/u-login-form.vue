<template>
  <form
    class="u-login-form"
    @submit.prevent="login"
  >
    <CFieldList 
      v-model:fields="form.fields"
      :is-show-errors="isSubmitted"
    />
    <CButton
      :is-loading="loading"
      :is-disabled="loading"
      label="Login"
      class="button"
      type="submit"
    />
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import CButton from '@/components/common/c-button';
import CFieldList from '@/components/common/c-field-list';

import { useRouter } from 'vue-router';
import { useFormLogin } from './use/useFormLogin';
import { useAuthStore } from '@/stores/auth';
import { ROUTE_NAMES } from '@/constants/route-names-constants';

const router = useRouter();
const authStore = useAuthStore();
const form = useFormLogin();

const loading = computed(() => authStore.loading);
const isSubmitted = ref(false);

const login = async () => {
  isSubmitted.value = true;

  if (!form.isValid.value) return;

  await authStore.login(form.getData());

  if (authStore.isLoggedIn) {
    router.push({ name: ROUTE_NAMES.PROJECTS });
  }
};
</script>

<style lang="scss" src="./u-login-form.scss" />
