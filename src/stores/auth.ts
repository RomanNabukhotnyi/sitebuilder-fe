import { defineStore } from 'pinia';

import type { ApiSignUp } from '@/types/auth/ApiSignUp';
import type { ApiLogin } from '@/types/auth/ApiLogin';
import { IError } from '@/types/IError';
import type { ApiUser } from '@/types/users/ApiUser';

import { api } from '@/services/api-service';
import { signUp, login } from '@/api/auth';
import { getUser } from '@/api/user';

interface State {
  user: ApiUser | null;
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
    async signUp(payload: ApiSignUp) {
      try {
        this.loading = true;
        await signUp(payload)
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loading = false;
      }
    },
    async login(payload: ApiLogin) {
      try {
        this.loading = true;
        const { accessToken, refreshToken } = await login(payload);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${localStorage.getItem('accessToken')}`;
        await this.getUser();
      } catch (error) {
        throw new IError(error);
      } finally {
        this.loading = false;
      }
    },
    async getUser() {
      try {
        this.user = await getUser();
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
