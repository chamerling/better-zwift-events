<template>
  <div id="groups">
    <div v-for="group in groups" id="group" :key="group.id" class="mb-2">
      <div id="name" class="subtitle-1">
        <span class="subtitle-1">{{ group.name }}</span>
      </div>
      <div id="power" class="d-flex align-center">
        <div id="label">
          <Label :label="group.subgroupLabel" />
        </div>
        <div class="ml-4">
          <span class="font-weight-bold"
            >{{ wattsPerKg(group.subgroupLabel) }} W/KG</span
          >
          <div class="d-flex" v-if="group.laps">
            <v-icon small>mdi-timelapse</v-icon>
            <span class="ml-2">{{ group.laps }} Laps</span>
          </div>
          <div class="d-flex" v-if="group.durationInSeconds">
            <v-icon small>mdi-alarm</v-icon>
            <span class="ml-2">{{ duration(group.durationInSeconds) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Label from "./Label.vue";

const watts = {
  A: "4 - 5",
  B: "3.2 - 3.9",
  C: "2.5 - 3.1",
  D: "1 - 2.4",
  E: "1 - 5"
}

export default {
  name: "EventSubGroups",
  props: {
    groups: {
      type: Array,
      required: true
    }
  },
  methods: {
    wattsPerKg(label) {
      return watts[label];
    },
    duration(seconds) {
      return moment.duration(seconds, "seconds").humanize();
    }
  },
  components: {
    Label
  }
};
</script>
