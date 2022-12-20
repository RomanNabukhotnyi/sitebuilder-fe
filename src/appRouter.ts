import axios from 'axios';

import SignUp from './components/pages/signUp/SignUpPage.vue';
import Login from './components/pages/login/LoginPage.vue';
import Main from './components/pages/main/MainPage.vue';
import Projects from './components/pages/projects/ProjectsPage.vue';
import Pages from './components/pages/pages/PagesPage.vue';
import Slots from './components/pages/slots/SlotsPage.vue';
import Blocks from './components/pages/blocks/BlocksPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './stores/auth';

const routes = [
  { path: '/sign-up', component: SignUp, meta: { requiredAuth: false } },
  { path: '/login', component: Login, meta: { requiredAuth: false } },
  {
    path: '/',
    component: Main,
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
        path: 'pages/:pageId',
        component: Slots,
        meta: { requiredAuth: true },
      },
      {
        path: 'slots/:slotId',
        component: Blocks,
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
axios.defaults.headers.common['cookie'] = `accessToken=${localStorage.getItem(
  'accessToken'
)}; refreshToken=${localStorage.getItem('refreshToken')};`;

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
      routeConfig.push('/login');
      return Promise.reject(error);
    } else if (error.response && error.response.status === 401) {
      const response = await axios.get('/auth/refresh');
      const accessToken = response.data.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
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
    if (!authStore.getUserProfile.email) {
      await authStore.userProfileApi();
      if (!authStore.getUserProfile.email) {
        return next({ path: '/login' });
      } else {
        return next();
      }
    }
  }
  return next();
});
