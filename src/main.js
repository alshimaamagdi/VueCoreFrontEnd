import 'bootstrap/dist/css/bootstrap.min.css';
import ToastPlugin from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';




//import 'vue-easy-toast/dist/vue-easy-toast.css'; // optional

import Vuelidate from '@vuelidate/core';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';

// import { createI18n } from 'vue-i18n';
// import { defineRule, configure } from 'vee-validate';
// import { Field, Form, ErrorMessage, defineRule as defineVeeRule } from 'vee-validate';


// Install VeeValidate components globally
const app = createApp(App);
app.use(ToastPlugin);

app.use(router);
app.use(Vuelidate);

// app.component('Field', Field);
// app.component('Form', Form);
// app.component('ErrorMessage', ErrorMessage);
// // Install VeeValidate rules globally (example)
// defineVeeRule('required', value => {
//   if (!value || (Array.isArray(value) && value.length === 0)) {
//     return 'This field is required';
//   }
//   return true;
// });

// // Configure VeeValidate
// configure({
//   generateMessage: context => context.message, // Use the error message directly
//   validateOnInput: true, // Validate on input events (default is true)
// });

// // Create an i18n instance if needed
// const i18n = createI18n(/* your i18n configuration */);

// app.use(i18n);


// // Set the base URL for Axios
// axios.defaults.baseURL = config.apiUrl;
app.mount('#app');
