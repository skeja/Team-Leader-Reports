<template>
  <div class="container container-top">
    <div class="center">
      <user :user="user"></user>
      <transition name="fade" mode="out-in">
        <button
          v-if ="!update"
          class="button"
          @click="update = !update">
          Update password
        </button>
        <password-form
          v-else
          @close="update = !update"
          @submit="updatePassword($event)">
        </password-form>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import User from '../common/User';
import PasswordForm from '../common/PasswordForm';

export default {
  components: {
    User,
    PasswordForm
  },
  data() {
    return {
      user: {},
      update: false,
      password: '',
      matchPassword: ''
    };
  },
  computed: {
    checkPassword() {
      if (this.password === this.matchPassword) return true;
      return false;
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return axios.get(`/users/${user.id}`)
      .then(({ data }) => {
        this.user = data;
      });
  },
  methods: {
    updatePassword(password) {
      axios.put('/changePassword', { password })
        .then(this.update = !this.update);
    }
  }

};
</script>
