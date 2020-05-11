<template>
  <v-app>
    <v-app-bar app dense flat hide-on-scroll>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click.stop="aboutDialog = true">
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
      <div v-if="loaded">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
      <div v-else id="loader" class="d-flex justify-center align-center">
        <Loader />
      </div>
      <PWAUpdate />
      <BottomNavigation v-if="loaded" />
    </v-content>
    <ScrollToTopFab />
    <AboutDialog :dialog.sync="aboutDialog" />
  </v-app>
</template>

<script>
import moment from "moment";
import PWAUpdate from "@/components/PWAUpdate.vue";
import AboutDialog from "@/components/AboutDialog.vue";
import Loader from "@/components/Loader.vue";

const PERIOD = 5 * 60;

export default {
  name: "App",
  data: () => ({
    aboutDialog: false,
    showNavigation: true,
    interval: null,
    lastFetch: null
  }),
  computed: {
    isDark() {
      return this.$vuetify.theme.dark;
    },
    loaded: {
      get() {
        return this.$store.state.loaded;
      },
      set(value) {
        this.$store.dispatch("setLoaded", value);
      }
    }
  },
  methods: {
    switchDark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    fetchEvents() {
      this.lastFetch = new Date();
      return this.$store.dispatch("fetchEvents");
    },
    handleVisibilityChange() {
      if (!document.hidden) {
        // check if last fetch is old then fetch again if needed
        const diff = moment
          .duration(moment(new Date()).diff(moment(this.lastFetch)))
          .seconds();

        if (diff > PERIOD) {
          this.fetchEvents();
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch("initFavorites");
    this.fetchEvents()
      .then(() => (this.loaded = true))
      .catch(err => console.log(err));

    this.interval = setInterval(() => {
      this.fetchEvents().catch(err => console.log(err));
    }, 1000 * PERIOD);

    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange,
      false
    );
  },
  destroyed() {
    clearInterval(this.interval);
  },
  components: {
    AboutDialog,
    PWAUpdate,
    Loader,
    ScrollToTopFab: () => import("@/components/ScrollToTopFab.vue"),
    BottomNavigation: () => import("@/components/BottomNavigation.vue")
  }
};
</script>

<style>
#loader {
  height: 80vh;
}

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
