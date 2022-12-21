import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loginApiStatus: '',
    signUpApiStatus: '',
    userProfile: {
      email: '',
    },
    logOut: false,
  }),
  getters: {
    getLoginApiStatus: (state) => state.loginApiStatus,
    getSignUpApiStatus: (state) => state.signUpApiStatus,
    getUserProfile: (state) => state.userProfile,
    getLogout: (state) => state.logOut,
  },
  actions: {
    setLoginApiStatus(data: string) {
      this.loginApiStatus = data;
    },
    setSignUpApiStatus(data: string) {
      this.signUpApiStatus = data;
    },
    async loginApi(payload: { email: string; password: string }) {
      const response = await axios.post('/auth/login', payload);
      const tokens = response.data.data;
      if (response && response.data) {
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        this.setLoginApiStatus('success');
      } else {
        this.setLoginApiStatus('failed');
      }
    },
    setUserProfile(data: { email: string }) {
      const userProfile = {
        email: data.email,
      };
      this.userProfile = userProfile;
    },
    async signUpApi(payload: { email: string; password: string }) {
      const response = await axios.post('/auth/sign-up', payload);

      if (response && response.data) {
        this.setSignUpApiStatus('success');
      } else {
        this.setSignUpApiStatus('failed');
      }
    },
    async userProfileApi() {
      const response = await axios.get('/users');

      if (response && response.data) {
        this.setUserProfile(response.data.data);
      }
    },
    setLogout(payload: boolean) {
      this.logOut = payload;
    },
    async userLogout() {
      // const response = await axios.get('/auth/sign-out');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // if (response && response.data) {
      this.setLogout(true);
      // } else {
      //   this.setLogout(false);
      // }
    },
  },
});
