<template>
  <v-container>
    <div v-if="loaded">
      <div id="events" v-if="events && events.length">
        <div id="event" class="mb-4" v-for="event in events" :key="event.id">
          <Event
            :event="event"
            :now="now"
            data-aos="fade"
            data-aos-easing="ease-in"
            data-aos-once="true"
          />
        </div>
      </div>
      <div v-else id="none" class="d-flex justify-center align-center">
        <span>No favorites</span>
      </div>
    </div>
    <div v-else id="loader" class="d-flex justify-center align-center">
      <MessageEllipsis message="Loading" />
    </div>
  </v-container>
</template>

<script>
import Event from "@/components/Event.vue";
import MessageEllipsis from "@/components/MessageEllipsis.vue";

export default {
  name: "FavoritesView",
  data: () => ({
    now: null,
    events: null,
    loaded: false
  }),
  async created() {
    this.now = new Date();
    const favorites = await this.$dexie.getAll();

    this.loaded = true;
    this.events = favorites || [];
  },
  components: {
    Event,
    MessageEllipsis
  }
};
</script>
