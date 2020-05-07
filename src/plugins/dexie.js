import Dexie from "dexie";

const VueDexie = {
  install(Vue, options = {}) {
    console.log("Installing Dexie plugin", options);
    const db = new Dexie(options.name || "events");

    db.version(1).stores({ events: "id,name,eventStart,favorite" });

    const $dexie = {
      db,
      getFavorites(ids) {
        return db.events
          .where("id")
          .anyOf(ids)
          .toArray()
          .then(events => events.map(event => event.event));
      },
      getAll() {
        return db.events
          .orderBy("eventStart")
          .reverse()
          .toArray()
          .then(events => events.map(event => event.event));
      },
      getFavoritesId() {
        return db.events.orderBy("id").uniqueKeys();
      },
      addToFavorites(event) {
        return db.events.add({
          id: event.id,
          eventStart: event.eventStart,
          name: event.name,
          favorite: true,
          event
        });
      },
      removeFromFavorites(id) {
        return db.events
          .where("id")
          .equals(id)
          .delete();
      }
    };

    Object.defineProperties(Vue.prototype, {
      $dexie: {
        get: function get() {
          return $dexie;
        }
      }
    });

    Vue.$dexie = $dexie;
  }
};

export default VueDexie;
