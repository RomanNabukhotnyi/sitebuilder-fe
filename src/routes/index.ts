import SignUp from '@/components/pages/signUp/SignUpPage.vue';
import Login from '@/components/pages/login/LoginPage.vue';
import Main from '@/components/pages/main/MainPage.vue';
import Projects from '@/components/pages/projects/ProjectsPage.vue';
import Pages from '@/components/pages/pages/PagesPage.vue';
import Slots from '@/components/pages/slots/SlotsPage.vue';
import { ROUTE_NAMES } from '@/constants/route-names-constants';

const routes = [
	{
		path: '/sign-up',
		name: 'SIGN_UP',
		component: SignUp,
		meta: {
			requiredAuth: false
		}
	},
	{
		path: '/login',
		name: ROUTE_NAMES.LOGIN,
		component: Login,
		meta: {
			requiredAuth: false
		}
	},
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

export {
	routes
};
