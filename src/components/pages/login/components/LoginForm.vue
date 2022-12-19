<template>
  <div class="form">
    <div class="field">
      <MyInput
        class="input"
        name="Email"
        placeholder="Work email"
        @input="emailValidation"
        v-model="payload.email"
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
        v-model="payload.password"
      />
      <p v-if="passwordError" class="error">{{ passwordError }}</p>
    </div>
    <MyButton class="button" @click="login" :disabled="validation"
      >Login</MyButton
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyButton from '@/components/common/MyButton.vue';
import MyInput from '@/components/common/MyInput.vue';

export default defineComponent({
  name: 'LoginForm',
  components: {
    MyButton,
    MyInput,
  },
  setup() {
    return {};
  },
  data() {
    return {
      payload: {
        email: '',
        password: '',
      },
      emailError: '',
      passwordError: '',
    };
  },
  computed: {
    validation(): boolean {
      return !!this.emailError || !!this.passwordError;
    },
  },
  methods: {
    emailValidation(): boolean {
      if (this.payload.email === '') {
        this.emailError = 'Field is required';
        return false;
      }
      if (!this.payload.email.match(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        this.emailError = 'That’s not a valid email';
        return false;
      }
      this.emailError = '';
      return true;
    },
    passwordValidation(): boolean {
      if (this.payload.password === '') {
        this.passwordError = 'Field is required';
        return false;
      }
      if (this.payload.password.length < 8) {
        this.passwordError = 'Your password must have at least 8 characters.';
        return false;
      }
      this.passwordError = '';
      return true;
    },
    login() {
      if (this.emailValidation() && this.passwordValidation()) {
        this.$emit('login', this.payload);
      }
    },
  },
});
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
</style>
