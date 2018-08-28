<template>
  <input
    v-model="input"
    type="text"
    class="form__input"
    placeholder="search..."
    @input="filterUsers(input)">
</template>

<script>
import { debounce, filter } from 'lodash-es';

export default {
  props: {
    users: { type: Array, default: () => [] }
  },
  data() {
    return {
      input: '',
      filteredUsers: this.users
    };
  },
  mounted() {
    this.filteredUsers = this.users;
  },
  methods: {
    filterUsers: debounce(function (input) {
      const query = input.toLowerCase();
      this.filteredUsers = filter(this.users, ({ firstName = '', lastName = '' }) => {
        return firstName.toLowerCase().includes(query) ||
        lastName.toLowerCase().includes(query);
      });
      this.$emit('search', this.filteredUsers);
    }, 500)
  }

};
</script>
