<template>
  <div class="row">
    <h1 class="col-12">Please Login</h1>
  </div>
  <div class="row mt-4">
    <div class="col-6 offset-3">
      <form v-on:submit="submit">
        <div class="form-group">
          <label for="userNameInput">Username</label>
          <input
            class="form-control"
            id="userNameInput"
            aria-describedby="emailHelp"
            placeholder="Username"
            required
            v-model="username"
          />
        </div>
        <div class="form-group">
          <label for="passwordInput">Password</label>
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            placeholder="Password"
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
