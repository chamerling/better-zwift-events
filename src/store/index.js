import Vue from "vue";
import Vuex from "vuex";
import { orderBy } from "lodash";

Vue.use(Vuex);

const PAGE_SIZE = 20;

const state = {
  events: {}
};

const actions = {
  fetchEvents({ commit }) {
    return Vue.axios
      .get("https://us-or-rly101.zwift.com/api/public/events/upcoming?")
      .then(({ data }) => {
        commit("setEvents", data);
      });
  }
};

const mutations = {
  setEvents(state, events) {
    events.forEach(event => {
      Vue.set(state.events, event.id, event);
    });
  }
};

const getters = {
  getEvents: ({ events }) => (page = 0) => {
    return orderBy(Object.values(events), "eventStart", "asc").slice(
      page * PAGE_SIZE,
      (page + 1) * PAGE_SIZE
    );
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
});
