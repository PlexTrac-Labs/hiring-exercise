<template>
  <v-container>
    <h2 class="ma-2 font-weight-regular">
      Are you sure you want to delete the following users?
    </h2>
    <br />
    <v-chip
      v-for="user in currentUsers"
      :key="user._id"
      class="ma-2 font-weight-medium text-h5 deleteUser_chip"
      :color="user.favoriteColor"
      :text-color="getAccentColor(user.favoriteColor)"
      label
      large
      pill
      close
      @click:close="updateUsers(user)"
    >
      <v-icon left> mdi-account-circle-outline </v-icon>
      {{ user.firstName }} {{ user.lastName }}
    </v-chip>
  </v-container>
</template>

<script>
import { getAccentColor } from "../helpers.js";

export default {
  name: "DeleteUser",
  props: {
    users: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      currentUsers: [],
    };
  },
  methods: {
    getAccentColor,
    updateUsers(user) {
      const index = this.currentUsers.indexOf(user);

      index < 0
        ? this.currentUsers.push(user)
        : this.currentUsers.splice(index, 1);
      this.$emit("selectedUsersChanged", this.currentUsers);
    },
  },
  beforeMount() {
    this.currentUsers = this.users;
  },
  watch: {
    users(val) {
      if (val.length === 0) {
        this.$emit("closeDeleteUserDialog");
      }
    },
  },
};
</script>

<style></style>
