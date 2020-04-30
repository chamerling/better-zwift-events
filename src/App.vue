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
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      <PWAUpdate />
    </v-content>
    <ScrollToTopFab />
    <AboutDialog :dialog.sync="aboutDialog" />
  </v-app>
</template>

<script>
import PWAUpdate from "@/components/PWAUpdate.vue";
import AboutDialog from "@/components/AboutDialog.vue";

export default {
  name: "App",
  data: () => ({
    aboutDialog: false
  }),
  computed: {
    isDark() {
      return this.$vuetify.theme.dark;
    }
  },
  methods: {
    switchDark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },
  components: {
    AboutDialog,
    PWAUpdate,
    ScrollToTopFab: () => import("@/components/ScrollToTopFab.vue")
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
