<template>
  <div class="container">
    <div class="center">
      <table class="table">
        <tr>
          <th>Team name</th>
        </tr>
        <tr
          v-for="team in teams"
          :key="team.id"
          @click="selected(team.id)">
          <td>{{ team.name }}</td>
        </tr>
      </table>
    </div>
    <i class="material-icons md-60 alt-color add" @click="addTeam">add</i>
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
      this.$router.push(`/teams/${it}`);
    },
    addTeam() {
      this.$router.push({ name: 'newTeam' });
    }
  }

};
</script>

<style lang="scss" scoped>
td{
  cursor: pointer;
  text-align: center;
}

.center {
  position: relative;

  & i {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 1.4em;
    cursor: pointer;
  }
}
</style>
