<template>
  <div class="row">
    <div class="col-12">
      <h1>Reset Password</h1>
      <h6>Set your new password</h6>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-6 offset-3">
      <form v-on:submit="reset">
        <div class="form-group">
          <label for="oldPasswordInput">Enter Old Password</label>
          <input
            type="password"
            class="form-control"
            id="oldPasswordInput"
            aria-describedby="emailHelp"
            placeholder="Old Password"
            required
            v-model="oldPassword"
          />
        </div>
        <div class="form-group">
          <label for="newPasswordInput">New Password</label>
          <input
            type="password"
            class="form-control"
            id="newPasswordInput"
            placeholder="New Password"
            required
            v-model="newPassword"
          />
        </div>
        <div class="form-group">
          <label for="newPasswordInput2">Confirm New Password</label>
          <input
            type="password"
            class="form-control"
            id="newPasswordInput2"
            placeholder="Confirm New Password"
            required
            v-model="passwordConfirm"
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
      oldPassword: "",
      newPassword: "",
      passwordConfirm: ""
    };
  },
  methods: {
    reset() {
      if (this.oldPassword == this.newPassword) {
        return; //TODO Alerts
      } else if (this.newPassword != this.passwordConfirm) {
        return; //TODO Alerts
      } else {
        this.$store.dispatch("resetPassword", {
          _id: this.$route.params.userId,
          password: this.newPassword
        });
      }
    }
  }
};
</script>
<style scoped>
label {
  text-align: left !important;
}
</style>
