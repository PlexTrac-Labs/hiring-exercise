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
        <button class="btn btn-success mr-1">Edit User</button>
        <button class="btn btn-danger ml-1">Delete User</button>
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
  }
};
</script>
<style scoped>
ul {
  list-style-type: none;
}
</style>
