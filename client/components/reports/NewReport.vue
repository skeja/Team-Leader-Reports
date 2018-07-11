<template>
  <div class="container">
    <div class="center">
      <div class="name">
        {{ user | fullName }}
      </div>
      <report-form @submitForm="submit($event)"></report-form>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import ReportForm from './ReportForm.vue';
import fullName from '../../filters/fullName';

export default {
  filters: {
    fullName
  },
  components: {
    ReportForm
  },
  data() {
    return {
      id: this.$route.params.userId,
      user: {}
    };
  },
  created() {
    axios.get(`users/${this.id}`)
      .then(({ data }) => (this.user = data));
  },
  methods: {
    submit(report) {
      if (confirm('Submit report?')) {
        axios.post(`/reports/${this.id}/newReport`, report)
          .then(response => this.$router.push('/reports'));
      }
    }
  }
};
</script>
