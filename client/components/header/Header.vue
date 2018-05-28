<template>
  <nav>
    <ul class="nav">
      <router-link
        v-if="!isAuthenticated"
        class="auth"
        to="/login"
        tag="li">Login</router-link>
      <template v-else>
        <router-link to="/" tag="li"><i class="fa fa-home"></i></router-link>
        <router-link to="/users" tag="li">Find User</router-link>
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
ul {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  padding: 0;
  border-bottom: 1px solid #4971b2;
  li {
    padding: 0 20px;
    border: 1px solid transparent;

    &:hover {
      cursor: pointer;
      border-bottom: 1px solid #4971b2;
    }

    &.router-link-exact-active {
      border-bottom: 1px solid #4971b2;
    }
  }
}
.auth {
  display: flex;
  margin-left: auto;
}
</style>
