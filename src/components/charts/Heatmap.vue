<template>
  <div>
    <figure>
      <v-chart
        :options="options"
        :init-options="initOptions"
        autoresize
        theme="customed"
      />
    </figure>
  </div>
</template>

<script>
import Vue from "vue";
import ECharts from "vue-echarts";
import { ref, reactive, watch, watchEffect } from "@/composition";
import { Heatmap } from "@/composables/useHeatmap";
import { getOptions } from "@/composables/usePie";
import { HeatmapFilter } from "@/model/HeatmapFilter";

Vue.component("v-chart", ECharts);

export default {
  props: {
    heatmapOptions: { type: Object, required: true },
  },
  setup(props) {
    let options = reactive(props.heatmapOptions);
    return {
      options,
      initOptions: {
        renderer: "canvas",
      },
    };
  },
};
</script>

<style lang="stylus" scoped>
figure {
  .echarts {
    height: 500px;
    width: 95%;
  }
}
</style>
