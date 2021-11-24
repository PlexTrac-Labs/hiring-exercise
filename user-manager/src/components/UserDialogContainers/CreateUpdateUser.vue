<template>
  <div>
    <v-container v-if="isCreatingUser">
      <form>
        <v-row>
          <v-col>
            <v-text-field
              id="create_username_field"
              label="Username"
              v-model="currentUser.username"
              color="black"
              @change="updateUser()"
              :error-messages="usernameErrors"
              required
              @input="$v.currentUser.username.$touch()"
              @blur="$v.currentUser.username.$touch()"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              id="create_password_field"
              label="Password"
              v-model="currentUser.password"
              color="black"
              @change="updateUser()"
              :error-messages="passwordErrors"
              :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="hidePassword ? 'password' : 'text'"
              @click:append="() => (hidePassword = !hidePassword)"
              required
              @input="$v.currentUser.password.$touch()"
              @blur="$v.currentUser.password.$touch()"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              id="create_confirmPassword_field"
              label="Confirm Password"
              v-model="currentUser.confirmPassword"
              color="black"
              @change="updateUser()"
              :error-messages="confirmPasswordErrors"
              :append-icon="hideConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="hideConfirmPassword ? 'password' : 'text'"
              @click:append="() => (hideConfirmPassword = !hideConfirmPassword)"
              required
              @input="$v.currentUser.confirmPassword.$touch()"
              @blur="$v.currentUser.confirmPassword.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              id="create_email_field"
              label="Email"
              v-model="currentUser.email"
              color="black"
              @change="updateUser()"
              :error-messages="emailErrors"
              required
              @input="$v.currentUser.email.$touch()"
              @blur="$v.currentUser.email.$touch()"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              id="create_firstname_field"
              label="First Name"
              v-model="currentUser.firstName"
              color="black"
              @change="updateUser()"
              :error-messages="firstNameErrors"
              required
              @input="$v.currentUser.firstName.$touch()"
              @blur="$v.currentUser.firstName.$touch()"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              id="create_lastname_field"
              label="Last Name"
              v-model="currentUser.lastName"
              color="black"
              @change="updateUser()"
              :error-messages="lastNameErrors"
              required
              @input="$v.currentUser.lastName.$touch()"
              @blur="$v.currentUser.lastName.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-autocomplete
              id="create_birthyear_field"
              label="Birth Year"
              v-model="currentUser.birthYear"
              color="black"
              :items="generateYears()"
              @change="updateUser()"
              :error-messages="birthYearErrors"
              required
              @input="$v.currentUser.birthYear.$touch()"
              @blur="$v.currentUser.birthYear.$touch()"
            >
            </v-autocomplete>
          </v-col>
          <v-spacer />
          <v-col cols="7">
            <span>Choose Your Favorite Color</span>
            <v-color-picker
              id="create_favoriteColor_field"
              class="mt-2 favoriteColor_field"
              v-model="currentUser.favoriteColor"
              hide-inputs
              mode="rgba"
              @input="updateUser()"
            ></v-color-picker>
          </v-col>
        </v-row>
      </form>
    </v-container>
    <v-container v-if="isUpdatingUser">
      <v-row>
        <v-col cols="4">
          <v-text-field
            id="update_username_field"
            label="Username"
            v-model="currentUser.username"
            color="black"
            @change="updateUser()"
            :error-messages="usernameErrors"
            required
            @input="$v.currentUser.username.$touch()"
            @blur="$v.currentUser.username.$touch()"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            id="update_email_field"
            label="Email"
            v-model="currentUser.email"
            color="black"
            @change="updateUser()"
            :error-messages="emailErrors"
            required
            @input="$v.currentUser.email.$touch()"
            @blur="$v.currentUser.email.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-btn
            id="update_changePassword_button"
            :class="`${getAccentColor(currentUser.favoriteColor)}--text my-2`"
            :color="currentUser.favoriteColor"
            @click.stop="showChangePasswordDialog = true"
            >Change Password<v-icon
              small
              :color="getAccentColor(currentUser.favoriteColor)"
              class="mx-2"
              >mdi-lock-reset</v-icon
            ></v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            id="update_firstname_field"
            label="First Name"
            v-model="currentUser.firstName"
            color="black"
            @change="updateUser()"
            :error-messages="firstNameErrors"
            required
            @input="$v.currentUser.firstName.$touch()"
            @blur="$v.currentUser.firstName.$touch()"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            id="update_lastname_field"
            label="Last Name"
            v-model="currentUser.lastName"
            color="black"
            @change="updateUser()"
            :error-messages="lastNameErrors"
            required
            @input="$v.currentUser.lastName.$touch()"
            @blur="$v.currentUser.lastName.$touch()"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-autocomplete
            id="update_birthyear_field"
            label="Birth Year"
            v-model="currentUser.birthYear"
            color="black"
            :disabled="showChangePasswordDialog"
            :items="generateYears()"
            @change="updateUser()"
            :error-messages="birthYearErrors"
            required
            @input="$v.currentUser.birthYear.$touch()"
            @blur="$v.currentUser.birthYear.$touch()"
          >
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-col cols="">
          <span>Favorite Color</span>
          <v-color-picker
            id="update_favoriteColor_field"
            class="mt-2"
            v-model="currentUser.favoriteColor"
            hide-inputs
            mode="rgba"
            @input="updateUser()"
          ></v-color-picker>
        </v-col>
        <v-spacer />
      </v-row>
      <v-dialog
        v-model="showChangePasswordDialog"
        persist
        :key="getUniqueKey()"
      >
        <change-password
          :user="currentUser"
          :context="CONTEXTS.UPDATE"
          @closePasswordDialog="showChangePasswordDialog = false"
        >
        </change-password>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { generateYears, getAccentColor, getUniqueKey } from "../helpers.js";
