import axios from 'axios';

import SignUp from './components/SignUpPage.vue';
import Login from './components/LoginPage.vue';
import Main from './components/MainPage.vue';
import Projects from './components/ProjectsPage.vue';
import Pages from './components/PagesPage.vue';
import Slots from './components/SlotsPage.vue';
import Blocks from './components/BlocksPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './stores/auth';

const routes = [
  { path: '/sign-up', component: SignUp, meta: { requiredAuth: false } },
  { path: '/login', component: Login, meta: { requiredAuth: false } },
  {
    path: '/main',
    component: Main,
    meta: { requiredAuth: true },
    children: [
      {
        path: 'projects',
        component: Projects,
        meta: { requiredAuth: true },
      },
      {
        path: 'projects/:projectId/pages',
        component: Pages,
        meta: { requiredAuth: true },
      },
      {
        path: 'projects/:projectId/pages/:pageId/slots',
        component: Slots,
        meta: { requiredAuth: true },
      },
      {
        path: 'projects/:projectId/pages/:pageId/slots/:slotId/blocks',
        component: Blocks,
        meta: { requiredAuth: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/main/projects',
  },
];

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response.status === 401 &&
      error.response.config.url === '/auth/refresh'
    ) {
      routeConfig.push('/login');
      return Promise.reject(error);
    } else if (error.response.status === 401) {
      await axios.get('/auth/refresh');
      return axios(error.config);
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
    let userProfile = authStore.getUserProfile;
    if (!userProfile.email) {
      await authStore.userProfileApi();
      userProfile = authStore.getUserProfile;
      if (!userProfile.email) {
        return next({ path: '/login' });
      } else {
        return next();
      }
    }
  }
  return next();
});
