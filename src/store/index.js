import Vue from "vue";
import Vuex from "vuex";
import { orderBy } from "lodash";

Vue.use(Vuex);

const PAGE_SIZE = 50;

const state = {
  loaded: false,
  events: {},
  favorites: []
};

const actions = {
  fetchEvents({ commit }) {
    return Vue.axios
      .get("https://us-or-rly101.zwift.com/api/public/events/upcoming?")
      .then(({ data }) => {
        commit("setEvents", data);
      });
  },
  setAsFavorite({ state, commit }, id) {
    const event = state.events[id];

    if (!event) {
      return Promise.reject(new Error("Event not found"));
    }
    return Vue.$dexie.db.events
      .add({
        id,
        eventStart: event.eventStart,
        name: event.name,
        favorite: true,
        event
      })
      .then(() => {
        commit("addFavorite", id);
      });
  },
  setLoaded({ commit }, loaded) {
    commit("setLoaded", loaded);
  }
};

const mutations = {
  setEvents(state, events) {
    events.forEach(event => {
      Vue.set(state.events, event.id, event);
    });
  },
  addFavorite(state, id) {
    state.favorites.push(id);
  },
  setLoaded(state, value) {
    state.loaded = value;
  }
};

const getters = {
  getEvents: ({ events }) => (page = 0) => {
    return orderBy(Object.values(events), "eventStart", "asc").slice(
      page * PAGE_SIZE,
      (page + 1) * PAGE_SIZE
    );
  },
  getFavorites: ({ favorites }) => {
    return favorites || [];
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
});
