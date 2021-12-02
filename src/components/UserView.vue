<template>
  <div class="row">
    <div class="card col-6 offset-3">
      <div class="card-body">
        <h3>{{ user.firstName }} {{ user.lastName }}</h3>
        <ul>
          <li>Username: {{ user.username }}</li>
          <li>Email: {{ user.email }}</li>
          <li>Is Admin: {{ user.admin }}</li>
        </ul>
        <button
          class="btn btn-success mr-1"
          data-toggle="modal"
          data-target="#editUserModal"
        >
          Edit User
        </button>
        <button class="btn btn-danger ml-1" @click="deleteUser()">
          Delete User
        </button>
      </div>
    </div>
    <!-- MODAL TODO clean this up > too long-->
    <div
      class="modal fade"
      id="editUserModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editUserModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editUserModalLabel">Edit User Info</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              id="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- EDIT FORM -->
            <form @submit.prevent="updateUser()">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input
                  class="form-control"
                  id="firstName"
                  placeholder="Enter First Name"
                  v-model="firstName"
                />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input
                  class="form-control"
                  id="lastName"
                  placeholder="Enter Last Name"
                  v-model="lastName"
                />
              </div>
              <div class="form-group">
                <label for="emailInput">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="emailInput"
                  placeholder="Enter Email"
                  v-model="email"
                />
              </div>
              <div class="form-group">
                <label for="userName">Username</label>
                <input
                  class="form-control"
                  id="userName"
                  placeholder="Enter Username"
                  v-model="username"
                />
              </div>
              <button type="submit" class="btn btn-primary mt-3">Submit</button>
            </form>
            <!-- END FORM -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch("getUserById", { _id: this.$route.params.userId });
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  data: function() {
    return {
      // FIXME update user pull, not updating on user switch, have to refresh page > Data evals before computed
      username: this.$store.getters.user.username,
      firstName: this.$store.getters.user.firstName,
      lastName: this.$store.getters.user.lastName,
      email: this.$store.getters.user.email
    };
  },
  methods: {
    updateUser() {
      this.$store.dispatch("updateUser", {
        _id: this.$route.params.userId,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        admin: false
      });
      // eslint-disable-next-line no-undef
      $("#close").click();
    },
    deleteUser() {
      this.$store.dispatch("deleteUser", { _id: this.$route.params.userId });
    }
  }
};
</script>
<style scoped>
ul {
  list-style-type: none;
}
</style>
