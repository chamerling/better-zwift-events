import Vue from "vue";
import VueGtag from "vue-gtag";
import router from "@/router";

const VUE_APP_GOOGLE_ANALYTICS_ID = process.env.VUE_APP_GOOGLE_ANALYTICS_ID;

if (VUE_APP_GOOGLE_ANALYTICS_ID) {
  Vue.use(VueGtag, {
    config: { id: VUE_APP_GOOGLE_ANALYTICS_ID },
    router
  });
}
