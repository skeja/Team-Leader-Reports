<template>
  <div class="container container-top">
    <loader v-if="showLoader"></loader>
    <div v-else class="center">
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
            class="pointer"
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
import Loader from '../common/Loader';
import Promise from 'bluebird';

export default {
  filters: {
    dateFormatter,
    fullName
  },
  components: {
    Loader
  },
  data() {
    return {
      userId: this.$route.params.userId,
      user: {},
      reports: [],
      showLoader: true
    };
  },
  created() {
    const userUrl = `/users/${this.userId}`;
    const reportsUrl = `/reports/${this.userId}`;
    Promise.join(axios.get(userUrl), axios.get(reportsUrl), Promise.delay(500))
      .spread((userData, reportData) => {
        this.user = userData.data;
        this.reports = reportData.data;
        this.showLoader = false;
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
.buttons {
  margin-top: 1rem;
  width: 50%;
}
</style>
