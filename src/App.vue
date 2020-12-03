<template>
  <v-app id="app">
    <Drawer />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppFooter from "./components/AppFooter";
import Drawer from "@/components/Drawer";

import AppEvents from "./event.js";

export default {
  name: "App",
  components: {
    AppFooter,
    Drawer
  }
};
</script>
