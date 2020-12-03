<template>
  <div>
    <v-progress-linear indeterminate :active="loading"></v-progress-linear>
    <LineChartIterator :key="loading" v-show="!newborn" :data="result"/>
  </div>
</template>

<script>
import { EventBus } from "@/api/event-bus.js";
import LineChartIterator from "@/components/charts/LineChartIterator";
import random_data from "@/../tests/data/linechart_data.js";
import { useFeatureInChart } from "@/composables/useFeatureInChart";
import { ref, reactive, onMounted } from "@/composition";

export default {
  components: {
    LineChartIterator
  },

  setup() {
    let loading = ref(false);
    let newborn = ref(true);
    let result = reactive({ features: {}, trains: {} });
    EventBus.$on("input-features-clicked", function(_trains, cars, algo) {
      _trains.forEach(t => {
        result.trains[t] =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
      });

      useFeatureInChart().fetch(_trains, cars, algo, result, loading, newborn);
    });


    const getMockData = () => {
      result = random_data(["feat_1", "feat_2"]);
    };

    return {
      loading,
      newborn,
      result
    };
  }
};
</script>