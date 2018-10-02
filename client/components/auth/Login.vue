<template>
  <div class="container">
    <div class="center center-login">
      <div class="login-msg">
        <h3>Welcome</h3>
      </div>
      <login-form
        v-if="!reset"
        @submit="submit($event)"
        @reset="reset = $event">
      </login-form>
    </div>
    <error-message v-if="showErrorModal">
      <div slot="message">{{ message }}</div>
    </error-message>
  </div>
</template>

<script>
import UserStore from '../../store';
import { delay } from 'lodash-es';
import LoginForm from './LoginForm';
import ForgotPassword from './ForgotPassword';
import ErrorMessage from '../common/ErrorMessage';

export default {
  components: {
    LoginForm,
    ForgotPassword,
    ErrorMessage
  },
  data() {
    return {
      message: '',
      toggle: false,
      reset: false,
      showErrorModal: false
    };
  },
  methods: {
    submit(user) {
      UserStore.login(user)
        .then(() => this.$router.push({ name: 'userIndex' }))
        .catch(({ response: { data } }) => {
          this.showErrorModal = true;
          this.message = data;
          delay(() => {
            this.showErrorModal = false;
          }, 2000);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/constants';

.login-msg {
  margin: 0 auto;

  & h3 {
    margin-bottom: 0;
  }
}

.login-form {
  position: relative;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1.5rem 3rem;
}

.login-links {
  display: flex;
  margin: 2rem 0 1rem;

  & span {
    margin-right: 1rem;
    font-size: 0.6rem;
    cursor: pointer;
    &:hover {
      color: $alt-color;
    }
  }
}

.login-item {
  display: inline-flex;
  position: relative;
  height: 4rem;
  width: 100%;
  padding: 1rem 0;
  padding-bottom: 0;
  border-bottom: 1px solid gray;

  &.focus {
    border-color: $alt-color;
    color: $alt-color;

    .icon-login {
      color: $alt-color;
    }
  }
}

.login-input {
  width: 100%;
  height: 100%;
  padding-left: 0.5rem;
  font-size: 1rem;
  border: none;
  background-color: transparent;
  box-shadow: none;

  &:focus {
    box-shadow: none;
    color: $alt-color !important;
  }
}

.button {
  font-size: 1rem;
}

input:focus {
  outline: none;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
}
</style>
