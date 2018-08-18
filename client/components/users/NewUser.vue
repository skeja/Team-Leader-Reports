<template>
  <div class="container">
    <div class="center">
      <div class="back-icon" @click="$router.back()">
        <i class="material-icons md-24 alt-color">keyboard_backspace</i>
        Back
      </div>
      <user-form @submitUser="submit($event)"></user-form>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import UserForm from './UserForm.vue';

export default {
  components: {
    UserForm
  },
  methods: {
    submit(user) {
      axios.post('/newUser', user)
        .then(response => {
          this.$router.push('/users');
        });
    }
  }
};
</script>

<style lang="scss" scoped>
input:focus {
  outline: none;
  border-color: #a7a5a5;
  .form__error & {
    border-color: #f79483;
  }
}

.error {
  color:#f57f6c;
  font-size: 0.75rem;
  display: none;
  margin-left: 14px;
  margin-top: -1.6rem;
  margin-bottom: 0.475rem;

  &.form__error {
    display: block;
  }
}
</style>
