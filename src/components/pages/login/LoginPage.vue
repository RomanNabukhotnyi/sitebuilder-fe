<template>
  <div class="template">
    <div class="illustration">
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png"
      />
    </div>
    <div class="content">
      <h1>Great to have you here!</h1>
      <p>You can login to access your workspace.</p>
      <hr />
      <login-form @login="login" />
      <hr />
      <div class="footer">
        <span class="footer"
          >No account yet?
          <router-link to="/sign-up">Sign up</router-link></span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '../../../stores/auth';
import LoginForm from './components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  methods: {
    async login(payload: { email: string; password: string }) {
      await this.authStore.loginApi(payload);
      if (this.authStore.getLoginApiStatus == 'success') {
        this.$router.push('main/projects');
      } else {
        alert('failed');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.template {
  display: flex;
  padding-top: 124px;
}
.illustration {
  display: flex;
  justify-content: flex-end;
  max-width: 50%;
  padding-right: 68px;

  & img {
    height: min-content;
    max-width: 80%;
    max-height: 80%;
  }
}
.content {
  display: flex;
  flex-direction: column;
  color: #554d56;
}
.content h1 {
  font-weight: 300;
  font-size: 36px;
  line-height: 42px;
}
.content > p {
  font-size: 15px;
  line-height: 18px;
}
.content hr {
  margin: 31px 104px;
  width: 40px;
  height: 2px;
  opacity: 0.5;
  border-radius: 1px;
  background-color: #edeced;
}

.footer {
  font-size: 15px;
  line-height: 18px;
  color: #554d56;
}
a,
a:visited {
  color: #419bf9;
  font-weight: 500;
  text-decoration: none;
}
</style>
