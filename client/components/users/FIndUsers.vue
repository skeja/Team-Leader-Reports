<template>
  <div class="container">
    <div class="center">
      <div id="findUser">
        <div class="firstName">
          <label for="firstName">Name</label>
          <input
            v-model="user.firstName"
            type="text"
            @input="submit">
        </div>
        <div class="lastName">
          <label for="lastName">Last name</label>
          <input
            v-model="user.lastName"
            type="text"
            @input="submit">
        </div>
      </div>
      <br>
      <table class="table">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
        <tr
          v-for="item in foundUsers"
          :key="item.id"
          @click="selected(item)">
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import debounce from 'lodash/debounce';
export default {
  data() {
    return {
      user: { firstName: '', lastName: '' },
      foundUsers: [],
      message: ''
    };
  },
  methods: {
    submit: debounce(function () {
      axios.post('/users', this.user)
        .then(response => {
          if (typeof response.data === 'string') {
            this.message = response.data;
          } else {
            this.foundUsers = response.data;
            this.message = false;
          }
        });
    }, 500),
    selected(it) {
      this.$router.push(`/users/${it.id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
#findUser {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
div.lastName {
  padding-left: 1vw;
}
td {
  cursor: pointer;
}
</style>
