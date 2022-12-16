<template>
  <form @submit.prevent class="form">
    <div class="field">
      <input
        class="input"
        name="Email"
        placeholder="Work email"
        v-model="payload.email"
      />
    </div>
    <div class="field">
      <input
        class="input"
        name="Password"
        placeholder="Password"
        v-model="payload.password"
      />
    </div>
    <button type="button" class="button" @click="login">Login</button>
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
    login() {
      this.$emit('login', this.payload);
      this.payload.email = '';
      this.payload.password = '';
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
  border-radius: 2px;
  background-color: #f7f7f7;
  padding: 0 12px;
  width: 100%;
  height: 40px;
  font-size: 15px;
  color: #554d56;
  caret-color: #419bf9;
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
</style>
