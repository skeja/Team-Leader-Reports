<template>
  <div class="container container-top">
    <div class="center">
      <div class="back-icon" @click="$router.back()">
        <i class="material-icons md-24 alt-color">keyboard_backspace</i>
        Back
      </div>
      <div class="name">
        {{ user | fullName }}
      </div>
      <table v-if="reports.length > 0" class="table">
        <tr>
          <th >Reporter</th>
          <th>Created</th>
          <th>Updated</th>
        </tr>
        <tr
          v-for="report in reports"
          :key="report.id"
          @click="selected(report.id)">
          <td>{{ report.reporter | fullName }}</td>
          <td>{{ report.createdAt | dateFormatter }}</td>
          <td>{{ report.updatedAt | dateFormatter }}</td>
        </tr>
      </table>
      <div v-else class="name warning">
        User have no reports
      </div>
    </div>
    <i class="material-icons md-60 alt-color add" @click="addReport">
      add
    </i>
  </div>
</template>

<script>
import axios from '../../axios-auth.js';
import dateFormatter from '../../filters/dateFormatter';
import fullName from '../../filters/fullName';
import sortBy from 'lodash/sortBy';

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
    selected(it) {
      this.$router.push({ name: 'report', params: { userId: this.userId, reportId: it } });
    },
    sort(it) {
      this.reports = sortBy(this.reports, it);
      console.log(this.reports);
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
