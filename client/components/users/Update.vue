<template>
  <div class="container">
    <div class="center">
      <div class="back-icon" @click="$router.back()">
        <span class="material-icons md-24 alt-color">keyboard_backspace</span>
        Back
      </div>
      <user-input
        v-if="selected"
        :updated-user="selected"
        @submitUser="submit($event)">
      </user-input>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import UserInput from './UserInput';

export default {
  components: {
    UserInput
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
      });
  },
  methods: {
    submit(user) {
      axios.put(`/users/${this.selected.id}`, user)
        .then(response => this.$router.push({ name: 'userIndex' }));
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  margin-top: 10px;
}
</style>
