<template>
  <v-app>
    <v-main>
      <div>
        <v-app-bar color="primary" dark>
          <div class="d-flex align-center">
            <v-img
              class="shrink mr-2"
              contain
              src="../assets/PlexTracLogo.png"
              transition="scale-transition"
              width="30"
            />
          </div>
          <v-toolbar-title class="mx-2 h2"> User Manager </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            id="dashboard_logout_button"
            outlined
            color="white"
            @click="logoutUser()"
            >Logout</v-btn
          >
        </v-app-bar>
        <v-list subheader>
          <v-subheader
            >Users
            <v-spacer></v-spacer>
            <v-btn
              id="dashboard_createUser_button"
              class="mx-2"
              icon
              color="primary"
              @click.stop="showCreateDialog = true"
              ><v-icon>mdi-account-plus</v-icon>
            </v-btn>
            <v-dialog v-model="showCreateDialog" persistent>
              <user-dialog
                @closeDialog="showCreateDialog = false"
                :context="CONTEXTS.CREATE"
              ></user-dialog>
            </v-dialog>
            <v-tooltip top :disabled="!rowsSelected" min-width="130">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  id="dashboard_deleteUsers_button"
                  class="mx-1"
                  icon
                  :color="rowsSelected ? 'red lighten-1' : 'grey'"
                  :disabled="!rowsSelected"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="showDeleteDialog = true"
                  ><v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </template>
              <v-dialog v-model="showDeleteDialog" persistent>
                <user-dialog
                  @closeDialog="showDeleteDialog = false"
                  @selectedUsersChanged="selectedUsersChanged"
                  :context="CONTEXTS.DELETE"
                  :users="selectedUsers"
                ></user-dialog>
              </v-dialog>
              <span>Delete Selected</span>
            </v-tooltip>
          </v-subheader>
          <v-divider></v-divider>
          <v-list-item v-for="(user, index) in currentUsers" :key="user._id">
            <v-list-item-content>
              <v-list-item-title
                v-text="user.firstName + ' ' + user.lastName"
              ></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-tooltip left color="transparent">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-2 dashboard_viewUser_button"
                    icon
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    ><v-icon>mdi-eye</v-icon>
                  </v-btn>
                </template>
                <view-user :user="user"></view-user>
              </v-tooltip>
            </v-list-item-action>
            <v-list-item-action>
              <v-dialog
                v-model="updateDialogs[index]"
                persistent
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-2 dashboard_updateUser_button"
                    icon
                    color="secondary"
                    v-on="on"
                    ><v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <user-dialog
                  @closeDialog="updateDialogs[index] = false"
                  :context="CONTEXTS.UPDATE"
                  :user="user"
                ></user-dialog>
              </v-dialog>
            </v-list-item-action>
            <v-list-item-action class="mx-2">
              <v-checkbox
                class="dashboard_selectUser_button"
                v-model="checkboxes[user._id]"
                @change="updateSelectedUsers(user)"
                color="deep-purple accent-4"
              ></v-checkbox>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserDialog from "./UserDialog.vue";
import { CONTEXTS } from "./constants.js";
import ViewUser from "./ViewUser.vue";
import { getUniqueKey } from "./helpers.js";

export default {
  name: "Dashboard",
  components: {
    UserDialog,
    ViewUser,
  },
  data() {
    return {
      showCreateDialog: false,
      showDeleteDialog: false,
      // This dict is a mapping of the dialog states for each list item
      updateDialogs: {},
      currentUsers: [],
      selectedUsers: [],
      checkboxes: {},
    };
  },
  computed: {
    ...mapState({
      users: "users",
    }),
    rowsSelected() {
      return this.selectedUsers.length > 0;
    },
  },
  methods: {
    ...mapActions(["getAllUsers", "logout"]),
    getRowColor(index) {
      return index % 2 ? "#EDE7F6" : "white";
    },
    updateSelectedUsers(user) {
      const index = this.selectedUsers.indexOf(user);

      index < 0
        ? this.selectedUsers.push(user)
        : this.selectedUsers.splice(index, 1);
    },
    selectedUsersChanged(users) {
      if (users.length > 0) {
        users.forEach((user) => {
          for (const key in this.checkboxes) {
            user._id === key
              ? (this.checkboxes[key] = true)
              : (this.checkboxes[key] = false);
          }
        });
      } else {
        this.checkboxes = {};
      }
    },
    getUniqueKey,
    logoutUser() {
      this.logout();
    },
  },
  beforeMount() {
    this.getAllUsers();
  },
  created() {
    this.CONTEXTS = CONTEXTS;
  },
  watch: {
    users(val) {
      this.currentUsers = [...val];
    },
  },
};
</script>

<style></style>
