<template>
  <div class="row mb-3 border-bottom border-dark">
    <div class="col-3">
      <div class="border border-dark p-3 bg-light">
        <h3>
          Welcome {{ loggedInUser.firstName }} {{ loggedInUser.lastName }}
        </h3>
        <button
          class="btn btn-primary mr-3 mb-3"
          v-if="loggedInUser"
          @click="openResetPage()"
        >
          Reset Password
        </button>
        <button
          class="btn btn-danger mb-3"
          v-if="loggedInUser"
          @click="logout()"
        >
          Logout
        </button>
      </div>
    </div>
    <div class="col-5 offset-1">
      <p>
        {{ loggedInUser.firstName }}, welcome to the user management system!
        This system is designed to help you with all your user management needs.
        Here's a few things you can acomplish:
      </p>
      <ol>
        <li>View users and user information</li>
        <li>Edit and remove users</li>
        <li>Change your password</li>
      </ol>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <h2 class="mb-3"><b>Current Users</b></h2>
    </div>
  </div>
  <div class="row">
    <div class="col mt-3" v-for="user in users" v-bind:key="user.id">
      <User :person="user" v-bind:key="user.id" />
    </div>
  </div>
</template>

<script>
import User from "./User.vue";

export default {
  name: "Home",
  props: {},
  mounted() {
    this.$store.dispatch("getUserById", { _id: this.loggedInUserId });
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    loggedInUserId() {
      return this.$store.getters.userId;
    },
    loggedInUser() {
      return this.$store.getters.user;
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
      this.$router.push("/passwordReset/" + this.loggedInUserId);
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ol {
  text-align: left;
}
p {
  text-align: left;
}
</style>
