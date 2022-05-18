import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/03-ScrollBehavior'),

  scrollBehavior(to, from, savedPosition) {
    if (from.meta && from.meta.saveScrollPosition) {
      return false;
    }
    if (to.hash) {
      return { el: to.hash };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, left: 0 };
  },

  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/PageMeetups'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      redirect: { name: 'index' },
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      props: true,
      redirect: (to) => ({ name: 'meetup.description', params: to.params }),
      component: () => import('../views/PageMeetup'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup.description',
          props: true,
          component: () => import('../views/PageMeetupDescription'),
        },
        {
          path: 'agenda',
          name: 'meetup.agenda',
          props: true,
          component: () => import('../views/PageMeetupAgenda'),
        },
      ],
    },
  ],
});
