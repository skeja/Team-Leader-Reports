<template>
  <div class="container">
    <error-message v-if="showErrorModal">
      <div slot="message">{{ message }}</div>
    </error-message>
    <div v-else class="center">
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
import ErrorMessage from '../common/ErrorMessage';
import { delay } from 'lodash-es';

export default {
  components: {
    UserInput,
    ErrorMessage
  },
  data() {
    return {
      userId: this.$route.params.userId,
      selected: {},
      message: '',
      showErrorModal: false
    };
  },
  created() {
    axios.get(`/users/${this.userId}`)
      .then(({ data }) => {
        this.selected = data;
      })
      .catch(({ response }) => {
        this.showErrorModal = true;
        this.message = response.data;
        delay(() => {
          this.showErrorModal = false;
          this.$router.push({ name: 'userIndex' });
        }, 2000);
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
