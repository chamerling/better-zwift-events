<template>
  <v-app>
    <v-app-bar app>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <!--
          <v-list-item @click="switchDark">
            <v-list-item-icon>
              <v-icon v-if="isDark">mdi-brightness-4</v-icon>
              <v-icon v-else>mdi-brightness-7</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ isDark ? "Light Mode" : "Dark Mode" }}
            </v-list-item-title>
          </v-list-item>
          -->
          <v-list-item to="/about">
            <v-list-item-icon>
              <v-icon>mdi-help</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              About
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      <v-snackbar
        v-model="showUpdate"
        :timeout="updateTimeout"
        color="primary"
        bottom
      >
        New version available!
        <v-spacer />
        <v-btn dark text @click.native="refreshApp">
          Refresh
        </v-btn>
      </v-snackbar>
    </v-content>
    <ScrollToTopFab />
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    refreshing: false,
    registration: null,
    updateExists: false,
    showUpdate: false,
    updateTimeout: 0
  }),
  computed: {
    isDark() {
      return this.$vuetify.theme.dark;
    }
  },
  methods: {
    switchDark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    showRefreshUI(e) {
      console.log("Show refresh UI");
      this.registration = e.detail;
      this.showUpdate = true;
    },
    refreshApp() {
      this.showUpdate = false;
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    }
  },
  components: {
    ScrollToTopFab: () => import("@/components/ScrollToTopFab.vue")
  },
  created() {
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
