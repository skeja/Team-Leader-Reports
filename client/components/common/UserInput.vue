<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-input">
            <div class="modal-input-title">
              <slot name="body">
                default body
              </slot>
            </div>
            <input
              v-model="search"
              type="text"
              class="form__input"
              @input="findUsers">
          </div>
          <div>
            <table class="table modal-table">
              <tr
                v-for="user in users"
                :key="user.id"
                @click="$emit('addUser', user)">
                <td>{{ user | fullName }}</td>
                <td v-if="user.team">{{ user.team.name }}</td>
                <td v-else class="warning">No team</td>
              </tr>
            </table>
          </div>
          <div class="modal-buttons">
            <button @click="$emit('close')">
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from '../../axios-auth';
import { debounce, sortBy } from 'lodash-es';
import fullName from '../../filters/fullName';

export default {
  filters: {
    fullName
  },
  data() {
    return {
      users: [],
      search: ''
    };
  },
  methods: {
    findUsers: debounce(function () {
      return axios.get('/users', { params: { search: this.search } })
        .then(({ data }) => {
          this.users = sortBy(data, [user => user.lastName.toLowerCase()]);
        });
    }, 500)
  }
};
</script>
