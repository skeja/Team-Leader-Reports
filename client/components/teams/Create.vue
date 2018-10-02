<template>
  <div class="container">
    <div class="center">
      <div class="back-icon" @click="$router.back()">
        <span class="material-icons md-24 alt-color">keyboard_backspace</span>
        Back
      </div>
      <form
        class="form"
        @submit.prevent="showModal = true">
        <div
          :class="{ form__error: name.$error }"
          class="form__group">
          <label class="form__label">Name</label>
          <input
            ref="nameInput"
            v-model="name.$model"
            class="form__input"
            type="text">
        </div>
        <div class="form_buttons">
          <button
            :disabled="$v.$invalid"
            class="button">
            Submit
          </button>
        </div>
      </form>
      <confirm
        v-if="showModal"
        @close="showModal = false"
        @confirm="submit">
        <div slot="header">Create team:</div>
        <div slot="body">{{ team.name }}</div>
      </confirm>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import { required } from 'vuelidate/lib/validators';
import Confirm from '../common/Confirm';

export default {
  components: {
    Confirm
  },
  data() {
    return {
      team: {
        name: ''
      },
      showModal: false
    };
  },
  computed: {
    name() {
      return this.$v.team.name;
    }
  },
  mounted() {
    this.$refs.nameInput.focus();
  },
  methods: {
    submit() {
      axios.post('/teams', this.team)
        .then(response => this.$router.push({ name: 'teamList' }));
    }
  },
  validations: {
    team: {
      name: {
        required
      }
    }
  }
};
</script>
