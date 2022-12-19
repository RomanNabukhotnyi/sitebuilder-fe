<template>
  <div class="form">
    <div class="field">
      <MyInput
        class="input"
        name="Email"
        placeholder="Work email"
        v-model="payload.email"
      />
    </div>
    <div class="field">
      <MyInput
        class="input"
        name="Password"
        type="password"
        placeholder="Password"
        v-model="payload.password"
      />
    </div>
    <MyButton class="button" @click="login">Login</MyButton>
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
    };
  },
  methods: {
    login() {
      this.$emit('login', this.payload);
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
