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
  setAsFavorite({ state, commit }, { id, value }) {
    if (value) {
      const event = state.events[id];

      if (!event) {
        return Promise.reject(new Error("Event not found"));
      }
      return Vue.$dexie.addToFavorites(event).then(() => {
        commit("addFavorite", id);
      });
    } else {
      return Vue.$dexie.removeFromFavorites(id).then(() => {
        commit("removeFavorite", id);
      });
    }
  },
  setLoaded({ commit }, loaded) {
    commit("setLoaded", loaded);
  },
  initFavorites({ commit }) {
    Vue.$dexie.getFavoritesId().then(ids => {
      commit("setFavorites", ids || []);
    });
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
  removeFavorite(state, id) {
    state.favorites.splice(state.favorites.indexOf(id), 1);
  },
  setFavorites(state, ids) {
    state.favorites = ids;
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
  },
  isFavorite: ({ favorites }) => id => {
    return favorites.indexOf(id) > -1;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
});
