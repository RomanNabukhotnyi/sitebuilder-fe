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

<style lang="scss">
.u-sign-up-form {
  margin: 0;
  max-width: 248px;

  .field {
    margin-bottom: 8px;
  }
  .input {
    padding: 0 12px;
    width: 100%;
  }
  .error {
    font-size: 10px;
    color: rgb(255, 107, 107);
  }
  .button {
    position: relative;
    background: transparent none;
    font-size: 15px;
    text-align: center;
    cursor: pointer;
    width: 100%;
    height: 40px;
    margin: 0;
    background-color: #419bf9;
    color: #fff;
    border-radius: 2px;
  }
  .button:disabled {
    background-color: #a9b5c2;
  }
  .button:disabled:hover {
    opacity: 1;
    cursor: default;
  }
  /* loading */
  @keyframes ldio-bzxhjz25vr {
    0% {
      transform: translate(3px, 20px) scale(0);
    }
    25% {
      transform: translate(3px, 20px) scale(0);
    }
    50% {
      transform: translate(3px, 20px) scale(1);
    }
    75% {
      transform: translate(20px, 20px) scale(1);
    }
    100% {
      transform: translate(37px, 20px) scale(1);
    }
  }
  @keyframes ldio-bzxhjz25vr-r {
    0% {
      transform: translate(37px, 20px) scale(1);
    }
    100% {
      transform: translate(37px, 20px) scale(0);
    }
  }
  .loadingio-spinner-ellipsis-yg3d79y87xd {
    width: 50px;
    height: 50px;
    display: inline-block;
  }
  .ldio-bzxhjz25vr {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0;

    div {
      box-sizing: content-box;
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      transform: translate(20px, 20px) scale(1);
      background: white;
      animation: ldio-bzxhjz25vr 1s infinite cubic-bezier(0, 0.5, 0.5, 1);

      &:nth-child(1) {
        transform: translate(37px, 20px) scale(1);
        animation: ldio-bzxhjz25vr-r 0.25s infinite cubic-bezier(0, 0.5, 0.5, 1);
      }
      &:nth-child(2) {
        animation-delay: -0.25s;
      }
      &:nth-child(3) {
        animation-delay: -0.5s;
      }
      &:nth-child(4) {
        animation-delay: -0.75s;
      }
      &:nth-child(5) {
        animation-delay: -1s;
      }
    }
  }
}
</style>
