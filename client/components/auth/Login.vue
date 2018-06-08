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
        <button class="login-submit" type="submit">Submit</button>
        <div v-show="message" class="warning">
          {{ message }}
        </div>
      </form>
    </div>
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
      message: ''
    };
  },
  mounted() {
    this.$refs.emailInput.focus();
  },
  methods: {
    submit() {
      axios.post('/login', this.user)
        .then(response => {
          console.log(response);
          if (typeof response.data === 'string') {
            this.message = response.data;
            return;
          }
          localStorage.setItem('user', JSON.stringify(response.data));
          const a = JSON.parse(localStorage.getItem('user'));
          console.log(a);
          location.reload();
          this.$router.push('/');
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/constants';

.warning {
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
  background: darkslategray;
  font-size: 1rem;
  border-radius: 2rem;
  cursor: pointer;
}
input:focus {
  outline: none;
}
i {
  position: absolute;
  padding-top: 5%;
  color: gray;
}
</style>
