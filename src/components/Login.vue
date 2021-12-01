<template>
  <div class="row">
    <h1 class="col-12">Please Login</h1>
  </div>
  <div class="row mt-4">
    <div class="col-6 offset-3">
      <form>
        <div class="form-group">
          <label for="emailInput">Email address</label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="passwordInput">Password</label>
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
label {
  text-align: left !important;
}
</style>
