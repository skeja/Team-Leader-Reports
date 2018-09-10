<template>
  <div class="container">
    <error-message v-if="showErrorModal">
      <div slot="message">{{ message }}</div>
    </error-message>
    <div v-else class="center">
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
import ErrorMessage from '../common/ErrorMessage';
import { delay } from 'lodash-es';

export default {
  filters: {
    fullName
  },
  components: {
    ReportForm,
    Confirm,
    ErrorMessage
  },
  data() {
    return {
      id: this.$route.params.userId,
      user: {},
      showModal: false,
      showErrorModal: false,
      report: {
        content: '',
        subjectId: this.$route.params.userId,
        reporterId: UserStore.state.currentUser.id
      }
    };
  },
  created() {
    axios.get(`users/${this.id}`)
      .then(({ data }) => (this.user = data))
      .catch(({ response }) => {
        this.showErrorModal = true;
        this.message = response.data;
        delay(() => {
          this.showErrorModal = false;
          this.$router.push({ name: 'userIndex' });
        }, 2000);
      });
  },
  methods: {
    submit() {
      axios.post(`/reports/${this.id}`, this.report)
        .then(response => this.$router.push({ name: 'userReports' }));
    }
  }
};
</script>
