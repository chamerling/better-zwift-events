<template>
  <v-container>
    <div id="events" v-if="loaded">
      <div id="event" class="mb-4" v-for="event in events" :key="event.id">
        <Event :event="event" />
      </div>
    </div>
    <div v-else id="loader" class="d-flex justify-center align-center">
      <Loader />
    </div>
  </v-container>
</template>

<script>
import Event from "@/components/Event.vue";
import Loader from "@/components/Loader.vue";

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
    Event,
    Loader
  }
};
</script>

<style scoped>
#loader {
  height: 80vh;
}
</style>
