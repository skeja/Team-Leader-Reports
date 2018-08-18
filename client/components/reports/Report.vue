<template>
  <div class="container">
    <i class="fas fa-pen"></i>
    <div class="center">
      <div class="back-icon" @click="$router.back()">
        <i class="material-icons md-24 alt-color">keyboard_backspace</i>
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
        <div>
          <textarea
            v-if="updating"
            v-model="report.content"
            class="textarea">
          </textarea>
        </div>
        <div v-if="!updating" class="report-content inner-shadow">
          <i class="material-icons icon-right" @click="updating = !updating">
            edit
          </i>
          {{ report.content }}
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
      <div v-if="!updating" class="buttons">
        <button class="button" @click="showModal = true">Delete</button>
      </div>
      <div v-if="updating" class="buttons">
        <button class="button button-cancel" @click="reset">Cancel</button>
        <button class="button" @click="update">Update</button>
      </div>
      <confirm
        v-if="showModal"
        @confirm="remove"
        @close="showModal = false">
        <div slot="header">Delete Report?</div>
      </confirm>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import fullName from '../../filters/fullName';
import dateFormatter from '../../filters/dateFormatter';
import UserStore from '../../store';
import Confirm from '../common/Confirm.vue';

export default {
  components: {
    Confirm
  },
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
      updating: false,
      showModal: false
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
      return axios.delete(`/reports/${this.report.id}`)
        .then(response => this.$router.push('/reports'));
    }
  }
};
</script>

<style lang="scss" scoped>
.center{
  position: relative;
}

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

.back-icon{
  top: 0;
  left: 0;
  padding: 1rem;
}
</style>
