<template>
  <div class="container">
    <div class="center">
      <table class="table">
        <tr>
          <td>First Name</td>
          <td>{{ user.firstName }}</td>
        </tr>
        <tr>
          <td>Last name</td>
          <td>{{ user.lastName }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{ user.email }}</td>
        </tr>
        <tr>
          <td>Role</td>
          <td>{{ user.role }}</td>
        </tr>
        <tr>
          <td>Office</td>
          <td>{{ user.office }}</td>
        </tr>
      </table>
      <div class="buttons">
        <button class="button" @click="goToList">Go to list</button>
        <button
          class="button"
          type="button"
          @click="deleteUser">
          Delete user
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';

export default {
  data() {
    return {
      id: this.$route.params.userId,
      user: {}
    };
  },
  created() {
    axios.get(`/users/${this.id}`)
      .then(response => {
        this.user = response.data;
      });
  },
  methods: {
    deleteUser() {
      if (!confirm('Deleting user')) return;
      axios.delete(`/users/${this.id}`)
        .then(response => this.$router.push('/users/findUser'));
    },
    goToList() {
      this.$router.push('/users');
    }
  }
};
</script>

<style lang="scss" scoped>
td {
  &:nth-child(even) {
    color: #4971b2;
    text-align: center;
  }
  width: 50vw;
}

.buttons {
  padding: 1%;
  display: flex;
  justify-content: space-around;
}

.button {
  max-width: 10rem;
}
</style>
