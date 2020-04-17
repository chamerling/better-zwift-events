<template>
  <v-card class="mx-auto" max-width="500">
    <v-img
      class="white--text align-end grey darken-4"
      min-height="220px"
      :src="event.imageUrl"
      transition="fade-transition"
    >
      <v-card-title class="title">{{ event.name }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{ fromNow }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <p v-line-clamp:20="3" class="description">
        {{ event.description }}
      </p>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" text>
        Details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  name: "Event",
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    interval: null,
    fromNow: null
  }),
  methods: {
    timeFromNow() {
      this.fromNow = moment(this.event.eventStart).fromNow();
    }
  },
  mounted() {
    this.timeFromNow();
    this.interval = setInterval(() => {
      this.timeFromNow();
    }, 30000);
  },
  destroyed() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.description {
  word-break: normal !important;
}

.title {
  word-break: normal !important;
}
</style>
