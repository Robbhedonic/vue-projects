import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { guestOnly: true },
    },
    { path: '/register', redirect: '/login' },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
          });
        }, 100);
      });
    }
    return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  const { isLoggedIn, fetchUser } = useAuth();
  if (to.meta.requiresAuth) {
    if (!isLoggedIn.value) return { name: 'login', query: { redirect: to.fullPath } };
    await fetchUser();
  }
  if (to.meta.guestOnly && isLoggedIn.value) {
    return { name: 'dashboard' };
  }
});

export default router;
