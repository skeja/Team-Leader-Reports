<template>
  <div class="container">
    <div class="center center-login">
      <div v-if="showMessage" class="success main-color">
        <div>{{ message }}</div>
        <span
          class="material-icons md-24 main-color hover"
          @click="cancel">
          keyboard_backspace
        </span>
      </div>
      <template v-else>
        <div class="form__group">
          <input
            v-model="email"
            type="email"
            class="form__input"
            placeholder="Please enter your email">
        </div>
        <div class="buttons">
          <button class="button button-cancel" @click="cancel">Cancel</button>
          <button class="button" @click="submit">Send reset mail</button>
        </div>
      </template>
      <error-message v-if="showErrorModal">
        <div slot="message">{{ message }}</div>
      </error-message>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import ErrorMessage from '../common/ErrorMessage';
import { delay } from 'lodash-es';

export default {
  components: {
    ErrorMessage
  },
  data() {
    return {
      message: 'Reset mail sent!',
      showMessage: false,
      email: '',
      showErrorModal: false
    };
  },
  methods: {
    submit() {
      axios.post('/forgotPassword', { email: this.email })
        .then(response => {
          this.showMessage = true;
        })
        .catch(({ response }) => {
          this.showErrorModal = true;
          this.message = response.data;
          delay(() => {
            this.showErrorModal = false;
          }, 2000);
        });
    },
    cancel() {
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style lang="scss">
.success {
  display: flex;
  flex-direction: column;
  align-items: center;

  & div {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  & span {
    cursor: pointer;
  }
}
</style>
