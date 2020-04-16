<template>
  <v-container>
    <div id="events" v-if="loaded">
      <div id="event" class="mb-4" v-for="event in events" :key="event.id">
        <Event :event="event" />
      </div>
    </div>
    <div v-else>
      <v-skeleton-loader
        type="card-avatar, list-item-three-line, card-avatar, list-item-two-line"
        class="mx-auto"
        max-width="400px"
      ></v-skeleton-loader>
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
