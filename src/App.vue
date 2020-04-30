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
      <PWAUpdate />
    </v-content>
    <ScrollToTopFab />
  </v-app>
</template>

<script>
import PWAUpdate from "@/components/PWAUpdate.vue";

export default {
  name: "App",
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
