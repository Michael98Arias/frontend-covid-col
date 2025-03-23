import { RouteRecordRaw } from 'vue-router';
import { UserRole } from '../enums/enums/role.enum';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/login',
    children: [
      {
        path: 'login',
        component: () => import('src/components/MainLayout/Login/LoginPage.vue'),
        meta: { requiresAuth: false, roles: [UserRole.ANONYMOUS] },
      },
    ],
  },

  // Route to display 503 error
  {
    path: '/access-denied',
    component: () => import('pages/ErrorWithoutPermission.vue'),
  },
  // Route to display 404 error
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
