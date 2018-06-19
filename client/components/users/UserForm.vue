<template>
  <form
    class="form"
    @submit.prevent="$emit('submitUser', user);">
    <div
      :class="{ form__error: $v.user.firstName.$error }"
      class="form__group">
      <label
        class="form__label">First name</label>
      <input
        v-model="$v.user.firstName.$model"
        class="form__input"
        type="text">
    </div>
    <div
      v-if="!$v.user.firstName.required"
      :class="{ form__error: $v.user.firstName.$error }"
      class="error">Field is required.
    </div>
    <div
      v-if="!$v.user.firstName.minLength"
      :class="{ form__error: $v.user.firstName.$error }"
      class="error">Name must have at least
      {{ $v.user.firstName.$params.minLength.min }} letters.
    </div>
    <div
      :class="{ form__error: $v.user.lastName.$error }"
      class="form__group">
      <label
        :class="{ form__error: $v.user.lastName.$error }"
        class="form__label">Last name</label>
      <input
        v-model="$v.user.lastName.$model"
        class="form__input"
        type="text">
    </div>
    <div
      v-if="!$v.user.lastName.required"
      :class="{ form__error: $v.user.lastName.$error }"
      class="error">Field is required.
    </div>
    <div
      v-if="!$v.user.lastName.minLength"
      :class="{ form__error: $v.user.lastName.$error }"
      class="error">Name must have at least
      {{ $v.user.lastName.$params.minLength.min }} letters.
    </div>
    <div
      :class="{ form__error: $v.user.email.$error }"
      class="form__group">
      <label
        :class="{ form__error: $v.user.email.$error }"
        class="form__label">Email</label>
      <input
        v-model="$v.user.email.$model"
        class="form__input"
        type="email">
    </div>
    <div
      v-if="!$v.user.email.required"
      :class="{ form__error: $v.user.email.$error }"
      class="error">Field is required.
    </div>
    <div
      v-if="!$v.user.email.email"
      :class="{ form__error: $v.user.email.$error }"
      class="error">Email format not correct
    </div>
    <div v-if="!updatedUser">
      <div
        :class="{ form__error: $v.user.password.$error }"
        class="form__group">
        <label
          :class="{ form__error: $v.user.password.$error }"
          class="form__label">Password</label>
        <input
          v-model="$v.user.password.$model"
          class="form__input"
          type="password">
      </div>
      <div
        v-if="!$v.user.password.required"
        :class="{ form__error: $v.user.password.$error }"
        class="error">Field is required.
      </div>
      <div
        v-if="!$v.user.password.minLength"
        :class="{ form__error: $v.user.password.$error }"
        class="error">Name must have at least
        {{ $v.user.password.$params.minLength.min }} letters.
      </div>
    </div>
    <div
      class="form__group">
      <label
        class="form__label">Role</label>
      <select v-model="$v.user.role.$model">
        <option
          value=""
          selected
          disabled
          hidden>Select role</option>
        <option value="DEVELOPER" selected>Developer</option>
        <option value="TEAM_LEAD">Team Lead</option>
        <option value="ADMIN">Admin</option>
      </select>
    </div>
    <div
      :class="{ form__error: $v.user.office.$error }"
      class="form__group">
      <label
        :class="{ form__error: $v.user.office.$error }"
        class="form__label">Office</label>
      <input
        v-model="$v.user.office.$model"
        class="form__input"
        type="text">
    </div>
    <div
      v-if="!$v.user.office.required"
      :class="{ form__error: $v.user.office.$error }"
      class="error">Field is required.
    </div>
    <div
      v-if="!$v.user.office.minLength"
      :class="{ form__error: $v.user.office.$error }"
      class="error">Name must have at least
      {{ $v.user.office.$params.minLength.min }} letters.
    </div>
    <div class="form__buttons">
      <button
        :disabled="$v.$invalid"
        class="button"
        type="submit">
        Submit
      </button>
      <button
        v-if="updatedUser"
        class="button"
        type="button"
        @click="setUpdatedUser">
        Reset
      </button>
    </div>
  </form>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
export default {
  props: {
    updatedUser: { type: Object, default: null }
  },
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        office: ''
      },
      validator: {
        user: {
          firstName: {
            required,
            minLength: minLength(2)
          },
          lastName: {
            required,
            minLength: minLength(2)
          },
          email: {
            required,
            email
          },
          role: {
            required
          },
          office: {
            required,
            minLength: minLength(2)
          }
        }
      }
    };
  },
  created() {
    if (this.updatedUser) this.user = { ...this.updatedUser };
  },
  methods: {
    emitData() {
      this.$emit('submitUser', this.user);
    },
    setUpdatedUser() {
      this.user = { ...this.updatedUser };
    }
  },
  validations() {
    if (this.updatedUser) {
      return this.validator;
    } else {
      this.validator.user.password = {
        required,
        minLength: minLength(4)
      };
      return this.validator;
    }
  }
};
</script>

<style lang="scss" scoped>
input:focus {
  outline: none;
  border-color: #a7a5a5;

  .form__error & {
    border-color: #f79483;
  }
}

.error {
  color:#f57f6c;
  font-size: 0.75rem;
  display: none;
  margin-left: 14px;
  margin-top: -1.6rem;
  margin-bottom: 0.475rem;

  &.form__error {
    display: block;
  }
}

.form__buttons {
  display: flex;
  justify-content: space-around;
}
</style>
