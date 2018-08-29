<template>
  <div class="app">
    <Header></Header>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
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

.app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
