<template>
  <v-chip :color="color">
    {{ label }}
  </v-chip>
</template>

<script>
const COLORS = {
  A: "#fc4119",
  B: "#58c34e",
  C: "#3ec0e9",
  D: "#fccf0b",
  E: "#943e5e"
};

export default {
  name: "Label",
  props: {
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    color() {
      return COLORS[this.label];
    }
  }
};
</script>
