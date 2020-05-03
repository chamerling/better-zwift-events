<template>
  <v-card class="mx-auto" max-width="500">
    <v-img
      class="white--text align-end grey darken-4"
      :src="event.imageUrl"
      transition="fade-transition"
      min-height="135px"
      contain
    >
      <v-card-title class="title">
        <Sport :type="event.sport" class="mr-2" />
        <v-spacer />
        <div
          v-for="label in labels"
          :key="label"
          class="mr-1"
          @click="dialog = true"
        >
          <Label :label="label"></Label>
        </div>
      </v-card-title>
    </v-img>
    <v-card-title class="title">
      {{ event.name }}
    </v-card-title>

    <v-card-subtitle class="pb-0">
      {{ from }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn text color="primary" @click="show = !show">
        <span>Details</span>
        <v-icon left>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text class="text--primary description">
          <div v-html="event.description" v-linkified></div>
          <div class="mt-4">
            <EventSubGroups :groups="event.eventSubgroups" />
          </div>
        </v-card-text>
      </div>
    </v-expand-transition>
    <v-dialog v-model="dialog" persistent min-width="350" max-width="500">
      <v-card>
        <v-card-text>
          <EventSubGroups :groups="event.eventSubgroups" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import moment from "moment";
import Label from "@/components/Label.vue";
import EventSubGroups from "@/components/EventSubGroups.vue";
import Sport from "@/components/Sport.vue";

export default {
  name: "Event",
  props: {
    event: {
      type: Object,
      required: true
    },
    now: {
      type: Date,
      required: true
    }
  },
  data: () => ({
    show: false,
    interval: null,
    fromNow: null,
    dialog: false
  }),
  computed: {
    labels() {
      return this.event.eventSubgroups
        ? this.event.eventSubgroups.map(subgroup => subgroup.subgroupLabel)
        : [];
    },
    from() {
      return moment(this.event.eventStart).from(this.now);
    }
  },
  components: {
    Label,
    Sport,
    EventSubGroups
  }
};
</script>

<style scoped>
.description {
  white-space: pre-line;
}

.title {
  word-break: normal !important;
}
</style>
