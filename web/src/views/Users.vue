<template>
  <v-container>
    <v-row>
      users and stuff
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Users",
  components: {},
  data: () => ({}),
  created() {
    this.$store.dispatch("getUsers", this.$http);
  },
  methods: {
    async login(username, password) {
      console.log("logging in with: ", username, password);
      try {
        this.loading = true;
        // TODO: keep track of the returned auth_token for future requests
        await this.$http({
          method: "post",
          url: "http://localhost:5000/authenticate",
          data: {
            username,
            password // this is 100% not secure (with http) :) TODO: stop this?
          },
          headers: {
            "Content-Type": "application/json"
          }
        });
        this.$store.commit("LOGIN");
        this.$router.push("/Landing");
      } catch (err) {
        console.error("ERROR LOGGING IN: ", err);
        console.log(err.response.status);
        const { status } = err.response;
        if (status === 401) {
          this.errorMessages = ["Incorrect Username or Password"];
        } else {
          this.errorMessages = [err.message]; // TODO: very user un-friendly error, but more useful than nothing :)
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
