<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/navigation/Header.vue';
export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import './style/style.scss';
</style>
