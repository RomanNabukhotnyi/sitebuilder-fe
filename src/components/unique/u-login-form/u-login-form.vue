<template>
  <form
    class="u-login-form"
    @submit.prevent="login"
  >
    <CFieldList :fields="form.getFields()" />
    <CButton
      :is-loading="loading"
      :is-disabled="!form.valid || loading"
      label="Login"
      class="button"
      @click="login"
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
import { useValidators } from '@/use/validators';
import { ROUTE_NAMES } from '@/constants/route-names-constants';

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

const login = async () => {
  if (!form.valid) return;

  await authStore.login({
    email: form.email.value,
    password: form.password.value,
  });

  if (authStore.isLoggedIn) {
    router.push({ name: ROUTE_NAMES.PROJECTS });
  }
};
</script>

<style lang="scss" src="./u-login-form.scss" />
