<template>
  <div class="container container-top">
    <loader v-if="showLoader"></loader>
    <div v-else class="center">
      <div class="back-icon" @click="$router.back()">
        <span class="material-icons md-24 alt-color">keyboard_backspace</span>
        Back
      </div>
      <div class="name">
        Team: {{ team.name }}
      </div>
      <table v-if="users.length" class="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Office</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id">
            <td>{{ user | fullName }}</td>
            <td v-if="user.office">{{ user.office.name }}</td>
            <td v-else class="td-warning">No office</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="name warning">
        Team have no users
      </div>
      <div class="icons">
        <div v-if="isAdmin" class="tooltip">
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
      <members
        v-if="addUser"
        @close="addUser = false"
        @addUser="addMember($event)">
        <div slot="body">Add member</div>
      </members>
    </div>
    <span
      v-if="isAdmin"
      class="material-icons md-60 alt-color add"
      @click="addUser = true">
      add
    </span>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import fullName from '../../filters/fullName';
import Confirm from '../common/Confirm';
import Members from '../common/Members';
import Loader from '../common/Loader';
import Promise from 'bluebird';
import UserStore from '../../store';

export default {
  components: {
    Confirm,
    Members,
    Loader
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
      showLoader: true,
      addUser: false
    };
  },
  computed: {
    isAdmin() {
      return UserStore.isAdmin();
    }
  },
  created() {
    const teamUrl = `/teams/${this.id}`;
    const teamUsersUrl = `/teams/${this.id}/users`;
    Promise.join(axios.get(teamUrl), axios.get(teamUsersUrl), Promise.delay(500))
      .spread((teamData, userListData) => {
        this.team = teamData.data;
        this.users = userListData.data;
        this.showLoader = false;
      });
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
