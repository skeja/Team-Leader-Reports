<template>
  <div class="container">
    <div class="center">
      <report-form :updated-report="report" @submitForm="submit($event)"></report-form>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import ReportForm from './ReportForm.vue';
export default {
  components: {
    ReportForm
  },
  data() {
    return {
      userId: this.$route.params.userId,
      reportId: this.$route.params.reportId,
      report: {}
    };
  },
  created() {
    return axios.get(`/reports/${this.userId}/${this.reportId}`)
      .then(({ data }) => (this.report = data));
  },
  methods: {
    submit(report) {
      return axios.put(`reports/${this.report.id}`, report)
        .then(response => this.$router.push('/reports'));
    }
  }
};
</script>
