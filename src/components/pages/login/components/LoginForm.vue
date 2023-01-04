<template>
  <div class="form">
    <div class="field">
      <MyInput
        class="input"
        name="Email"
        placeholder="Work email"
        @input="emailValidation"
        v-model="email"
      />
      <p v-if="emailError" class="error">{{ emailError }}</p>
    </div>
    <div class="field">
      <MyInput
        class="input"
        name="Password"
        type="password"
        placeholder="Password"
        @input="passwordValidation"
        v-model="password"
      />
      <p v-if="passwordError" class="error">{{ passwordError }}</p>
    </div>
    <MyButton class="button" @click="login" :disabled="isValid || loading">
      <p v-if="!loading">Login</p>
      <div v-else class="loadingio-spinner-ellipsis-yg3d79y87xd">
        <div class="ldio-bzxhjz25vr">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </MyButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import MyButton from '@/components/common/MyButton.vue';
import MyInput from '@/components/common/MyInput.vue';
defineProps<{
  loading: boolean;
}>();
const emit = defineEmits<{
  (e: 'login', payload: { email: string; password: string }): void;
}>();
window.addEventListener('keyup', (event) => {
  if (event.code === 'Enter') {
    login();
  }
});
const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const isValid = computed(() => !!emailError.value || !!passwordError.value);
const emailValidation = (): boolean => {
  if (email.value === '') {
    emailError.value = 'Field is required';
    return false;
  }
  if (!email.value.match(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    emailError.value = 'That’s not a valid email';
    return false;
  }
  emailError.value = '';
  return true;
};
const passwordValidation = (): boolean => {
  if (password.value === '') {
    passwordError.value = 'Field is required';
    return false;
  }
  if (password.value.length < 8) {
    passwordError.value = 'Your password must have at least 8 characters.';
    return false;
  }
  passwordError.value = '';
  return true;
};
const login = () => {
  if (emailValidation() && passwordValidation()) {
    emit('login', {
      email: email.value,
      password: password.value,
    });
  }
};
</script>

<style scoped>
.form {
  margin: 0;
  max-width: 248px;
}
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
.ldio-bzxhjz25vr div {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transform: translate(20px, 20px) scale(1);
  background: white;
  animation: ldio-bzxhjz25vr 1s infinite cubic-bezier(0, 0.5, 0.5, 1);
}
.ldio-bzxhjz25vr div:nth-child(1) {
  transform: translate(37px, 20px) scale(1);
  animation: ldio-bzxhjz25vr-r 0.25s infinite cubic-bezier(0, 0.5, 0.5, 1);
}
.ldio-bzxhjz25vr div:nth-child(2) {
  animation-delay: -0.25s;
}
.ldio-bzxhjz25vr div:nth-child(3) {
  animation-delay: -0.5s;
}
.ldio-bzxhjz25vr div:nth-child(4) {
  animation-delay: -0.75s;
}
.ldio-bzxhjz25vr div:nth-child(5) {
  animation-delay: -1s;
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
}
.ldio-bzxhjz25vr div {
  box-sizing: content-box;
}
</style>
