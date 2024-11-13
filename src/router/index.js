// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import StockControl from '@/views/StockControl.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/stock-control', name: 'StockControl', component: StockControl }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
