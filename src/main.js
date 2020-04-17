import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueMoment from "vue-moment";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.use(VueAxios, axios);
Vue.use(VueMoment);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
