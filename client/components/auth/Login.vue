<template>
  <div class="cont">
    <div class="login">
      <div class="login-msg">
        <h3>Welcome</h3>
      </div>
      <form class="login-form" @submit.prevent="submit">
        <div :class="{ focus: focus.email }" class="login-item">
          <i class="far fa-envelope"></i>
          <input
            ref="emailInput"
            v-model="user.email"
            type="email"
            placeholder="email"
            class="login-input"
            @focus="focus.email = true"
            @blur="focus.email = false">
        </div>
        <div :class="{ focus: focus.password }" class="login-item">
          <i class="fas fa-key"></i>
          <input
            v-model="user.password"
            type="password"
            placeholder="password"
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
import axios from '../../axios-auth';

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
      if (this.user.email && this.user.password) return false;
      return true;
    }
  },
  mounted() {
    this.$refs.emailInput.focus();
  },
  methods: {
    submit() {
      axios.post('/login', this.user)
        .then(response => {
          if (typeof response.data === 'string') {
            this.message = response.data;
            this.toggle = true;
            return;
          }
          localStorage.setItem('user', JSON.stringify(response.data));
          this.$router.push('/');
          location.reload();
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

.login-msg {
  width: 100;
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
  height: 4rem;
  width: 100%;
  padding: 1rem 0;
  padding-bottom: 0;
  border-bottom: 1px solid gray;

  &.focus {
    border-color: $alt-color;

    i { color: $alt-color }
  }
}

.login-input {
  width: 100%;
  height: 100%;
  padding-left: 1.5rem;
  font-size: 1rem;
  border: none;
  background-color: transparent;
}

.login-submit {
  width: 100%;
  height: 2rem;
  margin: 2rem 0 1rem;
  color: white;
  background: $main-color;
  font-size: 1rem;
  border-radius: 2rem;
  cursor: pointer;
}

.button {
  font-size: 1rem;
  margin: 2rem 0 1rem;
}

input:focus {
  outline: none;
}

i {
  position: absolute;
  padding-top: 5%;
  color: gray;
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
</style>
