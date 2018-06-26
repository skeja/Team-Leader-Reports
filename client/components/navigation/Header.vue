<template>
  <nav class="navigation">
    <ul class="nav horizontal">
      <router-link
        v-if="!isAuthenticated"
        class="auth"
        to="/login"
        tag="li">Login</router-link>
      <template v-else>
        <router-link
          to="/"
          tag="li"
          exact
          exact-active-class="highlighted">
          <i class="fa fa-home"></i>
        </router-link>
        <router-link
          to="/users"
          tag="li"
          active-class="highlighted">
          Users
        </router-link>
        <router-link
          to="/reports"
          tag="li"
          active-class="highlighted">
          Reports
        </router-link>
        <li v-if="isAuthenticated" class="auth" >
          <a @click="logout">Logout</a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return JSON.parse(localStorage.getItem('user')) !== null;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
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
</style>
