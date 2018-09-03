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
        <update-password
          v-else
          @close="update = !update"
          @update="updatePassword($event)">
        </update-password>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import User from '../common/User';
import UpdatePassword from '../auth/UpdatePassword';

export default {
  components: {
    User,
    UpdatePassword
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
      const data = {
        password,
        id: this.user.id
      };
      axios.put('/changePassword', data)
        .then(this.update = !this.update);
    }
  }

};
</script>

<style>

</style>
