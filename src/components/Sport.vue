<template>
  <v-icon color="white" large>mdi-{{ icon }}</v-icon>
</template>

<script>
export default {
  name: "Sport",
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    icon() {
      return this.type.toLowerCase() === "cycling" ? "bike" : "run";
    }
  }
};
</script>
