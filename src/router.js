// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Registiration from './components/Authorization/Registeration.vue';
import Login from './components/Authorization/Login.vue';
import EmployeeList from './components/Employee/EmployeeList.vue';
import EmployeeDetails from './components/Employee/EmployeeDetails.vue';

const routes = [
  { path: '/', component: Registiration },
  { path: '/Login', component: Login },
  { path: '/EmployeeList', component: EmployeeList },
  {
    path: '/EmployeeDetails/:id',
    name: 'EmployeeDetails',
    component: EmployeeDetails,
  }
  
  // Other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});




export default router;
