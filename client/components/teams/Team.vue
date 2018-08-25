<template>
  <div class="container">
    <div class="center">
      <div class="back-icon" @click="$router.back()">
        <span class="material-icons md-24 alt-color">keyboard_backspace</span>
        Back
      </div>
      <div class="name">
        Team: {{ team.name }}
      </div>
      <table v-if="users.length" class="table">
        <tr>
          <th>User</th>
          <th>Office</th>
        </tr>
        <tr
          v-for="user in users"
          :key="user.id">
          <td>{{ user | fullName }}</td>
          <td v-if="user.office">{{ user.office.name }}</td>
          <td v-else class="td-warning">No office</td>
        </tr>
      </table>
      <div v-else class="name warning">
        Team have no users
      </div>
      <div class="icons">
        <div class="tooltip">
          <span class="material-icons md-36 alt-color hover" @click="showModal = true">delete</span>
          <span class="tooltip-text">Delete team</span>
        </div>
      </div>
      <confirm
        v-if="showModal"
        @close="showModal = false"
        @confirm="remove">
        <div slot="header">Delete team:</div>
        <div slot="body">{{ team.name }}</div>
      </confirm>
      <user-input
        v-if="addUser"
        @close="addUser = false"
        @addUser="addMember($event)">
        <div slot="body">Add member</div>
      </user-input>
    </div>
    <span class="material-icons md-60 alt-color add" @click="addUser = true">add</span>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import fullName from '../../filters/fullName';
import Confirm from '../common/Confirm.vue';
import UserInput from '../common/UserInput';

export default {
  components: {
    Confirm,
    UserInput
  },
  filters: {
    fullName
  },
  data() {
    return {
      id: this.$route.params.id,
      team: {},
      users: [],
      userList: [],
      toggle: true,
      showModal: false,
      addUser: false
    };
  },
  created() {
    return axios.get(`/teams/${this.id}`)
      .then(({ data }) => (this.team = data))
      .then(() => axios.get(`/teams/${this.id}/users`))
      .then(({ data }) => (this.users = data));
  },
  methods: {
    remove() {
      axios.delete(`/teams/${this.id}`)
        .then(this.$router.push({ name: 'teamList' }));
    },
    addMember(user) {
      return axios.put(`/teams/${this.id}`, user)
        .then(this.users.push(user))
        .catch(() => this.users.pop());
    }
  }
};
</script>

<style lang="scss" scoped>
.icons {
  justify-content: flex-end;
  padding-top: 1rem;
}
</style>
