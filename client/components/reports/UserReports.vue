<template>
  <div class="container container-top">
    <div class="center">
      <div class="back-icon" @click="$router.back()">
        <span class="material-icons md-24 alt-color">keyboard_backspace</span>
        Back
      </div>
      <div class="name">
        {{ user | fullName }}
      </div>
      <table v-if="reports.length > 0" class="table">
        <thead>
          <tr>
            <th>Reporter</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="report in reports"
            :key="report.id"
            @click="viewReport(report.id)">
            <td>{{ report.reporter | fullName }}</td>
            <td>{{ report.createdAt | dateFormatter }}</td>
            <td>{{ report.updatedAt | dateFormatter }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="name warning">
        User have no reports
      </div>
    </div>
    <span class="material-icons md-60 alt-color add" @click="addReport">
      add
    </span>
  </div>
</template>

<script>
import axios from '../../axios-auth.js';
import dateFormatter from '../../filters/dateFormatter';
import fullName from '../../filters/fullName';
import { sortBy } from 'lodash-es';

export default {
  filters: {
    dateFormatter,
    fullName
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
        this.reports = sortBy(data, ['reporter.lastname']);
      });
  },
  methods: {
    viewReport(reportId) {
      this.$router.push({ name: 'report', params: { userId: this.userId, reportId } });
    },
    sort(it) {
      this.reports = sortBy(this.reports, it);
    },
    addReport() {
      this.$router.push({ name: 'newReport', params: { userId: this.userId } });
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
  width: 50%;
}

</style>
