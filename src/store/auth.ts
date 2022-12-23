import { defineStore } from 'pinia';
import { IError } from '@/interfaces/IError';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      email: '',
    },
    loading: false,
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
  },
  actions: {
    async login(payload: { email: string; password: string }) {
      this.loading = true;
      try {
        const response = await axios.post('/auth/login', payload);
        const tokens = response.data.data;
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loading = false;
      }
    },
    async signUp(payload: { email: string; password: string }) {
      this.loading = true;
      try {
        await axios.post('/auth/sign-up', payload);
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loading = false;
      }
    },
    async getUser() {
      try {
        const response = await axios.get('/users');
        this.user = { email: response.data.data.email };
      } catch (error) {
        throw new IError(error);
      }
    },
    async logout() {
      try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.$reset();
      } catch (error) {
        throw new IError(error);
      }
    },
  },
});
