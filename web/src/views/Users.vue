<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
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
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                <!-- probably not optimal to mix icon's, but this example was already done with google's icons so :shrug: -->
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
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
          :user="overlayUser"
          :create="!Boolean(overlayUser.username)"
        />
      </v-overlay>
      <v-dialog v-model="overlayDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" plain @click="closeDelete">Cancel</v-btn>
            <v-btn color="error" plain @click="deleteItemConfirm">Delete</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
    overlayDelete: false,
    editedIndex: null,
    editedItem: null,
    dialog: false,
    overlayUser: {},
    itemToDelete: null,
    headers: [
      { text: "Username", value: "username" },
      { text: "First Name", value: "firstName" },
      { text: "Last Name", value: "lastName" },
      { text: "Email", value: "email" },
      { text: "Admin", value: "admin" }, // TODO: should i show this?
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),
  created() {
    this.$store.dispatch("getUsers", this.$http);
    /**
     * if server sent events down to client i could hook in here
     * to dispatch getusers again to dynamically update the table
     */
  },
  computed: {
    users() {
      return this.$store.state.users;
    }
  },
  methods: {
    editItem(item) {
      // this.editedIndex = this.desserts.indexOf(item)
      this.overlayUser = Object.assign({}, item);
      this.overlay = true;
    },
    closeDelete() {
      this.overlayDelete = false;
      this.itemToDelete = null;
    },
    deleteItem(item) {
      this.itemToDelete = Object.assign({}, item);
      this.overlayDelete = true;
    },
    async deleteItemConfirm() {
      // TODO: handle errors better...
      try {
        await this.$http({
          method: "delete",
          url: `http://localhost:5000/user/${this.itemToDelete._id}`,
          data: {},
          headers: {
            "Content-Type": "application/json"
          }
        });
        await this.$store.dispatch("getUsers", this.$http);
      } catch (err) {
        console.error(err);
      } finally {
        this.closeDelete();
      }
    }
  }
};
</script>
