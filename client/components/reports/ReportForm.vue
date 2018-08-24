<template>
  <form
    :value="newReport"
    class="form"
    @input="$emit('input', $event.target.value)"
    @submit.prevent="$emit('submitForm')">
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

export default {
  props: {
    report: { type: Object, default: () => {} }
  },
  data() {
    return {
      newReport: {
        content: ''
      }
    };
  },
  computed: {
    content() {
      return this.$v.newReport.content;
    }
  },
  watch: {
    newReport() {
      this.report.content = this.newReport.content;
    }
  },
  validations: {
    newReport: {
      content: {
        required
      }
    }
  }
};
</script>
