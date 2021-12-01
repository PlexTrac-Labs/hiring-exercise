<template>
  <div>
    <div class="card border border-dark">
      <div class="card-body">
        <h1>{{ person.firstName }} {{ person.lastName }}</h1>
        <p>Email: {{ person.email }}</p>
        <button class="btn">View User</button>
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
  }
};
</script>
<style lang=""></style>
