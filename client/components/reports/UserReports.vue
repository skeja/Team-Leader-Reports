<template>
  <div class="container">
    <div class="center">
      <div class="name">
        {{ user.firstName }}
        {{ user.lastName }}
      </div>
      <table class="table">
        <tr>
          <th >Reporter</th>
          <th>Created</th>
          <th>Updated</th>
        </tr>
        <tr
          v-for="report in reports"
          :key="report.id"
          @click="selected(report.id)">
          <td>{{ report.reporter.firstName }} {{ report.reporter.firstName }}</td>
          <td>{{ report.createdAt | dateFormatter }}</td>
          <td>{{ report.updatedAt | dateFormatter }}</td>
        </tr>
      </table>
      <button class="button buttons" @click="goBack">Back</button>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth.js';
import dateFormatter from '../../filters/dateFormatter';
import sortBy from 'lodash/sortBy';

export default {
  filters: {
    dateFormatter
  },
  data() {
    return {
      userId: this.$route.params.userId,
      user: {},
      reports: []
    };
  },
  created() {
    return axios.get(`/users/${this.userId}`)
      .then(({ data }) => (this.user = data))
      .then(() => axios.get(`/reports/${this.userId}`))
      .then(({ data }) => {
        this.reports = data;
        this.reports = sortBy(this.reports, ['reporter.lastName']);
      });
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    selected(it) {
      this.$router.push(`/reports/${this.userId}/${it}`);
    },
    sort(it) {
      this.reports = sortBy(this.reports, it);
      console.log(this.reports);
    }
  }
};
</script>

<style lang="scss" scoped>
td {
  cursor: pointer;
}
.buttons {
  margin-top: 1rem;
}
</style>
