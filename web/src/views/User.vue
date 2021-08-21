<template>
  <v-container>
    <!-- {{user}} -->
    <v-row>
      <v-col cols="auto">
        <v-card v-if="user" :loading="!user">
          <v-card-title>
            {{ user.username }}
          </v-card-title>
          <v-divider />
          <v-list>
            <v-list-item>
              <v-list-item-content><h4>Username:</h4></v-list-item-content>
              <v-list-item-content v-text="user.username" />
            </v-list-item>
            <v-list-item>
              <v-list-item-content><h4>Email:</h4></v-list-item-content>
              <v-list-item-content v-text="user.email" />
            </v-list-item>
            <v-list-item>
              <v-list-item-content><h4>First Name:</h4></v-list-item-content>
              <v-list-item-content v-text="user.firstName" />
            </v-list-item>
            <v-list-item>
              <v-list-item-content><h4>Last Name:</h4></v-list-item-content>
              <v-list-item-content v-text="user.lastName" />
            </v-list-item>
            <v-list-item v-if="user.birthYear">
              <v-list-item-content><h4>Birth Year:</h4></v-list-item-content>
              <v-list-item-content v-text="user.birthYear" />
            </v-list-item>
            <v-list-item v-if="user.favoriteColor">
              <v-list-item-content
                ><h4>Favorite Color:</h4></v-list-item-content
              >
              <v-list-item-content v-text="user.favoriteColor" />
            </v-list-item>
            <v-list-item>
              <v-list-item-content><h4>Admin:</h4></v-list-item-content>
              <v-list-item-content>
                <v-simple-checkbox
                  v-model="user.admin"
                  disabled
                ></v-simple-checkbox>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-btn @click="resetPasswordOverlay = true">
                Reset Password
              </v-btn>
            </v-card-actions>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-overlay absolute :value="resetPasswordOverlay">
      <v-card>
        <v-card-title class="text-h5">Reset Password</v-card-title>
        <v-card-subtitle class="redText" v-if="errorText">
          {{ errorText }}
        </v-card-subtitle>
        <v-divider />
        <v-form v-model="valid" ref="form">
          <v-row>
            <v-col>
              <v-text-field
                v-model="currentPassword"
                label="Current Password"
                hint="Current Password"
                :rules="currentPasswordRule"
                @input="$refs.form.validate()"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="password"
                label="New Password"
                hint="New Password"
                :rules="requiredRule"
                @input="
                  validatePasswordsMatch();
                  $refs.form.validate();
                "
                required
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="passwordConfirm"
                label="Confirm Password"
                hint="Confirm Password"
                @input="
                  validatePasswordsMatch();
                  $refs.form.validate();
                "
                :rules="confirmPasswordRule"
                required
              />
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-btn color="blue" :disabled="!valid" @click="changePassword">
            Submit
          </v-btn>
          <v-btn color="grey" @click="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  name: "User",
  props: {},
  components: {},
  data: () => ({
    errorText: "",
    currentPassword: "",
    password: "",
    passwordConfirm: "",
    resetPasswordOverlay: false,
    valid: false,
    currentPasswordRule: [v => !!v || "required"],
    requiredRule: [v => !!v || "required"],
    confirmPasswordRule: ["Required"]
  }),
  created() {
    this.$store.dispatch("getUsers", this.$http);
  },
  computed: {
    user() {
      let user = this.$store?.state?.users?.find(
        u => u._id === this.$route.params.id
      );
      return user;
    }
  },
  methods: {
    validatePasswordsMatch() {
      this.errorText = "";
      const valid = this.password === this.passwordConfirm;
      if (valid) {
        this.confirmPasswordRule = [true];
      } else {
        this.confirmPasswordRule = ["Passwords Must Match"];
      }
    },
    async changePassword() {
      try {
        await this.$http({
          method: "post",
          url: `http://localhost:5000/actions/changePassword`,
          data: {
            userId: this.user._id,
            currentPassword: this.currentPassword,
            newPassword: this.password,
            newPasswordConfirm: this.passwordConfirm
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.authToken}`
          }
        });
        this.currentPassword = "";
        this.password = "";
        this.passwordConfirm = "";
        this.resetPasswordOverlay = false;
      } catch (err) {
        /**
         * currently assuming if we get an error from the server then
         * the current password was bad
         * TODO: figure out a way to give better feedback to the client...
         */
        console.error(err);
        this.errorText = "Incorrect Password";
      }
    },
    cancel() {
      this.currentPassword = "";
      this.password = "";
      this.passwordConfirm = "";
      this.errorText = "";
      this.resetPasswordOverlay = false;
    }
  }
};
</script>

<style>
h4 {
  /**
    no clue why the margin gets so messed up 
    on the v-list-item-content, but this seems
    to compensate fo it well enough
   */
  margin-right: 70px;
}
.redText {
  /* the default theme was overriding. i hate that i have to do this */
  color: red !important;
}
</style>
