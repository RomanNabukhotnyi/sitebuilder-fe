import type { RouteRecordRaw } from 'vue-router';

import { ROUTE_NAMES } from '../constants/route-names-constants';

import PSignUp from '../components/pages/p-sign-up';
import PLogin from '../components/pages/p-login';
import PMain from '../components/pages/p-main';
import PProjects from '../components/pages/p-projects';
import PPages from '../components/pages/p-pages';
import PSlots from '../components/pages/p-slots';

const routes: RouteRecordRaw[] = [
  { 
    path: '/sign-up',
    name: ROUTE_NAMES.SIGN_UP,
    component: PSignUp,
    meta: { requiredAuth: false }
  },
  { 
    path: '/login', 
    name: ROUTE_NAMES.LOGIN,
    component: PLogin, 
    meta: { requiredAuth: false } 
  },
  {
    path: '/',
    component: PMain,
    redirect: '/projects',
    meta: { requiredAuth: true },
    children: [
      {
        path: 'projects',
        name: ROUTE_NAMES.PROJECTS,
        component: PProjects,
        meta: { requiredAuth: true },
      },
      {
        path: 'projects/:projectId',
        name: ROUTE_NAMES.PAGES,
        component: PPages,
        meta: { requiredAuth: true },
      },
      {
        path: 'projects/:projectId/pages/:pageId',
        name: ROUTE_NAMES.SLOTS,
        component: PSlots,
        meta: { requiredAuth: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/projects',
  },
];

export default routes;
