import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home/Home.vue";
import Heatmap from "@/views/heatmap/Heatmap.vue";
import TrainTable from "@/views/tables/TrainTable.vue";
import AlgoTable from "@/views/tables/AlgoTable.vue";
import Metrics from "@/views/metrics/Metrics.vue";

Vue.use(Router);

var scrollBehavior = function(to, from, savedPosition) {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition;
  } else {
    const position = {};

    // scroll to anchor by returning the selector
    if (to.hash) {
      (position as any).selector = to.hash;

      // specify offset of the element
      if (to.hash === "#anchor2") {
        (position as any).offset = { y: 100 };
      }

      if (document.querySelector(to.hash)) {
        return {
          selector: <any>window.scrollTo({
            top: document.querySelector(to.hash).offsetTop,
            behavior: "smooth",
          }),
        };
        // return position
      }

      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return false;
    }

    return new Promise((resolve) => {
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some((m) => m.meta.scrollToTop)) {
        // coords will be used if no selector is provided,
        // or if the selector didn't match any element.
        (position as any).x = 0;
        (position as any).y = 0;
      }

      // wait for the out transition to complete (if necessary)
      this.app.$root.$once("triggerScroll", () => {
        // if the resolved position is falsy or an empty object,
        // will retain current scroll position.
        resolve(position);
      });
    });
  }
};

const router = new Router({
  scrollBehavior: scrollBehavior,
  routes: [
    { name: "home", path: "/", component: Home },
    { name: "traintable", path: "/traintable", component: TrainTable },
    { name: "heatmap  ", path: "/heatmap", component: Heatmap },
    { name: "algotable", path: "/algotable", component: AlgoTable },
    { name: "metrics", path: "/metrics", component: Metrics },
  ],
});

export default router;
