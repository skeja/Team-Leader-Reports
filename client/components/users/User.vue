<template>
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
        console.log(response);
        this.user = response.data;
      });
  }
};
</script>

<style lang="scss" scoped>
.center {
  margin: 10px 20px;
  padding-top: 20px;
  border-radius: 0%;
}
td {
  &:nth-child(even) {
    color: #4971b2;
    text-align: center;
  }
  width: 50vw;
}
</style>
