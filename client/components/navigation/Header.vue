<template>
  <nav class="navigation">
    <ul class="nav horizontal">
      <template v-if="user.email">
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
        <router-link
          to="/teams"
          tag="li"
          active-class="highlighted">
          Teams
        </router-link>
        <div class="auth">
          <li>
            {{ user.email }}
          </li>
          <li @click="logout">
            <a>Logout</a>
          </li>
        </div>
      </template>
      <router-link
        v-else
        class="auth"
        to="/login"
        tag="li">
        Login
      </router-link>
    </ul>
  </nav>
</template>

<script>
import UserStore from '../../store';

export default {
  data() {
    return {
      state: UserStore.state
    };
  },
  computed: {
    user() {
      return this.state.currentUser;
    }
  },
  methods: {
    logout() {
      UserStore.removeUser();
      localStorage.removeItem('user');
      this.$router.push('/login');
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
