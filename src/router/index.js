import Vue from 'vue';
import VueRouter from 'vue-router';
import nprogress from 'nprogress';

import EventCreate from '../views/EventCreate.vue';
import EventList from '../views/EventList.vue';
import EventShow from '../views/EventShow.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter: (to, from, next) => {
      store.dispatch('event/fetchEvent', to.params.id).then(event => {
        to.params.event = event;
        next();
      });
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  nprogress.start();
  next();
});

router.afterEach(() => {
  nprogress.done();
});

export default router;
