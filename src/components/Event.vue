<template>
  <v-card class="mx-auto" max-width="500">
    <v-img
      class="white--text align-end grey darken-4"
      min-height="220px"
      :src="event.imageUrl"
      transition="fade-transition"
    >
      <v-card-title class="title">
        <span class="mr-2">{{ event.sport }}</span>
        <div v-for="label in labels" :key="label" class="mr-1">
          <Label :label="label"></Label>
        </div>
      </v-card-title>
    </v-img>
    <v-card-title class="title">
      {{ event.name }}
    </v-card-title>

    <v-card-subtitle class="pb-0">
      {{ fromNow }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="primary" text>
        Details
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text class="text--primary">
          {{ event.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import moment from "moment";
import Label from "@/components/Label.vue";

export default {
  name: "Event",
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    show: false,
    interval: null,
    fromNow: null
  }),
  methods: {
    timeFromNow() {
      this.fromNow = moment(this.event.eventStart).fromNow();
    }
  },
  computed: {
    labels() {
      return this.event.eventSubgroups
        ? this.event.eventSubgroups.map(subgroup => subgroup.subgroupLabel)
        : [];
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
  },
  components: {
    Label
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
