<template>
  <form
    class="form"
    @submit.prevent="$emit('submitForm', report)">
    <div
      :class="{ form__error: content.$error }"
      class="form__group">
      <label class="form__label">Content</label>
      <textarea
        v-model="content.$model"
        :class="{ form__error: content.$error }"
        class="form_input textarea">
      </textarea>
    </div>

    <div class="form_buttons">
      <button
        :disabled="$v.$invalid"
        class="button">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import UserStore from '../../store/store';

export default {
  props: {
    updatedReport: { type: Object, default: () => {} }
  },
  data() {
    return {
      report: {
        content: '',
        subjectId: this.$route.params.userId,
        reporterId: UserStore.state.currentUser.id
      }
    };
  },
  computed: {
    content() {
      return this.$v.report.content;
    }
  },
  watch: {
    updatedReport(val) {
      if (val) this.report = { ...val };
      this.report.subjectId = this.$route.params.userId;
      this.report.reporterId = UserStore.state.currentUser.id;
    }
  },
  created() {
    if (this.updatedReport) this.report = { ...this.updatedReport };
  },
  validations: {
    report: {
      content: {
        required
      },
      subjectId: {
        required
      },
      reporterId: {
        required
      }
    }
  }
};
</script>
