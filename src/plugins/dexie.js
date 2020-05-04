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
