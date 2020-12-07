<template>
  <div>
    <v-container fluid>
      <v-card class="mx-auto">
        <v-layout>
          <v-col md="6">
            <v-chip-group
              active-class="primary--text"
              column
              multiple
              :max="maxSelect.x"
            >
              <v-chip
                small
                filter
                outlined
                v-for="tag in selectOptions.x"
                :key="tag"
                @click="select(tag, 'x')"
              >
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col md="6">
            <v-chip-group
              active-class="primary--text"
              column
              multiple
              :max="maxSelect.y"
            >
              <v-chip
                small
                filter
                outlined
                v-for="tag in selectOptions.y"
                :key="tag"
                @click="select(tag, 'y')"
              >
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-layout>

        <v-slider
          v-model="startDateIdx"
          :tick-labels="selectOptions.days"
          @click="idx2Day(startDateIdx)"
          :max="3"
          step="1"
          ticks="always"
          tick-size="4"
        ></v-slider>
        <center>
          <span
            style="color: teal"
            v-text="`start-date: ${selection.startDate}`"
          ></span>
        </center>
        <Heatmap :heatmapOptions="options"></Heatmap>
        <InputFeatures />
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import Heatmap from "@/components/charts/Heatmap";
import { ref, reactive, watch, watchEffect } from "@/composition";
import { Heatmap as HeatmapModel } from "@/composables/useHeatmap";
import { get as getTableData } from "@/composables/tableData";
import { HeatmapFilter } from "../../model/HeatmapFilter";
import InputFeatures from "@/components/charts/InputFeatures";
import OutputFeatures from "@/components/charts/OutputFeatures";
import _uniq from "lodash/uniq";
import _map from "lodash/map";
import _filter from "lodash/filter";
import _isEmpty from "lodash/isEmpty";
import { EventBus } from "@/api/event-bus.js";
const moment = require("moment");

export default {
  components: {
    Heatmap,
    InputFeatures,
    OutputFeatures,
  },

  setup(props) {
    const maxSelect = { x: 4, y: 4 };
    let _data = ref([]);
    let heatmap = new HeatmapModel(
      _data.value,
      new HeatmapFilter(false, new Set([]), false, new Set([]))
    );
    let cars;
    let xOpt;
    let yOpt;
    let objectid_prefix;
    let startDateIdx = ref(0);
    let options = reactive(heatmap.getOptions());

    let selectOptions = reactive({
      x: [],
      y: [],
      days: [
        "1970-01-01",
        moment().subtract(2, "weeks").format("YYYY-MM-DD"),
        moment().subtract(1, "weeks").format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD"),
      ],
    });
    var selection = reactive({ x: [], y: [], startDate: "" });

    const idx2Day = (idx) => {
      return (selection.startDate = selectOptions.days[idx]);
    };

    const select = (tag, axis) => {
      let idx = selection[axis].indexOf(tag);
      if (-1 === idx) {
        if (selection[axis].length < maxSelect[axis]) {
          selection[axis].push(tag);
        }
      } else {
        selection[axis].splice(idx, 1);
      }
    };

    const renderCharts = (xSelect, ySelect, immediate = false) => {
      if (
        immediate ||
        (xSelect.length <= maxSelect.x && 1 === ySelect.length)
      ) {
        let objects = xSelect.map((item) => objectid_prefix.concat(item));
        objects = [objects[0]];
        EventBus.$emit("input-features-clicked", objects, cars, ySelect[0]);

        let components = _uniq(
          _map(
            _data.value.filter(function (d) {
              if (d.origin === ySelect[0]) {
                return true;
              }
              return false;
            }),
            "diagid"
          )
        );
        EventBus.$emit(
          "output-features-clicked",
          objects,
          components,
          ySelect[0]
        );
      }
    };

    const update = (xSelect, ySelect, startDate) => {
      let zoomX = true;
      let zoomY = true;
      if (_isEmpty(xSelect)) {
        zoomX = false;
        xSelect = selectOptions.x;
      }
      if (_isEmpty(ySelect)) {
        zoomY = false;
        ySelect = selectOptions.y;
      }
      heatmap = new HeatmapModel(
        _data.value,
        new HeatmapFilter(
          zoomX,
          new Set(xSelect),
          zoomY,
          new Set(ySelect),
          startDate
        )
      );
      Object.assign(options, heatmap.getOptions());
      options = reactive(options);
      renderCharts(xSelect, ySelect);
    };

    watchEffect(async () => {
      _data.value = await getTableData();
      xOpt = _uniq(_map(_data.value, "objectid"));
      yOpt = _uniq(_map(_data.value, "origin"));
      cars = _uniq(_map(_data.value, "carnumber"));

      selection.startDate = selectOptions.days[0];
      objectid_prefix = xOpt[0].slice(0, -2);
      xOpt.forEach(function (part, index, callback) {
        callback[index] = callback[index].slice(-2);
      });
      selectOptions.x = xOpt;
      selectOptions.y = yOpt;
      if ("true" == process.env.VUE_APP_HEATMAP_CHARTS_SUDDENLY) {
        renderCharts(selectOptions.x, selectOptions.y, true);
      }
    });

    watch(
      () => [selection["x"], selection["y"], selection["startDate"]],
      (observed, previousSelection) => {
        update(observed[0], observed[1], observed[2]);
      }
    );

    return {
      select,
      selection,
      options,
      selectOptions,
      maxSelect,
      idx2Day,
      startDateIdx,
      pre: [1],
    };
  },
};
</script>
