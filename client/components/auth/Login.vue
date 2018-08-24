<template>
  <div class="cont">
    <div class="login">
      <div class="login-msg">
        <h3>Welcome</h3>
      </div>
      <form class="login-form" @submit.prevent="submit">
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
        <button
          :disabled="isEmpty"
          class="button"
          type="submit">Submit</button>
      </form>
    </div>
    <transition name="slide-fade">
      <div
        v-show="toggle"
        class="warning"
        @click="toggle = !toggle">
        {{ message }}
      </div>
    </transition>
  </div>
</template>

<script>
import UserStore from '../../store';

export default {
  data() {
    return {
      focus: {
        email: false,
        password: false
      },
      user: {},
      message: '',
      toggle: false
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
    submit() {
      UserStore.login(this.user)
        .then(() => this.$router.push({ name: 'home' }))
        .catch(({ response: { data } }) => {
          this.message = data.message;
          this.toggle = true;
        });
    },
    showMessage() {
      this.message = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/constants';

.warning {
  position: absolute;
  top: 10%;
  right: 1%;
  cursor: pointer;
  color: rgb(226, 2, 13);
  background-color: rgb(248, 171, 171);
  padding: 10px;
  border-radius: 10px;
}

.cont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 90vh;
}

.login {
  position: relative;
  height: 100%;
  width: 25vw;
  top: 25%;
  margin: auto;
  background: rgba(216, 217, 224, 0.582);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.login-form {
  position: relative;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1.5rem 3rem;
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
  margin: 2rem 0 1rem;
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
