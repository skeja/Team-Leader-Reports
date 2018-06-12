import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';

import router from './router';

Vue.use(Vuelidate);

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  render: h => h(App)
});
