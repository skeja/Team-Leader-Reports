<template>
  <table class="table">
    <tr>
      <th>Name</th>
      <th>Office</th>
      <th>Last report</th>
    </tr>
    <tr
      v-for="user in users"
      :key="user.id"
      @click="$emit('selected', user.id)">
      <td>{{ user | fullName }}</td>
      <td>{{ user.office }}</td>
      <td v-if="user.report">{{ user.report.createdAt | dateFormatter }}</td>
      <td v-else class="td-warning">No report</td>
    </tr>
  </table>
</template>

<script>
import axios from '../../axios-auth.js';
import dateFormatter from '../../filters/dateFormatter';
import fullName from '../../filters/fullName';

export default {
  filters: {
    dateFormatter,
    fullName
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
  }
};
</script>

<style lang="scss" scoped>
td {
  cursor: pointer;
}

.td-warning {
  color: #E74C3C;
}
</style>
