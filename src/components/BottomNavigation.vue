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
    bottomNav: 1
  }),
  methods: {
    showHome() {
      this.$router.push({ name: "Home" });
    },
    showFavorites() {
      this.$router.push({ name: "Favorites" });
    }
  }
};
</script>
