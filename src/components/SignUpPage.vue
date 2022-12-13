<template>
  <div id="signupPageContainer">
    <div class="loginSignupTemplate">
      <div class="illustration">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png"
        />
      </div>
      <div class="content">
        <h1>Welcome to SiteBuilder!</h1>
        <p>We're so happy you're here, let’s start by signing up.</p>
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
              type="submit"
              class="signupFormButton button primary"
              @click="signUp"
            >
              Sign up
            </button>
          </form>
        </div>
        <hr />
        <div class="footer">
          <span class="signupPageFooter"
            >Already have an account? <a href="/login">Login</a></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '../stores/auth';

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
    async signUp() {
      if (this.validateForm()) {
        const payload = {
          email: this.email,
          password: this.password,
        };
        await this.authStore.signUpApi(payload);
        if (this.authStore.getSignUpApiStatus == 'success') {
          this.$router.push('/login');
        } else {
          alert('failed');
        }
      }
    },
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
  },
};
</script>

<style scoped>
.loginSignupTemplate {
  display: flex;
  padding-top: 124px;
}

.loginSignupTemplate .illustration {
  display: flex;
  justify-content: flex-end;
  max-width: 50%;
  padding-right: 68px;
  flex: 1;
}

.loginSignupTemplate .illustration img {
  height: min-content;
  max-width: 80%;
  max-height: 80%;
}

.loginSignupTemplate .content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding-left: 4px;
  color: #554d56;
}

.loginSignupTemplate .content > h1 {
  font-weight: 300;
  font-size: 36px;
  line-height: 42px;
}

.loginSignupTemplate .content > p {
  margin-top: 12px;
  font-size: 15px;
  line-height: 18px;
}

.loginSignupTemplate .content hr {
  margin: 31px 104px;
  width: 40px;
  height: 2px;
  opacity: 0.5;
  border-radius: 1px;
  background-color: #edeced;
}

.loginSignupTemplate .content .formWrapper {
  width: 100%;
}

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

.formFieldTipText {
  position: absolute;
  max-width: 248px;
  width: 248px;
  top: 0;
  left: 260px;
  font-size: 12px;
  color: #979197;
  word-break: break-word;
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

button:disabled,
button.disabled {
  cursor: default;
}

.button {
  position: relative;
  background: transparent none;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
}

.signupPageFooter {
  font-size: 15px;
  line-height: 18px;
  color: #554d56;
}

.loginSignupTemplate .content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding-left: 4px;
  color: #554d56;
}

.tipTextWrapper {
  height: 40px;
  display: flex;
  align-items: center;
}

.tipTextWrapper .tipText {
  position: relative;
  width: 100%;
}

.tipTextWrapper .tipText svg {
  position: absolute;
  top: 2px;
  left: 0;
}

.tipTextWrapper .tipText p.error {
  color: #ee6723;
}

.tipTextWrapper .tipText p:not(:first-child) {
  margin-left: 16px;
}

.tipTextWrapper .tipText p {
  width: 100%;
}
</style>
