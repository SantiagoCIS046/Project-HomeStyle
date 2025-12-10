import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '../components/Catalog.vue';
import Checkout from '../components/Checkout.vue';
import Payment from '../components/Payment.vue';

const routes = [
  {
    path: '/',
    name: 'Catalog',
    component: Catalog
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

