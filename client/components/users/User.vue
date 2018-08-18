<template>
  <div class="container container-top">
    <div class="center">
      <div class="back-icon" @click="$router.back()">
        <i class="material-icons md-24 alt-color">keyboard_backspace</i>
        Back
      </div>
      <div class="card">
        <div class="card-row">
          <i class="material-icons md-24 main-color icon-align">
            person
          </i>
          <div class="card-item">
            {{ user | fullName }}
          </div>
        </div>
        <div class="card-row">
          <i class="material-icons md-24 main-color icon-align">
            email
          </i>
          <div class="card-item">
            {{ user.email }}
          </div>
        </div>
        <div class="card-row">
          <i class="material-icons md-24 main-color icon-align">
            laptop_mac
          </i>
          <div class="card-item">
            {{ role }}
          </div>
        </div>
        <div class="card-row">
          <i class="material-icons md-24 main-color icon-align">
            home
          </i>
          <div class="card-item">
            {{ user.office }}
          </div>
        </div>
        <div class="card-row">
          <i class="material-icons md-24 main-color icon-align">
            people
          </i>
          <div class="card-item">
            {{ user.team }}
          </div>
        </div>
      </div>
      <div class="icons">
        <div class="tooltip">
          <i class="material-icons md-36 alt-color hover" @click="updateUser">edit</i>
          <span class="tooltiptext">Edit user</span>
        </div>
        <div class="tooltip">
          <i class="material-icons md-36 alt-color hover" @click="viewReports">assignment</i>
          <span class="tooltiptext">View reports</span>
        </div>
        <div class="tooltip">
          <i class="material-icons md-36 alt-color hover" @click="showModal = true">delete</i>
          <span class="tooltiptext">Delete user</span>
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
      user: {},
      showModal: false
    };
  },
  computed: {
    role() {
      return capitalize(replace(this.user.role, '_', ' '));
    }
  },
  created() {
    axios.get(`/users/${this.id}`)
      .then(({ data }) => {
        this.user = data;
      })
      .then(() => axios.get(`/teams/${this.user.team}`))
      .then(({ data }) => {
        this.user.team = data.name;
      });
  },
  methods: {
    deleteUser() {
      return axios.delete(`/users/${this.id}`)
        .then(response => this.$router.push('/users'));
    },
    viewReports() {
      this.$router.push(`/reports/users/${this.$route.params.userId}`);
    },
    updateUser() {
      this.$router.push({ name: 'updateUser', params: { userId: this.id } });
    }
  }
};
</script>

<style lang="scss" scoped>

.buttons {
  flex-direction: column;
}

.button {
  margin: 1rem;
}
</style>
