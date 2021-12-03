<template>
  <div class="row">
    <h1 class="col-12">Please Login</h1>
  </div>
  <div class="row mt-4">
    <div class="col-6 offset-3">
      <form v-on:submit="submit" class="border border-dark p-5">
        <div class="form-group form-horizontal control-label text-left">
          <label for="userNameInput">Username</label>
          <input
            class="form-control bg-light"
            id="userNameInput"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            required
            v-model="username"
          />
        </div>
        <div class="form-group form-horizontal control-label text-left">
          <label for="passwordInput">Password</label>
          <input
            type="password"
            class="form-control bg-light"
            id="passwordInput"
            placeholder="Enter password"
            required
            v-model="password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let payload = {
        username: this.username,
        password: this.password
      };
      this.$store.dispatch("authenticate", payload);
    }
  }
};
</script>
<style scoped>
label {
  text-align: left !important;
}
</style>
