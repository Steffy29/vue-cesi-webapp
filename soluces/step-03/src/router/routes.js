import Layout from '@/layout/Layout.vue';

// Children pages
const Meteo = () => import('@/views/Meteo.vue');
const Beers = () => import('@/views/Beers.vue');
const Hearthstone = () => import('@/views/Hearthstone.vue');

const routes = [{
  path: '/',
  name: "sidebar.home",
  redirect: '/meteo',
  component: Layout,
  children: [{
    path: '/meteo',
    name: 'sidebar.meteo',
    component: Meteo,
  }, {
    path: '/beers',
    name: 'sidebar.beers',
    component: Beers,
  }, {
    path: '/hearthstone',
    name: 'sidebar.hearthstone',
    component: Hearthstone,
  }]
}, ];

export default routes;