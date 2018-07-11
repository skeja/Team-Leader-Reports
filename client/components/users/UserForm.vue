<template>
  <form
    class="form"
    @submit.prevent="$emit('submitUser', user);">

    <div
      :class="{ form__error: firstName.$error }"
      class="form__group">
      <label class="form__label">First name</label>
      <input
        v-model="firstName.$model"
        class="form__input"
        type="text">
    </div>
    <div
      v-if="firstName.$error && !firstName.required"
      class="error">Field is required.
    </div>
    <div
      v-if="firstName.$error && !firstName.minLength"
      class="error">Name must have at least
      {{ firstName.$params.minLength.min }} letters.
    </div>

    <div
      :class="{ form__error: lastName.$error }"
      class="form__group">
      <label class="form__label">Last name</label>
      <input
        v-model="lastName.$model"
        class="form__input"
        type="text">
    </div>
    <div
      v-if="lastName.$error && !lastName.required"
      class="error">Field is required.
    </div>
    <div
      v-if="lastName.$error && !lastName.minLength"
      class="error">Name must have at least
      {{ lastName.$params.minLength.min }} letters.
    </div>

    <div
      :class="{ form__error: email.$error }"
      class="form__group">
      <label class="form__label">Email</label>
      <input
        v-model="email.$model"
        class="form__input"
        type="email">
    </div>
    <div
      v-if="email.$error && !email.required"
      class="error">Field is required.
    </div>
    <div
      v-if="email.$error && !email.email"
      class="error">Email format not correct
    </div>

    <div v-if="!updatedUser">
      <div
        :class="{ form__error: password.$error }"
        class="form__group">
        <label class="form__label">Password</label>
        <input
          v-model="password.$model"
          class="form__input"
          type="password">
      </div>
      <div
        v-if="password.$error && !password.required"
        class="error">Field is required.
      </div>
      <div
        v-if="password.$error && !password.minLength"
        class="error">Name must have at least
        {{ password.$params.minLength.min }} letters.
      </div>
    </div>

    <div
      class="form__group">
      <label
        class="form__label">Role</label>
      <select v-model="role.$model">
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
      :class="{ form__error: office.$error }"
      class="form__group">
      <label class="form__label">Office</label>
      <input
        v-model="office.$model"
        class="form__input"
        type="text">
    </div>
    <div
      v-if="office.$error && !office.required"
      class="error">Field is required.
    </div>
    <div
      v-if="office.$error && !office.minLength"
      class="error">Name must have at least
      {{ office.$params.minLength.min }} letters.
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
    updatedUser: { type: Object, default: () => {} }
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
          password: {
            required,
            minLength: minLength(4)
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
  computed: {
    firstName() {
      return this.$v.user.firstName;
    },
    lastName() {
      return this.$v.user.lastName;
    },
    email() {
      return this.$v.user.email;
    },
    password() {
      return this.$v.user.password;
    },
    role() {
      return this.$v.user.role;
    },
    office() {
      return this.$v.user.office;
    }
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
    if (this.updatedUser) delete this.validator.user.password;
    return this.validator;
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
  margin-left: 14px;
  margin-top: -1.6rem;
  margin-bottom: 0.475rem;
}

.form__buttons {
  display: flex;
  justify-content: space-around;
}
</style>
