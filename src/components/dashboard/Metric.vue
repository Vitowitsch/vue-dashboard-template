<template>
  <div>
    <v-chart
      style="width: 100%; height: 400px"
      :options="pieOptions"
      autoresize
      theme="customed"
    />
    <v-chart
      style="width: 100%; height: 200px"
      :options="timelineOptions"
      autoresize
      @updateAxisPointer="updateAxisPointer"
      theme="customed"
    />

    <div class="text-center">
      <v-sheet> {{ caltimeline.currentDay.value }}</v-sheet>
      <center v-if="pieOptions['title']['text'] == reliabilityText">
        <v-checkbox
          v-model="ignoreOutOfOperation"
          label="Ignore out-of-operation"
        ></v-checkbox>
      </center>
      <div v-else>
        <br />
        <br />
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  computed,
  onMounted,
  watchEffect,
  watch,
} from "@/composition";

import * as useRamsMenu from "@/composables/useRamsMenu";
import * as useSunburst from "@/composables/useSunburst";
import * as usePie from "@/composables/usePie";
import * as useGrouping from "@/composables/useGrouping";
import { CalendarTimeline } from "@/composables/useCalendarTimeline";
import * as useReliability from "@/composables/useReliability";
import { ignoreOutOfOperation } from "@/composables/useReliability";
import * as useDashboardInit from "@/composables/useDashboardInit";

var averages_rendered_cnt = 0;

export default {
  props: {
    metric: String,
    data: Object,
  },
  setup(props) {
    const reliabilityText = useRamsMenu.selectItems["reliability"];
    let caltimeline = new CalendarTimeline(
      props.data,
      useRamsMenu.group_fcts[props.metric][0]
    );
    let movements_loaded = ref(false);
    let description = computed(() => {
      return useRamsMenu.description[props.metric];
    });

    var timelineOptions = {};

    const updateAxisPointer = (params) => {
      caltimeline.updateAxisPointer(params);
    };

    let selectedDayData = undefined;
    let timeline = Object.keys(props.data);
    timeline.unshift("");
    timeline.splice(7);

    var pieOptions = {};

    let showDetails = ref(false);

    selectedDayData = ref(props.data[caltimeline.currentDay.value]);

    const getTimeline = () => {
      Object.assign(timelineOptions, caltimeline.getOptions());
      timelineOptions = reactive(timelineOptions);
    };

    watch(
      () => [
        useReliability.ignoreOutOfOperation.value,
        useReliability.onCarLevel.value,
      ],
      (x) => {
        getTimeline();
      }
    );

    watch(
      () => [
        caltimeline.currentDay.value,
        useReliability.ignoreOutOfOperation.value,
        useReliability.onCarLevel.value,
      ],
      (x) => {
        selectedDayData.value = props.data[caltimeline.currentDay.value];
        Object.assign(
          pieOptions,
          useSunburst.update(
            props.metric,
            useRamsMenu.description[props.metric],
            selectedDayData.value,
            [useRamsMenu.group_fcts[props.metric][0]],
            x[0]
          )
        );

        pieOptions = reactive(pieOptions);
      }
    );
    return {
      pieOptions,
      description,
      showDetails,
      ignoreOutOfOperation: useReliability.ignoreOutOfOperation,
      onCarLevel: useReliability.onCarLevel,
      caltimeline,
      reliabilityText,
      updateAxisPointer,
      selectedDayData,
      timelineOptions,
    };
  },
};
</script>
