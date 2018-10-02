import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';

import router from './router/router';
import { init as initStore } from './store';

initStore();
Vue.use(Vuelidate);

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  render: h => h(App)
});
