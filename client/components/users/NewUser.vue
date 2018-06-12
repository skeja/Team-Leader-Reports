<template>
  <div class="container">
    <div class="center">
      <form
        class="form"
        @submit.prevent="submit">
        <div
          :class="{ form__error: $v.newUser.firstName.$error }"
          class="form__group">
          <label
            class="form__label">First name</label>
          <input
            v-model="$v.newUser.firstName.$model"
            class="form__input"
            type="text">
        </div>
        <div
          v-if="!$v.newUser.firstName.required"
          :class="{ form__error: $v.newUser.firstName.$error }"
          class="error">Field is required.
        </div>
        <div
          v-if="!$v.newUser.firstName.minLength"
          :class="{ form__error: $v.newUser.firstName.$error }"
          class="error">Name must have at least
          {{ $v.newUser.firstName.$params.minLength.min }} letters.
        </div>

        <div
          :class="{ form__error: $v.newUser.lastName.$error }"
          class="form__group">
          <label
            :class="{ form__error: $v.newUser.lastName.$error }"
            class="form__label">Last name</label>
          <input
            v-model="$v.newUser.lastName.$model"
            class="form__input"
            type="text">
        </div>
        <div
          v-if="!$v.newUser.lastName.required"
          :class="{ form__error: $v.newUser.lastName.$error }"
          class="error">Field is required.
        </div>
        <div
          v-if="!$v.newUser.lastName.minLength"
          :class="{ form__error: $v.newUser.lastName.$error }"
          class="error">Name must have at least
          {{ $v.newUser.lastName.$params.minLength.min }} letters.
        </div>

        <div
          :class="{ form__error: $v.newUser.email.$error }"
          class="form__group">
          <label
            :class="{ form__error: $v.newUser.email.$error }"
            class="form__label">Email</label>
          <input
            v-model="$v.newUser.email.$model"
            class="form__input"
            type="email">
        </div>
        <div
          v-if="!$v.newUser.email.required"
          :class="{ form__error: $v.newUser.email.$error }"
          class="error">Field is required.
        </div>
        <div
          v-if="!$v.newUser.email.email"
          :class="{ form__error: $v.newUser.email.$error }"
          class="error">Email format not correct
        </div>

        <div
          :class="{ form__error: $v.newUser.password.$error }"
          class="form__group">
          <label
            :class="{ form__error: $v.newUser.password.$error }"
            class="form__label">Password</label>
          <input
            v-model="$v.newUser.password.$model"
            class="form__input"
            type="password">
        </div>
        <div
          v-if="!$v.newUser.password.required"
          :class="{ form__error: $v.newUser.password.$error }"
          class="error">Field is required.
        </div>
        <div
          v-if="!$v.newUser.password.minLength"
          :class="{ form__error: $v.newUser.password.$error }"
          class="error">Name must have at least
          {{ $v.newUser.password.$params.minLength.min }} letters.
        </div>

        <div
          class="form__group">
          <label
            class="form__label">Role</label>
          <select v-model="$v.newUser.role.$model">
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
          :class="{ form__error: $v.newUser.office.$error }"
          class="form__group">
          <label
            :class="{ form__error: $v.newUser.office.$error }"
            class="form__label">Office</label>
          <input
            v-model="$v.newUser.office.$model"
            class="form__input"
            type="text">
        </div>
        <div
          v-if="!$v.newUser.office.required"
          :class="{ form__error: $v.newUser.office.$error }"
          class="error">Field is required.
        </div>
        <div
          v-if="!$v.newUser.office.minLength"
          :class="{ form__error: $v.newUser.office.$error }"
          class="error">Name must have at least
          {{ $v.newUser.office.$params.minLength.min }} letters.
        </div>

        <button :disabled="$v.$invalid" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import { required, minLength, email } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      newUser: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        office: ''
      }
    };
  },
  methods: {
    submit() {
      axios.post('/newUser', this.newUser)
        .then(response => {
          console.log(response);
          this.$router.push('/');
        });
    }
  },
  validations: {
    newUser: {
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
</script>

<style lang="scss" scoped>
input:focus {
  outline: none;
  border-color: rgb(167, 165, 165);
  .form__error & {
    border-color: #f79483;
  }
}
.form {
  width: 20vw;
}
.form__group {
  margin-bottom: 2rem;
}
.form__label {
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
  margin-left: 0.8rem;
  display: block;
}
.form__input {
  font-size: 0.875rem;
  // font-weight: 300;
  line-height: 2rem;
  min-height: 2rem;
  position: relative;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  background: #fff;
  padding: 0 0.8rem;
  width: 100%;
  box-sizing: border-box;
}
.error {
  color:#f57f6c;
  font-size: 0.75rem;
  display: none;
  margin-left: 14px;
  margin-top: -1.6rem;
  margin-bottom: 0.475rem;
  .form__error & {
    display: block;
  }
}
.form__error {
  display: block;
  color: #f57f6c;
  border-color: #f79483;
}
</style>
