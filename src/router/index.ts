import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '../stores/auth';
import routes from '../routes';

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach(async (to, from, next) => {
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

export default router;
