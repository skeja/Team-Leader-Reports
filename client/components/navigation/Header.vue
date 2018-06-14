<template>
  <nav>
    <ul class="nav">
      <router-link
        v-if="!isAuthenticated"
        class="auth"
        to="/login"
        tag="li">Login</router-link>
      <template v-else>
        <router-link
          to="/"
          tag="li"
          exact>
          TL;DR
        </router-link>
        <router-link to="/users/findUser" tag="li">Users</router-link>
        <li v-if="isAuthenticated" class="auth" >
          <a @click="logout">Logout</a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  computed: {
    isAuthenticated() {
      return JSON.parse(localStorage.getItem('user')) !== null;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/');
      location.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  margin-left: auto;
}

ul {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  padding: 10px;
  background: #283648;
  margin: 0;
  color: white;
  li {
    padding: 10px 20px;
    &:hover {
      cursor: pointer;
      background: rgba(0, 0, 0, 0.336);
    }

    &.router-link-exact-active {
      background: rgba(0, 0, 0, 0.336);
    }
    &.router-link-active {
      background: rgba(0, 0, 0, 0.336);
    }
  }
}
</style>
