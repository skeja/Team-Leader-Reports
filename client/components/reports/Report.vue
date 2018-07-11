<template>
  <div class="container">
    <i class="fas fa-pen"></i>
    <div class="center">
      <div class="name">
        {{ user | fullName }}

      </div>
      <div class="report">
        <div class="report-title">
          Report
        </div>
        <div class="report-item-label">
          Reporter
        </div>
        <div class="report-item inner-shadow">
          {{ report.reporter | fullName }}
        </div>
        <div class="report-item-label">
          Content
        </div>
        <div>
          <textarea
            v-if="updating"
            v-model="report.content"
            class="textarea">
          </textarea>
        </div>
        <div v-if="!updating" class="report-content inner-shadow">
          <i
            class="fas fa-pencil-alt icon-right"
            @click="updating = !updating"></i>
          {{ report.content }}
        </div>
        <div class="report-dates">
          <div class="report-date">
            <span>
              Created:
            </span>
            <span class="inner-shadow">
              {{ report.createdAt | dateFormatter }}
            </span>
          </div>
          <div class="report-date">
            <span>
              Last modified:
            </span>
            <span class="inner-shadow">
              {{ report.updatedAt | dateFormatter }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="!updating" class="buttons">
        <button class="button" @click="goBack">Back</button>
        <button class="button" @click="remove">Delete</button>
      </div>
      <div v-if="updating" class="buttons">
        <button class="button button-cancel" @click="reset">Cancel</button>
        <button class="button" @click="update">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import fullName from '../../filters/fullName';
import dateFormatter from '../../filters/dateFormatter';
import UserStore from '../../store/store';

export default {
  filters: {
    fullName,
    dateFormatter
  },
  data() {
    return {
      userId: this.$route.params.userId,
      reportId: this.$route.params.reportId,
      subjectId: this.$route.params.userId,
      report: {},
      originalReport: {},
      user: {},
      updating: false
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
    goBack() {
      this.$router.back();
    },
    update() {
      const data = {
        id: this.report.id,
        content: this.report.content,
        reporterId: UserStore.state.currentUser.id,
        subjectId: this.subjectId
      };
      axios.put(`reports/${this.report.id}`, data)
        .then(response => this.$router.push(`/reports/${data.subjectId}`));
    },
    reset() {
      this.report = this.originalReport;
      this.updating = false;
    },
    remove() {
      if (!confirm('Deleting report')) return;
      axios.delete(`/reports/${this.report.id}`)
        .then(response => this.$router.push('/reports'));
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  margin-left: auto;
  margin-top: 0.5em;
  max-width: 50%;
}
a  i{
  margin-top: 0.5em;
  cursor: pointer;
}
.icon-right {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

</style>
