<template>
  <form
    class="u-sign-up-form"
    @submit.prevent="signUp"
  >
    <CFieldList :fields="form.getFields()" />
    <CButton
      :is-loading="loading"
      :is-disabled="!form.valid || loading"
      label="Sign Up"
      class="button"
      @click="signUp"
    />
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import CButton from '@/components/common/c-button';
import CFieldList from '@/components/common/c-field-list';

import { useForm } from '@/use/form';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';
import { useValidators } from '@/use/validators';
import { ROUTE_NAMES } from '@/constants/route-names-constants';

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();
const { required, minLength, email } = useValidators();
const form = useForm({
  email: {
    placeholder: 'Email',
    validators: {
      required,
      email,
    },
  },
  password: {
    placeholder: 'Password',
    type: 'password',
    validators: {
      required,
      minLength: minLength(8),
    },
  },
});

const loading = computed(() => authStore.loading);

const signUp = async () => {
  if (!form.valid) return;

  await authStore.signUp({
    email: form.email.value,
    password: form.password.value,
  });
  toast.success('Sign up is successful!');
  router.push({ name: ROUTE_NAMES.LOGIN });
};
</script>

<style lang="scss" src="./u-sign-up-form.scss" />
