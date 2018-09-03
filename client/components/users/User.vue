<template>
  <div class="container container-top">
    <div class="center">
      <div class="back-icon" @click="$router.back()">
        <span class="material-icons md-24 alt-color">keyboard_backspace</span>
        Back
      </div>
      <user :user="user"></user>
      <div class="icons">
        <div v-if="isAdmin" class="tooltip">
          <span class="material-icons md-36 alt-color hover" @click="updateUser">edit</span>
          <span class="tooltip-text">Edit user</span>
        </div>
        <div class="tooltip">
          <span class="material-icons md-36 alt-color hover" @click="viewReports">assignment</span>
          <span class="tooltip-text">View reports</span>
        </div>
        <div class="tooltip">
          <span class="material-icons md-36 alt-color hover" @click="showModal = true">delete</span>
          <span class="tooltip-text">Delete user</span>
        </div>
      </div>
      <confirm
        v-if="showModal"
        @confirm="deleteUser"
        @close="showModal = false">
        <div slot="header">Delete user</div>
        <div slot="body">{{ user | fullName }}</div>
      </confirm>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import Confirm from '../common/Confirm';
import UserStore from '../../store/';
import User from '../common/User';
import fullName from '../../filters/fullName';

export default {
  filters: {
    fullName
  },
  components: {
    Confirm,
    User
  },
  data() {
    return {
      id: this.$route.params.userId,
      user: getUserDefaults(),
      showModal: false,
      showLoader: false
    };
  },
  computed: {
    isAdmin() {
      return UserStore.isAdmin();
    }
  },
  created() {
    axios.get(`/users/${this.id}`)
      .then(({ data }) => {
        this.user = data;
      });
  },
  methods: {
    deleteUser() {
      return axios.delete(`/users/${this.id}`)
        .then(response => this.$router.push({ name: 'userIndex' }));
    },
    viewReports() {
      this.$router.push({ name: 'userReports', params: { userId: this.id } });
    },
    updateUser() {
      this.$router.push({ name: 'updateUser', params: { userId: this.id } });
    }
  }
};

function getUserDefaults() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    office: { name: '' },
    team: { name: '' }
  };
}
</script>

<style lang="scss" scoped>
.buttons {
  flex-direction: column;
}

.button {
  margin: 1rem;
}
</style>
