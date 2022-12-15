<template>
  <div id="signupPageContainer">
    <div class="loginSignupTemplate">
      <div class="illustration">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png"
        />
      </div>
      <div class="content">
        <h1>Great to have you here!</h1>
        <p>You can login to access your workspace.</p>
        <hr />
        <div class="formWrapper">
          <form class="signupForm">
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
                    v-model="email"
                    @input="validateEmail"
                  />
                </div>
                <div class="formFieldTipText" v-if="emailError">
                  <div class="tipTextWrapper">
                    <div class="tipText">
                      <svg width="9" height="9" viewBox="0 0 12 12">
                        <path
                          fill="#EE6723"
                          fill-rule="evenodd"
                          d="M6 3.898L2.317.215c-.282-.282-.759-.284-1.052.01l-1.04 1.04c-.298.298-.298.764-.01 1.052L3.898 6 .215 9.683c-.282.282-.284.759.01 1.052l1.04 1.04c.298.298.764.298 1.052.01L6 8.102l3.683 3.683c.282.282.759.284 1.052-.01l1.04-1.04c.298-.298.298-.764.01-1.052L8.102 6l3.683-3.683c.282-.282.284-.759-.01-1.052l-1.04-1.04c-.298-.298-.764-.298-1.052-.01L6 3.898z"
                        ></path>
                      </svg>
                      <p class="error">{{ emailError }}</p>
                    </div>
                  </div>
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
                    v-model="password"
                    @input="validatePassword"
                  />
                </div>
                <div class="formFieldTipText" v-if="passwordError">
                  <div class="tipTextWrapper">
                    <div class="tipText">
                      <svg width="9" height="9" viewBox="0 0 12 12">
                        <path
                          fill="#EE6723"
                          fill-rule="evenodd"
                          d="M6 3.898L2.317.215c-.282-.282-.759-.284-1.052.01l-1.04 1.04c-.298.298-.298.764-.01 1.052L3.898 6 .215 9.683c-.282.282-.284.759.01 1.052l1.04 1.04c.298.298.764.298 1.052.01L6 8.102l3.683 3.683c.282.282.759.284 1.052-.01l1.04-1.04c.298-.298.298-.764.01-1.052L8.102 6l3.683-3.683c.282-.282.284-.759-.01-1.052l-1.04-1.04c-.298-.298-.764-.298-1.052-.01L6 3.898z"
                        ></path>
                      </svg>
                      <p class="error">{{ passwordError }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              class="signupFormButton button primary"
              @click="login"
            >
              Login
            </button>
          </form>
        </div>
        <hr />
        <div class="footer">
          <span class="signupPageFooter"
            >No account yet?
            <router-link to="/sign-up">Sign up</router-link></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '../../../stores/auth';

export default {
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  data() {
    return {
      emailError: '',
      passwordError: '',
      email: '',
      password: '',
    };
  },
  methods: {
    validateEmail() {
      const re =
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.email.toLowerCase().match(re)) {
        this.emailError = "Your email doesn't look right!";
        return;
      }
      this.emailError = '';
    },
    validatePassword() {
      if (this.password.length < 8) {
        this.passwordError = 'Type 8 characters or more';
        return;
      }
      this.passwordError = '';
    },
    validateForm(): boolean {
      if (!this.email) {
        this.emailError = 'Email required';
      }
      if (!this.password) {
        this.passwordError = 'Password required';
      }
      if (this.emailError || this.passwordError) {
        return false;
      }
      return true;
    },
    async login() {
      if (this.validateForm()) {
        const payload = {
          email: this.email,
          password: this.password,
        };
        await this.authStore.loginApi(payload);
        if (this.authStore.getLoginApiStatus == 'success') {
          this.$router.push('main/projects');
        } else {
          alert('failed');
        }
      }
    },
  },
};
</script>

<style scoped>
@import 'login.css';
</style>
