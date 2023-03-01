<template>
  <form
    class="u-login-form"
    @submit.prevent="login"
  >
    <CField
      :errors="form.email.errors"
      class="field"
    >
      <CInput
        v-model="form.email.value"
        class="input"
        name="Email"
        placeholder="Work email"
      />
    </CField>
    <CField
      :errors="form.password.errors"
      class="field"
    >
      <CInput
        v-model="form.password.value"
        class="input"
        name="Password"
        type="password"
        placeholder="Password"
      />
    </CField>
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

import CField from '@/components/common/c-field';
import CInput from '@/components/common/c-input';
import CButton from '@/components/common/c-button';

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
    value: '',
    validators: {
      required,
      email,
    },
  },
  password: {
    value: '',
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
