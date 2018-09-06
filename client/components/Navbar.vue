<template>
  <nav class="navigation">
    <ul class="horizontal">
      <template v-if="user.email">
        <li
          class="nav-brand">
          <span class="material-icons md-24">home</span>
        </li>
        <router-link
          :to="{ name: 'userIndex' }"
          tag="li"
          active-class="highlighted">
          Users
        </router-link>
        <router-link
          :to="{ name: 'findReports' }"
          tag="li"
          active-class="highlighted">
          Reports
        </router-link>
        <router-link
          :to="{ name: 'teamList' }"
          tag="li"
          active-class="highlighted">
          Teams
        </router-link>
        <div class="auth">
          <router-link
            :to="{ name: 'profile' }"
            tag="li"
            active-class="highlighted">
            {{ user.email }}
          </router-link>
          <li @click="logout">
            <a>Logout</a>
          </li>
        </div>
      </template>
      <router-link
        v-else
        class="auth"
        to="{ name: 'login' }"
        tag="li">
        Login
      </router-link>
    </ul>
  </nav>
</template>

<script>
import UserStore from '../store';

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
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  margin-left: auto;
}

.navigation {

  & ul {
    box-shadow: inset 0 -1px 0 0 #18bc9c;
  }
}
</style>
