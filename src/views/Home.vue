<template>
  <v-container>
    <div id="events" v-if="loaded">
      <div id="event" class="mb-4" v-for="event in filteredEvents" :key="event.id">
        <Event
          :event="event"
          :now="now"
          data-aos="fade"
          data-aos-easing="ease-in"
          data-aos-once="true"
        />
      </div>
      <infinite-loading @infinite="loadMore" :distance="200">
        <div slot="spinner">
          <MessageEllipsis message="Loading" />
        </div>
        <div slot="no-more">
          <span>No more events</span>
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
import moment from "moment";
import { mapGetters } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import Event from "@/components/Event.vue";
import Loader from "@/components/Loader.vue";
import MessageEllipsis from "@/components/MessageEllipsis.vue";

export default {
  name: "Home",
  data: () => ({
    interval: null,
    loaded: false,
    now: null,
    page: 0,
    events: []
  }),
  created() {
    this.now = new Date();
  },
  mounted() {
    this.interval = setInterval(() => {
      this.now = new Date();
    }, 60000);

    this.$store
      .dispatch("fetchEvents")
      .then(() => this.getFirstEvents())
      .then(() => (this.loaded = true))
      .catch(err => console.log(err));
  },
  destroyed() {
    clearInterval(this.interval);
  },
  computed: {
    ...mapGetters({ getEvents: "getEvents" }),
    filteredEvents() {
      // Do not display old events (15 minutes ago)
      return this.events.filter(event => {
        return (
          moment
            .duration(moment(event.eventStart).diff(moment(this.now)))
            .asMinutes() > -15
        );
      });
    }
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
        $state.loaded();
      } else {
        $state.complete();
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
