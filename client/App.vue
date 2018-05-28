<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/header/Header.vue';
export default {
  components: {
    Header
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss">
@import './style/style.scss'
</style>
