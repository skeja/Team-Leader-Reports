<template>
  <form class="login-form" @submit.prevent="$emit('submit', user)">
    <div :class="{ focus: focus.email }" class="login-item">
      <span class="material-icons md-24 icon-align icon-login">alternate_email</span>
      <input
        ref="emailInput"
        v-model="user.email"
        type="email"
        name="email"
        autocomplete="email"
        placeholder="email"
        class="login-input"
        @focus="focus.email = true"
        @blur="focus.email = false">
    </div>
    <div :class="{ focus: focus.password }" class="login-item">
      <span class="material-icons md-24 icon-align icon-login">lock</span>
      <input
        v-model="user.password"
        name="password"
        placeholder="password"
        autocomplete="password"
        type="password"
        class="login-input"
        @focus="focus.password = true"
        @blur="focus.password = false">
    </div>
    <div class="login-links">
      <span class="form__label" @click="forgotPassword">Forgot password?</span>
      <button
        :disabled="isEmpty"
        class="button"
        type="submit">Submit</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      focus: {
        email: false,
        password: false
      },
      user: {},
      message: '',
      toggle: false,
      reset: false
    };
  },
  computed: {
    isEmpty() {
      return !this.user.email || !this.user.password;
    }
  },
  mounted() {
    this.$refs.emailInput.focus();
  },
  methods: {
    forgotPassword() {
      this.$router.push({ name: 'forgotPassword' });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/constants';
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

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
}
</style>
