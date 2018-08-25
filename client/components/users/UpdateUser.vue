<template>
  <div class="container">
    <div class="center">
      <div class="back-icon" @click="$router.back()">
        <span class="material-icons md-24 alt-color">keyboard_backspace</span>
        Back
      </div>
      <div v-if="selected">
        <user-form :updated-user="selected" @submitUser="submit($event)"></user-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import UserForm from './UserForm.vue';

export default {
  components: {
    UserForm
  },
  data() {
    return {
      userId: this.$route.params.userId,
      selected: {}
    };
  },
  created() {
    axios.get(`/users/${this.userId}`)
      .then(({ data }) => {
        this.selected = data;
      })
      .then();
  },
  methods: {
    submit(user) {
      axios.put(`/users/${this.selected.id}`, user)
        .then(response => this.$router.push({ name: 'findUser' }));
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  margin-top: 10px;
}
</style>
