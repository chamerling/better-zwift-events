<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="white--text align-end grey darken-4"
      height="200px"
      :src="event.imageUrl"
      transition="fade-transition"
    >
      <v-card-title>{{ event.name }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">{{
      event.eventStart | moment("calendar")
    }}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Whitsunday Island, Whitsunday Islands</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text>
        Details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Event",
  props: {
    event: {
      type: Object,
      required: true
    }
  }
};
</script>
