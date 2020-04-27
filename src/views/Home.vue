<template>
  <v-container>
    <div id="events" v-if="loaded">
      <div id="event" class="mb-4" v-for="event in events" :key="event.id">
        <Event
          :event="event"
          data-aos="fade"
          data-aos-easing="ease-in"
          data-aos-once="true"
        />
      </div>
      <infinite-loading @infinite="loadMore" :distance="200">
        <div slot="spinner">
          <MessageEllipsis message="Loading" />
        </div>
      </infinite-loading>
      <!-- dirty hack to have aos and infinite list working -->
      <div id="loaded"></div>
    </div>
    <div v-else id="loader" class="d-flex justify-center align-center">
      <Loader />
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import Event from "@/components/Event.vue";
import Loader from "@/components/Loader.vue";
import MessageEllipsis from "@/components/MessageEllipsis.vue";

export default {
  name: "Home",
  data: () => ({
    loaded: false,
    page: 0,
    events: []
  }),
  mounted() {
    this.$store
      .dispatch("fetchEvents")
      .then(() => this.getFirstEvents())
      .then(() => (this.loaded = true))
      .catch(err => console.log(err));
  },
  computed: {
    ...mapGetters({ getEvents: "getEvents" })
  },
  methods: {
    getFirstEvents() {
      const events = this.getEvents(this.page);
      this.events.push(...events);
      this.page++;
    },
    loadMore($state) {
      const events = this.getEvents(this.page);
      this.page++;

      if (events && events.length) {
        this.events.push(...events);
        $state && $state.loaded();
      } else {
        $state && $state.complete();
      }
    }
  },
  components: {
    Event,
    Loader,
    InfiniteLoading,
    MessageEllipsis
  }
};
</script>

<style scoped>
#loader {
  height: 80vh;
}
</style>
