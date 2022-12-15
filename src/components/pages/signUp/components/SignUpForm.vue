<template>
  <form @submit.prevent class="signupForm">
    <div class="formField textFormField signupFormField">
      <div class="formFieldContent">
        <div class="formFieldInput">
          <input
            class="signupFormInput"
            name="Email"
            placeholder="Work email"
            maxlength="254"
            autofocus="true"
            autocapitalize="off"
            autocomplete="off"
            type="email"
            required
            v-model="payload.email"
          />
        </div>
      </div>
    </div>
    <div class="formField textFormField signupFormField">
      <div class="formFieldContent">
        <div class="formFieldInput">
          <input
            class="signupFormInput"
            name="Password"
            placeholder="Password"
            maxlength="100"
            type="password"
            pattern=".{8,100}"
            required
            minlength="8"
            autocomplete="new-password"
            autocapitalize="off"
            v-model="payload.password"
          />
        </div>
      </div>
    </div>
    <button
      type="button"
      class="signupFormButton button primary"
      @click="signUp"
    >
      Sign up
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
  data() {
    return {
      payload: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    signUp() {
      this.$emit('signUp', this.payload);
      this.payload.email = '';
      this.payload.password = '';
    },
  },
});
</script>

<style scoped>
.signupForm {
  margin: 0;
  max-width: 248px;
  --input-height: 40px;
}

form {
  position: relative;
  display: block;
  max-width: 392px;
  width: 100%;
  margin: 12px auto 0;
}

.signupForm .signupFormField {
  margin-bottom: 8px;
}

.formField {
  display: flex;
  margin-bottom: 24px;
  --tip-text-width: 248px;
  --tip-text-left: 260px;
}

.textFormField .formFieldContent {
  position: relative;
}

.formFieldContent {
  position: relative;
  flex: 1;
  min-width: 0;
}

.textFormField .formFieldContent .formFieldInput {
  display: flex;
  width: 100%;
  border-radius: 2px;
  background-color: #f7f7f7;
}

.textFormField .formFieldContent .formFieldInput > input {
  height: 40px;
  padding: 0 12px;
}

.textFormField .formFieldContent .formFieldInput > input,
.textFormField .formFieldContent .formFieldInput > textarea {
  flex: 1;
  background-color: transparent;
  font-size: 15px;
  color: #554d56;
  caret-color: #419bf9;
}

.signupForm .signupFormInput {
  max-width: 248px;
  --input-padding: 0 12px;
}

input {
  min-width: 0;
  flex: 1;
  height: 40px;
  background-image: none;
  line-height: 24px;
  font-size: 18px;
  color: var(--teflon);
}

.button.primary:disabled {
  opacity: 0.6;
}

.button.primary {
  background-color: #419bf9;
  color: #fff;
}

.button.ninja,
.button.primary,
.button.secondary,
.button.warning {
  min-width: 72px;
  height: 28px;
  padding: 5px 12px;
  border-radius: 2px;
  line-height: 18px;
  font-size: 15px;
}

.signupForm .signupFormButton {
  width: 100%;
  height: 40px;
  margin: 0;
}

.button {
  position: relative;
  background: transparent none;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
}
</style>
