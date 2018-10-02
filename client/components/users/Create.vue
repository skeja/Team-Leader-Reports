<template>
  <div class="container">
    <div class="center">
      <div class="back-icon" @click="$router.back()">
        <span class="material-icons md-24 alt-color">keyboard_backspace</span>
        Back
      </div>
      <user-input @submitUser="submit($event)"></user-input>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import UserInput from './UserInput';

export default {
  components: {
    UserInput
  },
  methods: {
    submit(user) {
      axios.post('/users', user)
        .then(response => {
          this.$router.push({ name: 'userIndex' });
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
