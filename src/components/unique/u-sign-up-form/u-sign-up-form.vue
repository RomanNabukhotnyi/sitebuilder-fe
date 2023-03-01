<template>
  <form
    class="u-sign-up-form"
    @submit.prevent="signUp"
  >
    <CFieldList
      v-model:fields="form.fields"
      :is-show-errors="isSubmitted"
    />
    <CButton
      :is-loading="loading"
      :is-disabled="loading"
      label="Sign Up"
      class="button"
      type="submit"
    />
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import CButton from '@/components/common/c-button';
import CFieldList from '@/components/common/c-field-list';

import { useAuthStore } from '@/stores/auth';
import { useFormSignUp } from './use/useFormSignUp';

import { ROUTE_NAMES } from '@/constants/route-names-constants';

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();
const form = useFormSignUp();

const loading = computed(() => authStore.loading);
const isSubmitted = ref(false);


const signUp = async () => {
  isSubmitted.value = true;

  if (!form.isValid.value) return;

  await authStore.signUp(form.getData());
  toast.success('Sign up is successful!');
  router.push({ name: ROUTE_NAMES.LOGIN });
};
</script>

<style lang="scss" src="./u-sign-up-form.scss" />
