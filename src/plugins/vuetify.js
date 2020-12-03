import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify, {
  theme: {
    primary: "#D7D7CD",
    secondary: "#eb780a",
    accent: "#879baa",
    error: "#FF5252",
    info: "#ffffff",
    success: "#4CAF50",
    warning: "#FFC107",
  },
  customProperties: true,
  iconfont: "mdi",
});

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
});
