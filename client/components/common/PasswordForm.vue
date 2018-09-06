<template>
  <div>
    <div
      :class="{ form__error: $v.password.$error }"
      class="form__group">
      <label class="form__label">Enter password</label>
      <input
        v-model="$v.password.$model"
        placeholder="Enter password.."
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
      <label class="form__label">Repeat password</label>
      <input
        v-model="$v.matchPassword.$model"
        placeholder="Enter password.."
        type="password"
        class="form__input">
    </div>
    <div
      v-if="$v.matchPassword.$error && !$v.matchPassword.sameAsPassword"
      class="error">
      Passwords must be identical
    </div>
    <div class="buttons">
      <button
        class="button button-cancel"
        @click="$emit('close')">
        Cancel
      </button>
      <button
        :disabled="!$v.$isInvalid"
        class="button"
        @click="$emit('submit', password)">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      password: '',
      matchPassword: ''
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(5)
    },
    matchPassword: {
      sameAsPassword: sameAs('password')
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
