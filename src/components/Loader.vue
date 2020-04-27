<template>
  <div id="loader" class="d-flex flex-column justify-center align-center">
    <div class="icons">
      <v-icon id="bike" color="primary" size="80">mdi-bike</v-icon>
      <v-icon id="run" color="primary" size="80">mdi-run</v-icon>
    </div>
    <MessageEllipsis :message="message" class="mt-4" />
  </div>
</template>

<script>
import { of, from } from "rxjs";
import { concatMap, delay } from "rxjs/operators";
import MessageEllipsis from "@/components/MessageEllipsis.vue";

const INITIAL_MESSAGE = "Loading Events";
const FINAL_MESSAGE = "Zwift looks slow, waiting a bit more";
const MESSAGES = [
  "Checking brakes",
  "Tyres pressure",
  "Putting helmet",
  "Filling water",
  "Cleaning sunglasses",
  "Adjusting rear derailleur",
  "Calibrating smart trainer",
  "Bike Chain lubrication"
];

export default {
  name: "Loader",
  data: () => ({
    message: INITIAL_MESSAGE,
    subscription: null
  }),
  methods: {
    launch() {
      const inputMessages = MESSAGES.sort(() => 0.5 - Math.random());

      this.subscription = from(inputMessages)
        .pipe(
          concatMap(message =>
            of(message).pipe(delay(600 + Math.random() * 600))
          )
        )
        .subscribe(
          message => (this.message = message),
          err => console.log(err),
          () => (this.message = FINAL_MESSAGE) // TODO: launch another type of message
        );
    }
  },
  mounted() {
    this.launch();
  },
  destroyed() {
    this.subscription && this.subscription.unsubscribe();
  },
  components: {
    MessageEllipsis
  }
};
</script>

<style scoped>
.icons i {
  animation-name: fade;
  animation-iteration-count: infinite;
  animation-duration: 2s;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  33% {
    opacity: 1;
  }
  53% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

#bike {
  position: absolute;
}

#run {
  animation-delay: -1s;
}
</style>
