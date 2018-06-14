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
      <div class="button-delete">
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
    axios.post(`/users/${this.id}`, { id: this.id })
      .then(response => {
        this.user = response.data;
      });
  },
  methods: {
    deleteUser() {
      axios.delete(`/users/${this.id}`)
        .then(
          this.$router.push('/users/findUser')
        );
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
.button-delete {
  margin-left: auto;
  margin-top: 1rem;
  padding-right: 2rem;
}
</style>
