<template>
  <div class="container">
    <div class="center">
      <div class="back-icon" @click="$router.back()">
        <span class="material-icons md-24 alt-color">keyboard_backspace</span>
        <span>
          Back
        </span>
      </div>
      <div class="report">
        <div class="report-title">
          Report:
          <span>
            {{ user | fullName }}
          </span>
        </div>
        <div class="report-item-label">
          Reporter:
          <span>
            {{ report.reporter | fullName }}
          </span>
        </div>
        <div v-if="updating">
          <textarea
            v-model="report.content"
            class="textarea">
          </textarea>
        </div>
        <div v-else class="report-content inner-shadow">
          <span class="material-icons icon-right" @click="updating = !updating">
            edit
          </span>
          <vue-showdown :markdown="report.content" :options="{ tables: true }"></vue-showdown>
        </div>
        <div class="report-dates">
          <div class="report-date">
            <span>
              Created:
            </span>
            <span>
              {{ report.createdAt | dateFormatter }}
            </span>
          </div>
          <div class="report-date">
            <span>
              Last modified:
            </span>
            <span>
              {{ report.updatedAt | dateFormatter }}
            </span>
          </div>
        </div>
      </div>
      <div class="buttons">
        <div v-if="!updating" class="tooltip">
          <span
            class="material-icons md-36 main-color hover"
            @click="showDeleteModal = true">
            delete
          </span>
          <span class="tooltip-text">Delete user</span>
        </div>
        <template v-else>
          <button class="button button-cancel" @click="reset">Cancel</button>
          <button class="button" @click="showUpdateModal = true">Update</button>
        </template>
      </div>
      <confirm
        v-if="showUpdateModal"
        @confirm="update"
        @close="showUpdateModal = false">
        <div slot="header">Update report?</div>
      </confirm>
      <confirm
        v-if="showDeleteModal"
        @confirm="remove"
        @close="showDeleteModal = false">
        <div slot="header">Delete report?</div>
      </confirm>
    </div>
  </div>
</template>

<script>
import { VueShowdown } from 'vue-showdown';

import axios from '../../axios-auth';
import fullName from '../../filters/fullName';
import dateFormatter from '../../filters/dateFormatter';
import UserStore from '../../store';
import Confirm from '../common/Confirm.vue';

export default {
  components: {
    Confirm,
    VueShowdown
  },
  filters: {
    fullName,
    dateFormatter
  },
  data() {
    return {
      userId: this.$route.params.userId,
      reportId: this.$route.params.reportId,
      report: {
        content: ''
      },
      originalReport: {},
      user: {},
      updating: false,
      showDeleteModal: false,
      showUpdateModal: false
    };
  },
  created() {
    return axios.get(`/users/${this.userId}`)
      .then(({ data }) => (this.user = data))
      .then(() => axios.get(`/reports/${this.userId}/${this.reportId}`))
      .then(({ data }) => {
        this.report = { ...data };
        this.originalReport = { ...data };
      });
  },
  methods: {
    update() {
      const data = {
        id: this.report.id,
        content: this.report.content,
        reporterId: UserStore.state.currentUser.id,
        subjectId: this.userId
      };
      axios.put(`reports/${this.report.id}`, data)
        .then(response => this.$router.push({
          name: 'userReports', params: { userId: this.userId }
        }));
    },
    reset() {
      this.report = this.originalReport;
      this.updating = false;
    },
    remove() {
      return axios.delete(`/reports/${this.report.id}`)
        .then(response => this.$router.push({ name: 'userReports' }));
    }
  }
};
</script>

<style lang="scss" scoped>
.center{
  position: relative;
}

.tooltip {
  margin-left: auto;
}

.icon-right {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
