<template>
  <div>
    <div class="card border border-dark bg-light">
      <div class="card-body">
        <h1>{{ person.firstName }} {{ person.lastName }}</h1>
        <p>Email: {{ person.email }}</p>
        <button class="btn btn-primary" @click="viewUser()">View User</button>
        <!-- set on click to get user by id and push to new page or modal with user info -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "User",
  props: {
    person: Object
  },
  methods: {
    viewUser() {
      this.$router.push({
        name: "userView",
        params: { userId: this.person._id }
      });
    }
  }
};
</script>
<style scoped></style>
