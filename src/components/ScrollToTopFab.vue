<template>
  <v-fab-transition>
    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      aria-label="Scroll to top"
      bottom
      color="primary"
      dark
      fab
      fixed
      right
      title="Scroll to top"
      @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  name: "ScrollToTopFab",
  data: () => ({
    fab: false
  }),
  methods: {
    onScroll() {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || document.documentElement.offsetTop || 0;
      this.fab = top > 300;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
};
</script>
