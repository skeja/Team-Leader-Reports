<template>
  <div class="sidebar">
    <ul>
      <router-link to="/users/findUser" tag="li">Find User</router-link>
      <router-link to="/users/newUser" tag="li">Create User</router-link>
      <router-link to="/users/updateUser" tag="li">Update User</router-link>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  float: left;
  height: 90vh;
  width: 15%;
  background: #283648;
  margin-top: 5px;
  margin-left: 5px;
  border-radius: 10px;
}
ul {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 10px;
  background: #283648;
  border-radius: 10px;
  margin: 0;
  color: white;
  li {
    padding: 10px 20px;
    &:hover {
      cursor: pointer;
      background: rgba(0, 0, 0, 0.336);
    }

    &.router-link-exact-active {
      background: rgba(0, 0, 0, 0.336);
    }
  }
}
</style>
