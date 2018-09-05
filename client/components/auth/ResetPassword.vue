<template>
  <div class="container">
    <div class="center center-login">
      <password-form
        @close="$router.push({ name: 'login' })"
        @submit="submit($event)">
      </password-form>
    </div>
    <error-message v-if="showErrorModal">
      <div slot="message">{{ message }}</div>
    </error-message>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import { delay } from 'lodash-es';
import PasswordForm from '../common/PasswordForm';
import ErrorMessage from '../common/ErrorMessage';

export default {
  components: {
    PasswordForm,
    ErrorMessage
  },
  data() {
    return {
      token: this.$route.query.token,
      password: '',
      message: '',
      showErrorModal: false
    };
  },
  methods: {
    submit(password) {
      const data = {
        token: this.token,
        password
      };
      axios.post('/resetPassword', data)
        .then(() => console.log('pasword updated'))
        .catch(({ response }) => {
          this.showErrorModal = true;
          this.message = response.data;
          delay(() => {
            this.showErrorModal = false;
          }, 2000);
        });
    }
  }
};
</script>
