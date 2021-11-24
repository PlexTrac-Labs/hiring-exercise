<template>
  <v-container>
    <v-card :color="user.favoriteColor" min-width="250">
      <v-card-text>
        <span
          :class="`${getAccentColor(
            user.favoriteColor
          )}--text font-weight-black`"
          >{{ user.firstName }} {{ user.lastName }}</span
        >
        <span
          :class="`${getAccentColor(
            user.favoriteColor
          )}--text font-weight-normal`"
          ><br />
          ID:
        </span>
        <span
          :class="`${getAccentColor(
            user.favoriteColor
          )}--text font-weight-black`"
          >{{ user._id }}</span
        >
        <span
          :class="`${getAccentColor(
            user.favoriteColor
          )}--text font-weight-normal`"
          ><br />
          Username:
        </span>
        <span
          :class="`${getAccentColor(
            user.favoriteColor
          )}--text font-weight-black`"
          >{{ user.username }}</span
        >
        <br />
        <span
          :class="`${getAccentColor(
            user.favoriteColor
          )}--text font-weight-normal`"
        >
          Email:
        </span>
        <span
          :class="`${getAccentColor(
            user.favoriteColor
          )}--text font-weight-black`"
          >{{ user.email }}</span
        >
        <br />
        <span
          :class="`${getAccentColor(
            user.favoriteColor
          )}--text font-weight-normal`"
        >
          Born:
        </span>
        <span
          :class="`${getAccentColor(
            user.favoriteColor
          )}--text font-weight-black`"
          >{{ user.birthYear }}</span
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { getAccentColor } from "./helpers.js";
export default {
  name: "ViewUser",
  props: {
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
  methods: {
    getAccentColor,
  },
};
</script>

<style></style>
