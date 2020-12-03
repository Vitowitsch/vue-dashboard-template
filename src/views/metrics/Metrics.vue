<template>
  <div>
    <v-container fluid v-if="loaded">
      <v-expansion-panels tile>
        <v-expansion-panel>
          <v-select
            color="#a45a52"
            chips
            :items="metrics"
            v-model="selected"
            return-object
            label="Function"
          ></v-select>
          <MetricDetailed :data="data" :metric="selected"></MetricDetailed>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row no-gutters>
        <v-col v-for="x in metrics" :key="x" cols="12" sm="3">
          <Metric :metric="x" :data="data"></Metric>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Vue from "vue";
import Metric from "@/components/dashboard/Metric";
import MetricDetailed from "@/components/dashboard/MetricDetailed";
import * as useRamsMenu from "@/composables/useRamsMenu";
import * as useDashboardInit from "@/composables/useDashboardInit";
import {
  ref,
  reactive,
  computed,
  onMounted,
  watchEffect,
  watch,
} from "@/composition";

import echarts from "echarts";
import { getMovements } from "../../../tests/data/ramsData";
Vue.prototype.$echarts = echarts;

export default {
  components: {
    Metric,
    MetricDetailed,
  },
  setup() {
    const metrics = Object.keys(useRamsMenu.group_fcts);
    let selected = ref("");
    let group_fct;
    let loaded = ref(false);
    var data = ref([]);
    watchEffect(async () => {
      await useDashboardInit.getAsyncMovements();
      data.value = await useDashboardInit.getData();
      selected.value = metrics[0];
      loaded.value = true;
    });
    const setMetric = (x) => {
      selected.value = x;
    };

    return {
      selected,
      data,
      metrics,
      setMetric,
      loaded,
    };
  },
};
</script>
<style  scoped>
.echarts {
  width: 1200px;
  height: 800px;
}
</style>