<template>
  <div class="container container-top">
    <div class="center">
      <div class="back-icon" @click="$router.back()">
        <span class="material-icons md-24 alt-color">keyboard_backspace</span>
        Back
      </div>
      <div class="card">
        <div class="card-row">
          <span class="material-icons md-24 main-color icon-align">
            person
          </span>
          <div class="card-item">
            {{ user | fullName }}
          </div>
        </div>
        <div class="card-row">
          <span class="material-icons md-24 main-color icon-align">
            email
          </span>
          <div class="card-item">
            {{ user.email }}
          </div>
        </div>
        <div class="card-row">
          <span class="material-icons md-24 main-color icon-align">
            laptop_mac
          </span>
          <div class="card-item">
            {{ role }}
          </div>
        </div>
        <div class="card-row">
          <span class="material-icons md-24 main-color icon-align">
            home
          </span>
          <div class="card-item">
            {{ user.office }}
          </div>
        </div>
        <div class="card-row">
          <span class="material-icons md-24 main-color icon-align">
            people
          </span>
          <div class="card-item">
            {{ teamName }}
          </div>
        </div>
      </div>
      <div class="icons">
        <div class="tooltip">
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
import fullName from '../../filters/fullName';
import { capitalize, replace } from 'lodash';
import Confirm from '../common/Confirm.vue';

export default {
  components: {
    Confirm
  },
  filters: {
    fullName
  },
  data() {
    return {
      id: this.$route.params.userId,
      user: getUserDefaults(),
      showModal: false
    };
  },
  computed: {
    role() {
      return capitalize(replace(this.user.role, '_', ' '));
    },
    teamName() {
      return capitalize(this.user.team.name);
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
        .then(response => this.$router.push({ name: 'findUser' }));
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
    office: '',
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
