<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card class="mx-auto elevation-10" max-width="450">
              <v-toolbar color="primary">
                <v-toolbar-title left class="white--text"
                  >Welcome</v-toolbar-title
                >
              </v-toolbar>
              <v-card-text>
                <v-text-field
                  id="welcome_username_field"
                  label="Username"
                  v-model="username"
                  color="black"
                  :error-messages="usernameErrors"
                  required
                  @input="$v.username.$touch()"
                  @blur="$v.username.$touch()"
                ></v-text-field>
                <v-text-field
                  id="welcome_password_field"
                  label="Password"
                  v-model="password"
                  :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="hidePassword ? 'password' : 'text'"
                  @click:append="() => (hidePassword = !hidePassword)"
                  :error-messages="passwordErrors"
                  required
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  id="welcome_changePassword_button"
                  class="ma-2"
                  color="primary"
                  @click.stop="showChangePasswordDialog = true"
                  >Change Password</v-btn
                >
                <v-spacer />
                <v-btn
                  id="welcome_register_button"
                  class="ma-2"
                  color="primary"
                  @click.stop="showRegistrationDialog = true"
                >
                  Register
                </v-btn>
                <v-btn
                  id="welcome_login_button"
                  class="ma-2"
                  color="primary"
                  :disabled="formInvalid"
                  @click="login()"
                >
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer />
          <v-col
            ><v-alert
              v-model="showError"
              type="error"
              @click="setError(null)"
              dismissible
              dense
              max-width="450"
            >
              {{ errorMessage }}
            </v-alert>
          </v-col>
          <v-spacer />
        </v-row>
        <v-dialog
          v-model="showChangePasswordDialog"
          persistent
          :key="getUniqueKey()"
        >
          <change-password
            :context="CONTEXTS.LOGIN"
            @closePasswordDialog="showChangePasswordDialog = false"
          >
          </change-password>
        </v-dialog>
        <v-dialog
          v-model="showRegistrationDialog"
          persistent
          :key="getUniqueKey()"
        >
          <user-dialog @closeDialog="showRegistrationDialog = false">
          </user-dialog>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { getUniqueKey } from "./helpers.js";
import ChangePassword from "./ChangePassword.vue";
import { CONTEXTS } from "./constants.js";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import UserDialog from "./UserDialog.vue";

export default {
  name: "Welcome",
  components: {
    ChangePassword,
    UserDialog,
  },
  mixins: [validationMixin],
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
  },
  data() {
    return {
      username: "",
      password: "",
      hidePassword: true,
      showChangePasswordDialog: false,
      showRegistrationDialog: false,
      showError: false,
      errorMessage: "",
      formInvalid: true,
    };
  },
  computed: {
    ...mapState({
      isLoading: "isLoading",
      authState: "authState",
      users: "users",
      error: "error",
    }),
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
  },
  methods: {
    ...mapActions(["authenticate", "getAllUsers"]),
    ...mapMutations(["setError"]),
    async login() {
      this.$v.$touch();

      if (!this.formInvalid) {
        await this.authenticate({
          username: this.username,
          password: this.password,
        }).then(
          (res) => {
            console.log(res);
          },
          (err) => {
            this.showError = true;
            this.errorMessage = err;
          }
        );
      }
    },
    getUniqueKey,
  },
  created() {
    this.CONTEXTS = CONTEXTS;
  },
  watch: {
    "$v.$invalid": function () {
      this.formInvalid = this.$v.$invalid;
    },
  },
};
</script>

<style></style>
