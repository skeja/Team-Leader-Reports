<template>
  <div class="sidebar navigation">
    <ul>
      <router-link
        v-for="{ to, label } in routes"
        :key="to"
        :to="to"
        exact-active-class="highlighted"
        tag="li">
        {{ label }}
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    routes() {
      return [{
        to: '/users',
        label: 'Find User'
      }, {
        to: '/users/newUser',
        label: 'Create User'
      }, {
        to: '/users/updateUser',
        label: 'Update User'
      }];
    }
  }
};
</script>
