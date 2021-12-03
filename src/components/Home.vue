<template>
  <div class="row mb-3">
    <div class="col">
      <button
        class="btn btn-primary"
        v-if="loggedInUser"
        @click="openResetPage()"
      >
        Reset Password
      </button>
    </div>
    <div class="col">
      <button class="btn btn-danger" v-if="loggedInUser">Logout</button>
    </div>
  </div>
  <div class="row">
    <div class="col-sm" v-for="user in users" v-bind:key="user.id">
      <User :person="user" v-bind:key="user.id" />
    </div>
  </div>
</template>

<script>
import User from "./User.vue";

export default {
  name: "Home",
  props: {},
  computed: {
    users() {
      return this.$store.getters.users;
    },
    loggedInUser() {
      return this.$store.getters.userId;
    }
  },
  created() {
    this.$store.dispatch("listUsers");
  },
  components: {
    User
  },
  methods: {
    openResetPage() {
      this.$router.push("/passwordReset/" + this.loggedInUser);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
