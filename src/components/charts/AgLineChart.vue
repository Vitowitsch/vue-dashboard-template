<template>
  <div>
    <ag-charts-vue :options="options"></ag-charts-vue>
  </div>
</template>

<script>
import Vue from "vue";
import { AgChartsVue } from "ag-charts-vue";
import { ConfigProvider } from "@/composables/cfgProvider";
import random_data from "@/../tests/data/linechart_data.js";
import forEach from "lodash/forEach";
import filter from "lodash/filter";

export default {
  name: "App",
  components: {
    AgChartsVue,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    chartData: {
      type: Array,
      required: false,
      default: function () {
        return random_data();
      },
    },
    trains: {
      type: Object,
      required: true,
    },
  },

  data: function () {
    return {
      options: null,
      showThresholds: false,
    };
  },
  beforeMount() {
    let thresholds = ConfigProvider.thresholds[this.title.split(" ")[0]];
    let seriesdef = [];
    for (const [key, value] of Object.entries(this.trains)) {
      let trainData = filter(this.chartData, function (o) {
        if (Object.keys(o)[0] === key) return true;
        return false;
      });

      let series = {
        type: "line",
        xKey: "date",
        yKey: key,
        stroke: value,
        marker: {
          fill: value,
        },
        data: trainData,
      };
      seriesdef.push(series);
    }
    if (undefined != thresholds) {
      this.showThresholds = true;
      forEach(this.chartData, (v) => {
        v["threshold_0"] = thresholds[0];
        v["threshold_1"] = thresholds[1];
        v["threshold_2"] = thresholds[2];
      });

      seriesdef.push({
        type: "line",
        xKey: "date",
        yKey: "threshold_0",
        stroke: "#ffd000",
        visible: false,
        marker: {
          size: 0,
          fill: "#ffff00",
        },
      });
      seriesdef.push({
        type: "line",
        xKey: "date",
        yKey: "threshold_1",
        stroke: "#FFA500",
        visible: false,
        marker: {
          size: 0,
          fill: "#FFA500",
        },
      });
      seriesdef.push({
        type: "line",
        xKey: "date",
        yKey: "threshold_2",
        visible: false,
        stroke: "#ff0000",
        marker: {
          size: 0,
          fill: "#ff0000",
        },
      });
    }

    this.options = {
      autoSize: true,
      title: {
        text: this.title,
        fontSize: 18,
      },
      series: seriesdef,
      axes: [
        {
          position: "bottom",
          type: "time",
          label: {
            rotation: 270,
            format: "%b:%e",
          },
        },
        {
          position: "left",
          type: "number",
        },
      ],
    };
  },
};
</script>