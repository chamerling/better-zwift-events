// based on https://medium.com/@dougallrich/give-users-control-over-app-updates-in-vue-cli-3-pwas-20453aedc1f2

// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.
self.addEventListener("message", event => {
  if (!event.data) {
    return;
  }

  if (event.data && event.data === "skipWaiting") {
    self.skipWaiting();
  }
});

// eslint-disable-next-line no-undef
workbox.core.clientsClaim();

// The precaching code provided by Workbox.
self.__precacheManifest = [].concat(self.__precacheManifest || []);
// eslint-disable-next-line no-undef
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