import ChangePassword from "../ChangePassword.vue";
import { validationMixin } from "vuelidate";
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
import { CONTEXTS } from "../constants.js";
import {
  containsUpperAndLowercase,
  containsNumber,
  containsSpecialChar,
} from "../validations.js";

export default {
  name: "CreateUpdateUser",
  components: { ChangePassword },
  props: {
    context: {
      type: String,
      default: CONTEXTS.CREATE,
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
          favoriteColor: "",
        };
      },
    },
    users: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  mixins: [validationMixin],
  validations() {
    if (this.context === CONTEXTS.CREATE) {
      return {
        currentUser: {
          username: { required },
          password: {
            required,
            minLength: minLength(10),
            upperLowerCase: containsUpperAndLowercase,
            number: containsNumber,
            specialChar: containsSpecialChar,
          },
          confirmPassword: { required, sameAsPassword: sameAs("password") },
          email: { required, email },
          firstName: { required },
          lastName: { required },
          birthYear: { required },
          favoriteColor: { required },
        },
      };
    } else {
      return {
        currentUser: {
          username: { required },
          email: { required, email },
          firstName: { required },
          lastName: { required },
          birthYear: { required },
          favoriteColor: { required },
        },
      };
    }
  },
  data() {
    return {
      currentUser: {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        firstName: "",
        lastName: "",
        birthYear: "",
        favoriteColor: "#7F50F1FF",
      },
      hidePassword: true,
      hideConfirmPassword: true,
      showChangePasswordDialog: false,
    };
  },
  computed: {
    isCreatingUser() {
      return this.context === CONTEXTS.CREATE;
    },
    isUpdatingUser() {
      return this.context === CONTEXTS.UPDATE;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.currentUser.username.$dirty) return errors;
      !this.$v.currentUser.username.required &&
        errors.push("Username is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.currentUser.password.$dirty) return errors;
      !this.$v.currentUser.password.required &&
        errors.push("Password is required");
      !this.$v.currentUser.password.minLength &&
        errors.push("Password must be at least 10 characters");
      !this.$v.currentUser.password.upperLowerCase &&
        errors.push("Must contain an upper and a lowercase letter");
      !this.$v.currentUser.password.number &&
        errors.push("Must contain a number");
      !this.$v.currentUser.password.specialChar &&
        errors.push("Must contain a special character ex. (-+_!@#$%^&*.,?)");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.currentUser.confirmPassword.$dirty) return errors;
      !this.$v.currentUser.confirmPassword.sameAsPassword &&
        errors.push("Both password entries must match");
      !this.$v.currentUser.confirmPassword.required &&
        errors.push("Must confirm password");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.currentUser.email.$dirty) return errors;
      !this.$v.currentUser.email.email && errors.push("Must be valid e-mail");
      !this.$v.currentUser.email.required && errors.push("E-mail is required");
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.currentUser.firstName.$dirty) return errors;
      !this.$v.currentUser.firstName.required &&
        errors.push("First Name is required");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.currentUser.lastName.$dirty) return errors;
      !this.$v.currentUser.lastName.required &&
        errors.push("Last Name is required");
      return errors;
    },
    birthYearErrors() {
      const errors = [];
      if (!this.$v.currentUser.birthYear.$dirty) return errors;
      !this.$v.currentUser.birthYear.required &&
        errors.push("Birth Year is required");
      return errors;
    },
  },
  methods: {
    generateYears,
    getAccentColor,
    getUniqueKey,
    updateUser() {
      this.$emit("userChanged", this.currentUser);
    },
  },
  watch: {
    "$v.$invalid": function () {
      this.$emit("formInvalid", this.$v.$invalid);
    },
  },
  beforeMount() {
    this.currentUser = this.user;
  },
  mounted() {
    this.$eventPool.$on("touchChildForm", () => {
      this.$v.$touch();
      this.$emit("formInvalid", this.$v.$invalid);
    });
  },
  destroyed() {
    this.$eventPool.$off("touchChildForm", () => {});
  },
  created() {
    this.CONTEXTS = CONTEXTS;
  },
};
</script>

<style></style>
