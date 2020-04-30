module.exports = {
  transpileDependencies: ["vuetify"],

  pwa: {
    name: "Better Zwift Events",
    themeColor: "#1eb980",
    backgroundColor: "#33333d",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/sw.js",
      swDest: "service-worker.js"
    }
  }
};
