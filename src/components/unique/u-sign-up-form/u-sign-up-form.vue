<template>
  <div class="u-sign-up-form">
    <div class="field">
      <CInput
        v-model="form.email.value"
        class="input"
        name="Email"
        placeholder="Work email"
      />
      <div v-if="!form.email.errors.required">
        <p
          v-if="form.email.errors.email"
          class="error"
        >
          That's not a valid email
        </p>
      </div>
    </div>
    <div class="field">
      <CInput
        v-model="form.password.value"
        class="input"
        name="Password"
        type="password"
        placeholder="Password"
      />
      <div v-if="!form.password.errors.required">
        <p
          v-if="form.password.errors.minLength"
          class="error"
        >
          Password length can't be less then 8. Now it is
          {{ form.password.value.length }}.
        </p>
      </div>
    </div>
    <CButton
      class="button"
      :disabled="!form.valid || loading"
      @click="signUp"
    >
      <p v-if="!loading">
        Sign Up
      </p>
      <div
        v-else
        class="loadingio-spinner-ellipsis-yg3d79y87xd"
      >
        <div class="ldio-bzxhjz25vr">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </CButton>
  </div>
</template>

<script setup lang="ts">
import CButton from '@/components/common/c-button';
import CInput from '@/components/common/c-input';

import { useValidators } from '@/use/validators';
import { useEventListener } from '@/use/use-event-listener';
import { useForm } from '@/use/form';

defineProps<{
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: 'signUp', payload: { email: string; password: string }): void;
}>();

const { windowEventListener } = useEventListener();
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

const signUp = () => {
  emit('signUp', {
    email: form.email.value,
    password: form.password.value,
  });
};

windowEventListener('keyup', (event) => {
  if (event.code === 'Enter' && form.valid) {
    signUp();
  }
});
</script>

<style lang="scss" src="./u-sign-up-form.scss" />
