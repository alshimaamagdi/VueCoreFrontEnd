// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Registiration from './components/Authorization/Registeration.vue';
import Login from './components/Authorization/Login.vue';

const routes = [
  { path: '/Registiration', component: Registiration },
  { path: '/Login', component: Login },
  // Other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});




export default router;
