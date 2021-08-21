<template>
  <v-container>
    <!-- {{user}} -->
    <v-row>
      <v-col cols="auto">
        <v-card v-if="user" :loading="!user">
          <v-card-title>
            {{ user.username }}
            <!-- <span></span> -->
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
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "User",
  props: {},
  components: {},
  data: () => ({}),
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
  methods: {}
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
</style>
