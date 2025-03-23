import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { useAuthStore } from '../stores/data-store';

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    const isAuthenticated = authStore.authenticated;
    const userRole = authStore.role;

    if (to.meta?.requiresAuth && !isAuthenticated) {
      return next('/login');
    }

    if (
      to.meta?.roles &&
      Array.isArray(to.meta.roles) &&
      !to.meta.roles.includes(userRole)
    ) {
      return next('/access-denied');
    }

    if (to.path === '/' && isAuthenticated) {
      return next('/home');
    }

    next();
  });

  return router;
});
