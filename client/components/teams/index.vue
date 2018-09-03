<template>
  <div class="container container-top">
    <div class="center">
      <table class="table">
        <thead>
          <tr>
            <th>Team name</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="team in teams"
            :key="team.id"
            @click="viewTeam(team.id)">
            <td>{{ team.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <span
      v-if="isAdmin"
      class="material-icons md-60 alt-color add"
      @click="addTeam">
      add
    </span>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import UserStore from '../../store';

export default {
  data() {
    return {
      teams: []
    };
  },
  computed: {
    isAdmin() {
      return UserStore.isAdmin();
    }
  },
  created() {
    axios.get('/teams')
      .then(({ data }) => {
        this.teams = data;
      });
  },
  methods: {
    viewTeam(id) {
      this.$router.push({ name: 'team', params: { id } });
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
</style>
