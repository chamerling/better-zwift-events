<template>
  <v-bottom-navigation v-model="bottomNav" dark fixed shift>
    <v-btn @click="showHome">
      <span>Events</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn @click="showFavorites">
      <span>Favorites</span>
      <v-icon>mdi-star</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({
    bottomNav: 0
  }),
  methods: {
    showHome() {
      this.$router.push({ name: "Home" });
    },
    showFavorites() {
      this.$router.push({ name: "Favorites" });
    }
  },
  created() {
    if (this.$router.currentRoute.name === "Favorites") {
      this.bottomNav = 1;
    }
    if (this.$router.currentRoute.name === "Home") {
      this.bottomNav = 0;
    }
  },
  watch: {
    $route(to) {
      if (to.name === "Favorites") {
        this.bottomNav = 1;
      }

      if (to.name === "Home") {
        this.bottomNav = 0;
      }
    }
  }
};
</script>
