import { routes } from './routes';

import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './stores/auth';

const routeConfig = createRouter({
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

export {
	routeConfig
}
