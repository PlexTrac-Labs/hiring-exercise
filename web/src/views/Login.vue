<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="username"
          placeholder="< Username >"
          :error-messages="errorMessages"
          :loading="loading"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="password"
          placeholder="< Password >"
          :error-messages="errorMessages"
          :loading="loading"
          :type="showPassword ? 'text' : 'password'"
          @keyup.enter.native="connect(password)"
        >
          <v-icon
            v-if="showPassword"
            slot="append"
            color="grey"
            @click="toggleShowPassword"
          >
            far fa-eye-slash
          </v-icon>
          <v-icon
            v-if="!showPassword"
            slot="append"
            color="grey"
            @click="toggleShowPassword"
          >
            far fa-eye
          </v-icon>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
        color="info"
        :disabled="!Boolean(password && username)"
        @click="login(username, password)"
      >
        login
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data: () => ({
    password: "",
    username: "",
    errorMessages: [],
    showPassword: false,
    loading: false
  }),
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
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
        this.$store.commit("CHANGE_PAGE_NAME", "Landing");
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
