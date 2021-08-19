<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-btn icon title="Add User" @click="overlay = !overlay">
          <i class="fa-lg fas fa-user-plus" />
        </v-btn>
        <template>
          <v-data-table
            :headers="headers"
            :items="users"
            :items-per-page="10"
            class="elevation-1"
          >
            <template v-slot:item.admin="{ item }">
              <v-simple-checkbox
                v-model="item.admin"
                disabled
              ></v-simple-checkbox>
            </template>
          </v-data-table>
        </template>
      </v-col>
    </v-row>
    <v-row>
      <v-overlay absolute :value="overlay">
        <user-overlay
          v-on:close="overlay = false"
          :opacity="1"
          :user="{}"
          :create="true"
        />
      </v-overlay>
    </v-row>
  </v-container>
</template>

<script>
// import UsersOverlay from '@/views/userOverlay';
let UserOverlay = require("@/views/userOverlay").default;

export default {
  name: "Users",
  components: {
    UserOverlay
  },
  data: () => ({
    overlay: false,
    headers: [
      { text: "Username", value: "username" },
      { text: "First Name", value: "firstName" },
      { text: "Last Name", value: "lastName" },
      { text: "Email", value: "email" },
      { text: "Admin", value: "admin" } // TODO: should i show this?
    ]
  }),
  created() {
    this.$store.dispatch("getUsers", this.$http);
  },
  computed: {
    users() {
      return this.$store.state.users;
    }
  },
  methods: {}
};
</script>
