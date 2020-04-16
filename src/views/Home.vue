<template>
  <div class="home">
    <div id="event" class="mb-4" v-for="event in events" :key="event.id">
      <Event :event="event" />
    </div>
  </div>
</template>

<script>
import Event from "@/components/Event.vue";

export default {
  name: "Home",
  data: () => ({
    events: null
  }),
  mounted() {
    this.axios
      .get("https://us-or-rly101.zwift.com/api/public/events/upcoming?")
      .then(response => response.data)
      .then(events => (this.events = events))
      .catch(err => console.log(err));
  },
  components: {
    Event
  }
};
</script>
