import { defineStore } from 'pinia';
import { IError } from '@/interfaces/IError';
import axios from 'axios';

interface State {
  user: { email: string } | null;
  loading: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    user: null,
    loading: false,
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
  },
  actions: {
    async login(payload: { email: string; password: string }) {
      try {
        this.loading = true;
        const response = await axios.post('/auth/login', payload);
        const tokens = response.data.data;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        await this.getUser();
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loading = false;
      }
    },
    async signUp(payload: { email: string; password: string }) {
      try {
        this.loading = true;
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
