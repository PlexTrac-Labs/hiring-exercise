<template>
  <v-card class="mx-auto elevation-12" min-width="500">
    <v-toolbar :color="user.favoriteColor">
      <v-toolbar-title
        left
        :color="getAccentColor(user.favoriteColor)"
        :class="`${getAccentColor(user.favoriteColor)}--text`"
        >Change Password</v-toolbar-title
      >
      <v-icon class="mx-2" :color="getAccentColor(user.favoriteColor)"
        >mdi-lock-reset</v-icon
      >
      <v-spacer></v-spacer>
      <v-btn
        :color="getAccentColor(user.favoriteColor)"
        icon
        @click.stop="close()"
        ><v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-container>
        <form>
          <v-row>
            <v-col>
              <v-text-field
                id="password_userId_field"
                label="User ID"
                v-model="currentUser._id"
                color="black"
                :disabled="!isAtLogin"
                :error-messages="userIdErrors"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                id="password_oldPassword_field"
                label="Previous Password"
                v-model="oldPassword"
                color="black"
                :error-messages="oldPasswordErrors"
                :append-icon="hideOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="hideOldPassword ? 'password' : 'text'"
                @click:append="() => (hideOldPassword = !hideOldPassword)"
                required
                @input="$v.oldPassword.$touch()"
                @blur="$v.oldPassword.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                id="password_newPassword_field"
                label="New Password"
                v-model="newPassword"
                color="black"
                :error-messages="passwordErrors"
                :append-icon="hideNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="hideNewPassword ? 'password' : 'text'"
                @click:append="() => (hideNewPassword = !hideNewPassword)"
                required
                @input="$v.newPassword.$touch()"
                @blur="$v.newPassword.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                id="password_confirmNewPassword_field"
                label="Confirm New Password"
                v-model="confirmNewPassword"
                color="black"
                :error-messages="confirmNewPasswordErrors"
                :append-icon="
                  hideconfirmNewPassword ? 'mdi-eye' : 'mdi-eye-off'
                "
                :type="hideconfirmNewPassword ? 'password' : 'text'"
                @click:append="
                  () => (hideconfirmNewPassword = !hideconfirmNewPassword)
                "
                required
                @input="$v.confirmNewPassword.$touch()"
                @blur="$v.confirmNewPassword.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
        </form>
      </v-container>
      <v-alert
        v-model="showError"
        type="error"
        @click="setError(null)"
        dismissible
        dense
        max-width="500"
      >
        {{ errorMessage }}
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        id="password_cancel_button"
        :color="user.favoriteColor"
        :class="`${getAccentColor(user.favoriteColor)}--text`"
        @click.stop="close()"
      >
        Cancel
      </v-btn>
      <v-btn
        id="password_change_button"
        :disabled="formInvalid"
        :color="user.favoriteColor"
        :class="`${getAccentColor(user.favoriteColor)}--text`"
        @click.stop="save()"
      >
        Change
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { getAccentColor } from "./helpers.js";
import { validationMixin } from "vuelidate";
import { required, sameAs, minLength, not } from "vuelidate/lib/validators";
import {
  containsUpperAndLowercase,
  containsNumber,
  containsSpecialChar,
} from "./validations.js";
import { CONTEXTS } from "./constants.js";

export default {
  name: "ChangePassword",
  props: {
    context: {
      type: String,
      default: CONTEXTS.LOGIN,
    },
    user: {
      type: Object,
      default: () => {
        return {
          username: "",
          password: "",
          email: "",
          firstName: "",
          lastName: "",
          birthYear: "",
          favoriteColor: "#7F50F1FF",
        };
      },
    },
  },
  mixins: [validationMixin],
  validations: {
    currentUser: {
      _id: {
        required,
      },
    },
    oldPassword: {
      required,
    },
    newPassword: {
      required,
      minLength: minLength(10),
      upperLowerCase: containsUpperAndLowercase,
      number: containsNumber,
      specialChar: containsSpecialChar,
      notOldPassword: not(sameAs("oldPassword")),
    },
    confirmNewPassword: { required, sameAsPassword: sameAs("newPassword") },
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      hideOldPassword: true,
      hideNewPassword: true,
      hideconfirmNewPassword: true,
      showError: false,
      errorMessage: "",
      formInvalid: true,
      currentUser: {
        _id: "",
      },
    };
  },
  computed: {
    userIdErrors() {
      const errors = [];
      if (!this.$v.currentUser._id.$dirty) return errors;
      !this.$v.currentUser._id.required && errors.push("User ID is required");
      return errors;
    },
    oldPasswordErrors() {
      const errors = [];
      if (!this.$v.oldPassword.$dirty) return errors;
      !this.$v.oldPassword.required &&
        errors.push("Previous Password is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.required && errors.push("Password is required");
      !this.$v.newPassword.notOldPassword &&
        errors.push("Password must not match previous password");
      !this.$v.newPassword.minLength &&
        errors.push("Password must be at least 10 characters");
      !this.$v.newPassword.upperLowerCase &&
        errors.push("Must contain an upper and a lowercase letter");
      !this.$v.newPassword.number && errors.push("Must contain a number");
      !this.$v.newPassword.specialChar &&
        errors.push("Must contain a special character (!@#$%&?)");
      return errors;
    },
    confirmNewPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmNewPassword.$dirty) return errors;
      !this.$v.confirmNewPassword.sameAsPassword &&
        errors.push("Both password entries must match");
      !this.$v.confirmNewPassword.required &&
        errors.push("Must confirm password");
      return errors;
    },
    isAtLogin() {
      return this.context === this.CONTEXTS.LOGIN;
    },
  },
  methods: {
    ...mapActions(["changePassword"]),
    ...mapMutations(["setError"]),
    getAccentColor,
    close() {
      this.$emit("closePasswordDialog");
    },
    async save() {
      this.$v.$touch();

      if (!this.formInvalid) {
        await this.changePassword({
          id: this.currentUser._id,
          password: this.newPassword,
        }).then(
          (resolve) => {
            console.log(resolve);
            this.close();
          },
          (err) => {
            this.showError = true;
            this.errorMessage = err;
          }
        );
      }
    },
  },
  beforeMount() {
    this.currentUser = this.user;
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
