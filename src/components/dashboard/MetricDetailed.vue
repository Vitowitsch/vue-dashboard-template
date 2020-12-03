<template>
  <div id="dashboard-details" @resize="onResize">
    <v-row justify-center>
      <v-row justify-center>
        <v-col cols="12" md="6">
          <v-chart :options="sunburstOptions" autoresize theme="customed" />
          <div class="text-center">
            <v-sheet> {{ selectedDay }}</v-sheet>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div id="calendarChart" class="echarts"></div>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script>
import Vue from "vue";
import { EventBus } from "@/api/event-bus.js";
import * as useSunburst from "@/composables/useSunburst";
import * as useRamsMenu from "@/composables/useRamsMenu";
import * as useDashboardInit from "@/composables/useDashboardInit";
import * as usePreprocessing from "@/composables/useRamsPreprocessing";
import { ignoreOutOfOperation } from "@/composables/useReliability";
import { onCarLevel } from "@/composables/useReliability";
import { Calendar } from "@/composables/useCalendar.ts";

import {
  ref,
  reactive,
  computed,
  onMounted,
  watchEffect,
  watch,
} from "@/composition";

import echarts from "echarts";
import { getSunburstData } from "@/composables/useReliability";
Vue.prototype.$echarts = echarts;

export default {
  props: {
    metric: String,
    data: Object,
  },
  setup(props) {
    let calendar = new Calendar(props.data, props.metric);
    const onResize = (e) => {
      // this.width = e.detail.width;
      this.calendar.handleCharts();
    };
    let description = computed(() => {
      return useRamsMenu.description[props.metric];
    });

    let selectedDayData = undefined;
    let selectedDay = calendar.selectedDay;

    let group_fct;
    var sunburstOptions = {};
    let mounted = false;

    onMounted(() => {
      calendar.handleCharts();
      mounted = true;
    });

    watch(
      () => [
        selectedDay.value,
        props.metric,
        ignoreOutOfOperation.value,
        onCarLevel.value,
      ],
      (x, previous) => {
        if (selectedDayData === undefined || typeof x[0] === "string") {
          selectedDayData = ref(props.data[selectedDay.value]);
        }
        group_fct = useRamsMenu.group_fcts[props.metric].slice();

        Object.assign(
          sunburstOptions,
          useSunburst.update(
            props.metric,
            description.value,
            selectedDayData.value,
            group_fct,
            selectedDay.value
          )
        );
        sunburstOptions = reactive(sunburstOptions);
      }
    );

    watch(
      () => [props.metric, ignoreOutOfOperation.value, onCarLevel.value],
      (x, previous) => {
        if (mounted) {
          calendar = new Calendar(props.data, props.metric);
          calendar.handleCharts();
        }
      }
    );

    return {
      calendar: calendar,
      sunburstOptions,
      description,
      selectedDay,
      selectedDayData,
      ignoreOutOfOperation,
      onCarLevel,
      reliabilityText: useRamsMenu.selectItems["reliability"],
      onResize,
      mounted,
    };
  },
};
</script>
<style lang="stylus" scoped>
.echarts {
  width: 100%;
  min-width: 0;
  height: 40vw;
}
</style>