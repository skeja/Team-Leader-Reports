<template>
  <div class="container">
    <div class="center">
      <form @submit.prevent="submit">
        <div class="item">
          <label for="email">Mail</label>
          <input v-model="user.email" type="email">
        </div>
        <div class="item">
          <label for="password">Password</label>
          <input v-model="user.password" type="password">
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';

export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    submit() {
      axios.post('/login', this.user)
        .then(response => {
          console.log(response);
          if (typeof response.data === 'string') return null;
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
.item {
  display: flex;
  flex-direction: column;
}
</style>
