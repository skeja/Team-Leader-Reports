<template>
  <table class="table">
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Office</th>
      <th>Last report</th>
    </tr>
    <tr
      v-for="{ id, firstName, lastName, office, report } in users"
      :key="id"
      @click="$emit('selected', id)">
      <td>{{ firstName }}</td>
      <td>{{ lastName }}</td>
      <td>{{ office }}</td>
      <td v-if="report">{{ report.createdAt | dateFormatter }}</td>
    </tr>
  </table>
</template>

<script>
import axios from '../../axios-auth.js';
import dateFormatter from '../../filters/dateFormatter';
export default {
  filters: {
    dateFormatter
  },
  props: {
    users: { type: Array, default: () => [] }
  },
  data() {
    return {
      reports: []
    };
  },
  created() {
    axios.get('/reports/users')
      .then(response => {
        this.reports = response.data;
      });
  },
  methods: {
    selected(it) {
      this.$router.push(`/reports/${it}`);
    }
  }
};
</script>

<style lang="scss" scoped>
td {
  cursor: pointer;
}
</style>
