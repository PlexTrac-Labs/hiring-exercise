<template>
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
    }
  },
  created() {
    this.$store.dispatch("listUsers");
  },
  components: {
    User
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
