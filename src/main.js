import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import linkify from "vue-linkify";
import VueMoment from "vue-moment";

import AOS from "aos";
import "aos/dist/aos.css";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/analytics";
import VueDexie from "./plugins/dexie";

Vue.use(VueAxios, axios);
Vue.use(VueMoment);
Vue.directive("linkified", linkify);
Vue.use(VueDexie, { store });

Vue.config.productionTip = false;

const app = new Vue({
  created() {
    AOS.init();
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

window.app = app;
