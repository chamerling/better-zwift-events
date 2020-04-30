<template>
  <v-bottom-navigation v-model="bottomNav" dark fixed shift>
    <v-btn>
      <span>Events</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn>
      <span>Search</span>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn>
      <span>Favorite</span>
      <v-icon>mdi-star</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({
    bottomNav: 1
  })
};
</script>
