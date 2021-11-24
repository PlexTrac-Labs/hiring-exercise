<template>
  <v-card class="mx-auto elevation-10" width="700">
    <v-toolbar :color="currentUser.favoriteColor">
      <v-toolbar-title
        left
        :color="getAccentColor(currentUser.favoriteColor)"
        :class="`${getAccentColor(currentUser.favoriteColor)}--text`"
        >{{ title }}</v-toolbar-title
      >
      <v-icon class="mx-2" :color="getAccentColor(currentUser.favoriteColor)">{{
        toolbarIcon
      }}</v-icon>
      <v-spacer></v-spacer>
      <v-btn
        id="user_closeDialog_button"
        :color="getAccentColor(currentUser.favoriteColor)"
        icon
        @click.stop="close()"
        ><v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <create-update-user
        v-if="isCreatingUser || isUpdatingUser"
        :context="context"
        :user="currentUser"
        :users="users"
        :key="getUniqueKey()"
        @userChanged="updateCurrentUser"
        @formInvalid="(status) => (formInvalid = status)"
      ></create-update-user>
      <delete-user
        v-else-if="isDeletingUser"
        :users="users"
        @selectedUsersChanged="updateSelectedUsers"
        @closeDeleteUserDialog="close()"
      ></delete-user>
      <v-alert
        v-model="showError"
        type="error"
        @click="setError(null)"
        dismissible
        dense
        max-width="700"
      >
        {{ errorMessage }}
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        id="user_cancel_button"
        :color="currentUser.favoriteColor"
        :class="`${getAccentColor(currentUser.favoriteColor)}--text`"
        @click.stop="close()"
      >
        Cancel
      </v-btn>
      <v-btn
        id="user_action_button"
        :color="currentUser.favoriteColor"
        :class="`${getAccentColor(currentUser.favoriteColor)}--text`"
        @click="performAction()"
        :disabled="formInvalid && !isDeletingUser"
      >
        {{ context }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { CONTEXTS } from "./constants.js";
import {
  getAccentColor,
  generateYears,
  getUniqueKey,
  cleanObj,
} from "./helpers.js";
import CreateUpdateUser from "./UserDialogContainers/CreateUpdateUser.vue";
import DeleteUser from "./UserDialogContainers/DeleteUser.vue";

export default {
  name: "UserDialog",
  components: { CreateUpdateUser, DeleteUser },
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
          favoriteColor: "#7F50F1FF",
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
  data() {
    return {
      password2: "",
      currentUser: {
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        birthYear: "",
        favoriteColor: "",
      },
      currentUsers: [],
      formInvalid: true,
      showError: false,
      errorMessage: "",
    };
  },
  computed: {
    isCreatingUser() {
      return this.context === CONTEXTS.CREATE;
    },
    isUpdatingUser() {
      return this.context === CONTEXTS.UPDATE;
    },
    isDeletingUser() {
      return this.context === CONTEXTS.DELETE;
    },
    title() {
      return this.isDeletingUser
        ? this.context + " Users"
        : this.context + " User";
    },
    toolbarIcon() {
      let icon = "mdi-account-plus";
      if (this.isUpdatingUser) return "mdi-account-edit";
      if (this.isDeletingUser) return "mdi-account-remove";
      return icon;
    },
  },
  methods: {
    ...mapActions({
      createUser: "createUser",
      updateUser: "updateUser",
      deleteUser: "deleteUser",
    }),
    ...mapMutations(["setError"]),
    getAccentColor,
    getUniqueKey,
    updateCurrentUser(user) {
      this.currentUser = user;
    },
    updateSelectedUsers(users) {
      this.currentUsers = users;
      this.$emit("selectedUsersChanged", this.currentUsers);
    },
    close() {
      this.$emit("closeDialog");
    },
    performAction() {
      this.$eventPool.$emit("touchChildForm");

      if (this.isDeletingUser) {
        let deletedUsers = 0;
        const totalUsers = this.currentUsers.length;
        this.currentUsers.forEach((user) => {
          this.deleteUser(user._id).then(
            (resolve) => {
              console.log(resolve);
              deletedUsers++;
              if (deletedUsers === totalUsers) {
                this.$emit("closeDialog");
              }
            },
            (err) => {
              this.showError = true;
              this.errorMessage = err;
            }
          );
        });
      } else {
        if (!this.formInvalid) {
          if (this.isCreatingUser) {
            const user = cleanObj(this.currentUser, CONTEXTS.CREATE);
            this.createUser(user).then(
              (resolve) => {
                console.log(resolve);
                this.$emit("closeDialog");
                this.$router.go();
              },
              (err) => {
                this.showError = true;
                this.errorMessage = err;
              }
            );
          }

          if (this.isUpdatingUser) {
            const payload = {
              user: cleanObj(this.currentUser, CONTEXTS.UPDATE),
              id: this.currentUser._id,
            };

            this.updateUser(payload).then(
              (resolve) => {
                console.log(resolve);
                this.$emit("closeDialog");
              },
              (err) => {
                this.showError = true;
                this.errorMessage = err;
              }
            );
          }
        }
      }
    },
    generateYears,
  },
  beforeMount() {
    this.updateCurrentUser(this.user);
    this.currentUsers = this.users;
  },
  created() {
    this.CONTEXTS = CONTEXTS;
  },
};
</script>

<style></style>
