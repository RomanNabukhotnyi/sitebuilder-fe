import axios from 'axios';

import SignUp from './components/pages/signUp/SignUpPage.vue';
import Login from './components/pages/login/LoginPage.vue';
import Main from './components/pages/main/MainPage.vue';
import Projects from './components/pages/projects/ProjectsPage.vue';
import Pages from './components/pages/pages/PagesPage.vue';
import Slots from './components/pages/slots/SlotsPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './stores/auth';

const routes = [
  { path: '/sign-up', component: SignUp, meta: { requiredAuth: false } },
  { path: '/login', component: Login, meta: { requiredAuth: false } },
  {
    path: '/',
    component: Main,
    redirect: '/projects',
    meta: { requiredAuth: true },
    children: [
      {
        path: 'projects',
        component: Projects,
        meta: { requiredAuth: true },
      },
      {
        path: 'projects/:projectId',
        component: Pages,
        meta: { requiredAuth: true },
      },
      {
        path: 'projects/:projectId/pages/:pageId',
        component: Slots,
        meta: { requiredAuth: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/projects',
  },
];

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'accessToken'
)}`;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.config.url === '/auth/refresh'
    ) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      routeConfig.push('/login');
      return Promise.reject(error);
    } else if (error.response && error.response.status === 401) {
      const response = await axios.post('/auth/refresh', {
        refreshToken: localStorage.getItem('refreshToken'),
      });
      const accessToken = response.data.data.accessToken;
      localStorage.removeItem('accessToken');
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${localStorage.getItem('accessToken')}`;
      return axios({
        ...error.config,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
    } else {
      return Promise.reject(error);
    }
  }
);

export const routeConfig = createRouter({
  history: createWebHistory(),
  routes: routes,
});

routeConfig.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiredAuth) {
    if (!authStore.user?.email) {
      await authStore.getUser();
      if (!authStore.user?.email) {
        return next({ path: '/login' });
      }
    }
  }
  if (
    (to.path === '/login' || to.path === '/sign-up') &&
    localStorage.getItem('accessToken')
  ) {
    return next({ path: '/projects' });
  }
  return next();
});
