<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/navigation/Header.vue';
import UserStore from './store/store';

export default {
  components: {
    Header
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email && !UserStore.state.currentUser.email) UserStore.addUser(user);
  }
};
</script>

<style lang="scss">
@import './style/style.scss';
</style>
