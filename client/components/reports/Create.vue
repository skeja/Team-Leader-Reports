<template>
  <div class="container">
    <div class="center">
      <div class="name">
        {{ user | fullName }}
      </div>
      <report-form v-model="report.content" @submitForm="showModal = true"></report-form>
      <confirm
        v-if="showModal"
        @close="showModal = false"
        @confirm="submit($event)">
        <div slot="header">Submit report?</div>
      </confirm>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import ReportForm from './ReportForm';
import fullName from '../../filters/fullName';
import Confirm from '../common/Confirm';
import UserStore from '../../store';

export default {
  filters: {
    fullName
  },
  components: {
    ReportForm,
    Confirm
  },
  data() {
    return {
      id: this.$route.params.userId,
      user: {},
      showModal: false,
      report: {
        content: '',
        subjectId: this.$route.params.userId,
        reporterId: UserStore.state.currentUser.id
      }
    };
  },
  created() {
    axios.get(`users/${this.id}`)
      .then(({ data }) => (this.user = data));
  },
  methods: {
    submit() {
      axios.post(`/reports/${this.id}`, this.report)
        .then(response => this.$router.push({ name: 'userReports' }));
    }
  }
};
</script>
