<template>
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
</template>

<script>
export default {
  data: () => ({
    refreshing: false,
    registration: null,
    updateExists: false,
    showUpdate: false,
    updateTimeout: 0
  }),
  methods: {
    showRefreshUI(e) {
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
  created() {
    console.log("CREATED");
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  }
};
</script>
