<template>
  <div class="container">
    <div class="center">
      <select v-model="selected" @change="setUpdatedUser">
        <option
          value=""
          selected
          hidden>
          Select user
        </option>
        <option
          v-for="user in users"
          :key="user.id"
          :value="user">
          {{ `${user.firstName} ${user.lastName}` }}
        </option>
      </select>
      <div v-if="selected">
        <form class="form" @submit.prevent="submit">

          <div
            :class="{ form__error: $v.updatedUser.firstName.$error }"
            class="form__group">
            <label class="form__label">First Name</label>
            <input
              v-model="$v.updatedUser.firstName.$model"
              class="form__input"
              type="text">
          </div>
          <div
            v-if="!$v.updatedUser.firstName.required"
            :class="{ form__error: $v.updatedUser.firstName.$error }"
            class="error">Field is required.
          </div>
          <div
            v-if="!$v.updatedUser.firstName.minLength"
            :class="{ form__error: $v.updatedUser.firstName.$error }"
            class="error">Name must have at least
            {{ $v.updatedUser.firstName.$params.minLength.min }} letters.
          </div>

          <div
            :class="{ form__error: $v.updatedUser.lastName.$error }"
            class="form__group">
            <label class="form__label">Last Name</label>
            <input
              v-model="$v.updatedUser.lastName.$model"
              class="form__input"
              type="text">
          </div>
          <div
            v-if="!$v.updatedUser.lastName.required"
            :class="{ form__error: $v.updatedUser.lastName.$error }"
            class="error">Field is required.
          </div>
          <div
            v-if="!$v.updatedUser.lastName.minLength"
            :class="{ form__error: $v.updatedUser.lastName.$error }"
            class="error">Name must have at least
            {{ $v.updatedUser.lastName.$params.minLength.min }} letters.
          </div>

          <div
            :class="{ form__error: $v.updatedUser.email.$error }"
            class="form__group">
            <label class="form__label">Email</label>
            <input
              v-model="$v.updatedUser.email.$model"
              class="form__input"
              type="email">
          </div>
          <div
            v-if="!$v.updatedUser.email.required"
            :class="{ form__error: $v.updatedUser.email.$error }"
            class="error">Field is required.
          </div>
          <div
            v-if="!$v.updatedUser.email.email"
            :class="{ form__error: $v.updatedUser.email.$error }"
            class="error">Email format not correct
          </div>

          <div class="form__group">
            <label class="form__label">Role</label>
            <select v-model="selected.role">
              <option value="ADMIN">Admin</option>
              <option value="DEVELOPER">Developer</option>
              <option value="TEAM_LEAD">Team Lead</option>
            </select>
          </div>

          <div
            :class="{ form__error: $v.updatedUser.office.$error }"
            class="form__group">
            <label class="form__label">Office</label>
            <input
              v-model="$v.updatedUser.office.$model"
              class="form__input"
              type="text">
          </div>
          <div
            v-if="!$v.updatedUser.office.required"
            :class="{ form__error: $v.updatedUser.office.$error }"
            class="error">Field is required.
          </div>
          <div
            v-if="!$v.updatedUser.office.minLength"
            :class="{ form__error: $v.updatedUser.office.$error }"
            class="error">Name must have at least
            {{ $v.updatedUser.office.$params.minLength.min }} letters.
          </div>

          <div class="form__buttons">
            <button
              :disabled="$v.$invalid"
              class="button"
              type="submit">
              Submit
            </button>
            <button
              class="button"
              type="button"
              @click="setUpdatedUser">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import sortBy from 'lodash/sortBy';
import { required, minLength, email } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      users: [],
      selected: '',
      updatedUser: {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        office: ''
      }
    };
  },
  created() {
    axios.get('/users')
      .then(response => {
        this.users = response.data;
        this.users = sortBy(this.users, ['lastName']);
      });
  },
  methods: {
    submit() {
      axios.put(`/users/${this.selected.id}`, this.updatedUser)
        .then(
          this.$router.push('/users/findUser')
        );
    },
    setUpdatedUser() {
      this.updatedUser = { ...this.selected };
    }
  },
  validations: {
    updatedUser: {
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
</script>

<style lang="scss" scoped>
select {
  margin-bottom: 10px;
}
.form__buttons {
  display: flex;
  justify-content: space-around;
}
input:focus {
  outline: none;
  border-color: #a7a5a5;
  .form__error & {
    border-color: #f79483
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
</style>
