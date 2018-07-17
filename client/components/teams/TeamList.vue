<template>
  <div class="container">
    <div class="center">
      <table class="table">
        <tr>
          <th></th>
          <th>Team name</th>
        </tr>
        <tr
          v-for="team in teams"
          :key="team.id"
          @click="selected(team.id)">
          <td>{{ team.id }}</td>
          <td>{{ team.name }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';

export default {
  data() {
    return {
      teams: []
    };
  },
  created() {
    axios.get('/teams')
      .then(({ data }) => {
        this.teams = data;
      });
  },
  methods: {
    selected(it) {
      console.log(it);
    }
  }

};
</script>

<style lang="scss" scoped>
  td{
    cursor: pointer;
  }
</style>
