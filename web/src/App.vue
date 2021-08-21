<template>
  <!-- <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app> -->

  <v-app>
    <v-navigation-drawer
      v-if="authed === true"
      v-model="drawer"
      fixed
      :mini-variant="miniVariant"
      :app="true"
      permanent
      expand-on-hover
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in navTiles"
          :key="i"
          router
          :to="item.to"
          exact
          @click.stop="changePageName(item.title)"
        >
          <v-list-item-action>
            <v-icon :color="item.color" v-html="item.icon" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed :app="true" clipped-left>
      <v-app-bar-nav-icon
        v-if="authed === true"
        @click.native.stop="drawer = !drawer"
      />
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <h4 class="text-xs-right mt-0">
        {{ currentPage }}
      </h4>
      <v-btn @click="logout" color="grey" v-if="$store.state.authed">
        Logout
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>fa-ellipsis-v</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :disabled="currentTheme === item.theme"
            @click="changeTheme(item.theme)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
export default {
  name: "App",

  components: {
    // HelloWorld,
  },

  computed: {
    currentTheme() {
      return this.$store.state.theme;
    },
    authed() {
      return this.$store.state.authed;
    },
    currentPage() {
      return this.$store.state.pageName;
    }
  },

  data: () => {
    return {
      title: "Gunnar Hiring Exercise",
      drawer: false,
      fixed: false,
      clipped: true,
      miniVariant: true,
      right: true,
      rightDrawer: false,
      items: [
        { title: "Use Dark Theme", theme: "dark" },
        { title: "Use Light Theme", theme: "light" }
      ],
      navTiles: [
        // { icon: 'fa-th-large', title: 'Dashboard', to: '/dashboard' },
        // { icon: 'fa-broadcast-tower', title: 'Radio', to: '/radio' },
        // { icon: 'fa-microchip', title: 'Firmware', to: '/firmware' },
        // { icon: 'fa-asterisk', title: 'Point Data', to: '/point_data' },
        { icon: "fa-plane-arrival", title: "Landing", to: "/landing" },
        { icon: "fa-user", title: "Users", to: "/users" }
      ]
    };
  },

  methods: {
    changeTheme(theme) {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.currentTheme = theme;
      this.$store.commit("SET_THEME", theme);
    },
    changePageName(page) {
      this.$store.commit("CHANGE_PAGE_NAME", page);
    },
    logout() {
      this.$router.push(`/`);
      this.$store.commit("CHANGE_PAGE_NAME", "");
      this.$store.commit("LOGOUT");
    }
  },

  beforeMount() {
    if (this.currentTheme === "dark") {
      this.$vuetify.theme.dark = true;
    }
  }
};
</script>
