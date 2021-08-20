<template>
  <v-container>
    <v-card width="800">
      <v-form v-model="valid" ref="form" lazy-validation>
        <!-- <v-row>
        <v-col cols="12"> -->
        <v-row>
          <v-col>
            <v-text-field
              v-model="user.username"
              label="Username"
              hint="Name of the user"
              :rules="requiredRule"
              required
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="user.email"
              label="Email"
              hint="Email"
              :rules="emailRules"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="user.firstName"
              label="First Name"
              hint="First Name of the user"
              :rules="requiredRule"
              required
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="user.lastName"
              label="Last Name"
              hint="Last Name of the user"
              :rules="requiredRule"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="user.password"
              v-if="create"
              label="Password"
              hint="Password"
              :rules="requiredRule"
              required
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="user.passwordConfirm"
              v-if="create"
              label="Confirm Password"
              hint="Confirm Password"
              @input="validatePasswordsMatch()"
              :rules="confirmPasswordRule"
              required
            />
          </v-col>
        </v-row>
        <v-row justify="start">
          <v-col cols="auto">
            <v-btn
              color="success"
              :disabled="!valid"
              @click="create ? createUser() : editUser()"
            >
              {{ submitText }}
            </v-btn>
          </v-col>
          <!-- <v-spacer/> -->
          <v-col cols="auto">
            <v-btn color="grey" @click="emitClose()">
              cancel
            </v-btn>
          </v-col>
        </v-row>
        <!-- </v-col>
      </v-row> -->
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "UsersOverlay",
  components: {},
  props: {
    user: Object,
    create: Boolean
  },
  data: () => ({
    valid: false,
    confirmPasswordRule: ["Required"],
    passwordRule: [v => !!v || "Password is required"],
    requiredRule: [v => !!v || "required"],
    emailRules: [
      v => !!v || "required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  created() {},
  computed: {
    submitText() {
      return this.create ? "Create" : "Update";
    }
  },
  watch: {
    user: {
      immediate: true,
      async handler() {
        await this.$nextTick();
        this.$refs.form.validate();
      }
    }
  },
  methods: {
    validatePasswordsMatch() {
      const valid = this.user.password === this.user.passwordConfirm;
      if (valid) {
        this.confirmPasswordRule = [true];
      } else {
        this.confirmPasswordRule = ["Passwords Must Match"];
      }
    },
    async editUser() {
      // TODO: handle errors better...
      try {
        await this.$http({
          method: "put",
          url: `http://localhost:5000/user/${this.user._id}`,
          data: {
            username: this.user.username,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email
          },
          headers: {
            "Content-Type": "application/json"
          }
        });
        await this.$store.dispatch("getUsers", this.$http);
      } catch (err) {
        console.error(err);
      } finally {
        this.emitClose();
      }
    },
    async createUser() {
      // TODO: handle errors better...
      try {
        await this.$http({
          method: "post",
          url: "http://localhost:5000/user",
          data: {
            username: this.user.username,
            password: this.user.password,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email
          },
          headers: {
            "Content-Type": "application/json"
          }
        });
        await this.$store.dispatch("getUsers", this.$http);
      } catch (err) {
        console.error(err);
      } finally {
        this.emitClose();
      }
    },
    emitClose() {
      this.$emit("close");
    }
  }
};
</script>
