import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "font-awesome/css/font-awesome.css";

import { LicenseManager } from "ag-grid-enterprise";
import "ag-grid-enterprise";
import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";
import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import "../node_modules/ag-grid-community/dist/styles/ag-theme-material.css";
import "../node_modules/ag-grid-community/dist/styles/ag-theme-fresh.css";
import "../node_modules/ag-grid-community/dist/styles/ag-theme-dark.css";
import "../node_modules/ag-grid-community/dist/styles/ag-theme-blue.css";
import "../node_modules/ag-grid-community/dist/styles/ag-theme-bootstrap.css";

import vuetify from "./plugins/vuetify";
import resize from "vue-element-resize-detector";
Vue.use(resize);
import "echarts/theme/tech-blue.js";
import "echarts/theme/forest.js";
const theme = require("@/assets/config/my_theme.json");
const theme_roma = require("@/assets/config/roma_theme_customed.json");
import ECharts from "vue-echarts";
Vue.component("v-chart", ECharts);
ECharts.registerTheme("customed", theme);
// import "material-design-icons-iconfont/dist/material-design-icons.css";
// import './plugins/base'
import "@mdi/font/css/materialdesignicons.css";

LicenseManager.setLicenseKey(
  "For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-29_August_2020_[v2]_MTU5ODY1NTYwMDAwMA==d310c30fe9bff0618514b72e717bef10"
);

Vue.config.productionTip = false;

var vm = new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
