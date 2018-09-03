<template>
  <div class="card">
    <div class="card-row">
      <span class="material-icons md-24 main-color icon-align">
        person
      </span>
      <div class="card-item">
        {{ user | fullName }}
      </div>
    </div>
    <div class="card-row">
      <span class="material-icons md-24 main-color icon-align">
        email
      </span>
      <div class="card-item">
        {{ user.email }}
      </div>
    </div>
    <div class="card-row">
      <span class="material-icons md-24 main-color icon-align">
        laptop_mac
      </span>
      <div class="card-item">
        {{ role }}
      </div>
    </div>
    <div class="card-row">
      <span class="material-icons md-24 main-color icon-align">
        home
      </span>
      <div class="card-item">
        <span v-if="user.office">
          {{ user.office.name }}
        </span>
        <span v-else>No office</span>
      </div>
    </div>
    <div class="card-row">
      <span class="material-icons md-24 main-color icon-align">
        people
      </span>
      <div class="card-item">
        <span v-if="user.team">
          {{ teamName }}
        </span>
        <span v-else>No team</span>
      </div>
    </div>
  </div>
</template>

<script>
import fullName from '../../filters/fullName';
import { capitalize, replace } from 'lodash-es';

export default {
  filters: {
    fullName
  },
  props: {
    user: { type: Object, default: () => {} }
  },
  computed: {
    role() {
      return capitalize(replace(this.user.role, '_', ' '));
    },
    teamName() {
      return capitalize(this.user.team.name);
    }
  }
};
</script>

<style>

</style>
