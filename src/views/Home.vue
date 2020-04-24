<template>
  <v-container>
    <div id="events" v-if="loaded">
      <div id="event" class="mb-4" v-for="event in events" :key="event.id">
        <Event :event="event" />
      </div>
    </div>
    <div v-else class="d-flex flex-column justify-center align-center ma-12">
      <v-progress-circular
        indeterminate
        color="primary"
        size="60"
        width="8"
      ></v-progress-circular>
      <h3 class="mt-4">
        <span>Loading events</span>
        <span class="ellipsis-anim">
          <span>.</span><span>.</span><span>.</span>
        </span>
      </h3>
    </div>
  </v-container>
</template>

<script>
import Event from "@/components/Event.vue";

export default {
  name: "Home",
  data: () => ({
    events: null,
    loaded: false
  }),
  mounted() {
    this.axios
      .get("https://us-or-rly101.zwift.com/api/public/events/upcoming?")
      .then(response => response.data)
      .then(events => (this.events = events))
      .then(() => (this.loaded = true))
      .catch(err => console.log(err));
  },
  components: {
    Event
  }
};
</script>

<style scoped>
.ellipsis-anim span {
  opacity: 0;
  animation: ellipsis-dot 1s infinite;
}

.ellipsis-anim span:nth-child(1) {
  animation-delay: 0s;
}
.ellipsis-anim span:nth-child(2) {
  animation-delay: 0.1s;
}
.ellipsis-anim span:nth-child(3) {
  animation-delay: 0.2s;
}

@-webkit-keyframes ellipsis-dot {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes ellipsis-dot {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
