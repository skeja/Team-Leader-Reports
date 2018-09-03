<template>
  <div>
    <div
      :class="{ form__error: $v.password.$error }"
      class="form__group">
      <label class="form__label">Enter password</label>
      <input
        v-model="$v.password.$model"
        type="password"
        class="form__input">
    </div>
    <div
      v-if="$v.password.$error && !$v.password.required"
      class="error">
      Field is required.
    </div>
    <div
      v-if="$v.password.$error && !$v.password.minLength"
      class="error">
      Name must have at least
      {{ $v.password.$params.minLength.min }} letters.
    </div>
    <div
      :class="{ form__error: $v.matchPassword.$error }"
      class="form__group">
      <label class="form__label">Retype password</label>
      <input
        v-model="$v.matchPassword.$model"
        type="password"
        class="form__input">
    </div>
    <div
      v-if="$v.matchPassword.$error && !$v.matchPassword.required"
      class="error">
      Field is required.
    </div>
    <div
      v-if="$v.matchPassword.$error && !$v.matchPassword.minLength"
      class="error">
      Name must have at least
      {{ $v.matchPassword.$params.minLength.min }} letters.
    </div>
    <div class="buttons">
      <button
        class="button button-cancel"
        @click="$emit('close')">
        Cancel
      </button>
      <button
        :disabled="!checkPassword"
        class="button"
        @click="$emit('update', password)">
        Update
      </button>
    </div>

  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      password: '',
      matchPassword: ''
    };
  },
  computed: {
    checkPassword() {
      if (!this.password) return false;
      if ((this.password === this.matchPassword) && !this.$v.$invalid) return true;
      return false;
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(5)
    },
    matchPassword: {
      required,
      minLength: minLength(5)
    }
  }

};
</script>

<style lang="scss" scoped>
.error {
  color:#f57f6c;
  font-size: 0.75rem;
  margin-left: 14px;
  margin-top: -1.6rem;
  margin-bottom: 0.475rem;
}

</style>
