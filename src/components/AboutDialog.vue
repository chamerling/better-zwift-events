<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Better Zwift Events</v-card-title>
      <v-card-text>
        <p>
          The goal of this application is to better find and use Zwift events
          just because
          <a href="https://zwift.com/events/" target="_blank"
            >https://zwift.com/events/</a
          >
          is not quick enough (at least for me).
        </p>
        <p>
          For any comment/suggestion/whatever, feel free to Tweet me at
          <a href="https://twitter.com/chamerling" target="_blank"
            >@chamerling</a
          >.
        </p>
        <p>
          Enjoy your ride! ❤️
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('update:dialog', false)">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  }
};
</script>
