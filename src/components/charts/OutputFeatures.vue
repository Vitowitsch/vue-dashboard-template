<template>
  <div>
    <v-progress-linear indeterminate :active="loading"></v-progress-linear>
    <LineChartIterator :key="loading" v-show="!newborn" :data="result" />
  </div>
</template>


<script>
import { EventBus } from "@/api/event-bus.js";
import LineChartIterator from "@/components/charts/LineChartIterator";
import get_mock_data from "@/../tests/data/health_hist_mock.js";
import { ref, reactive, onMounted } from "@/composition";
import { useFeatureOutChart } from "@/composables/useFeatureOutChart";

export default {
  components: {
    LineChartIterator
  },
  setup() {
    let loading = ref(false);
    let newborn = ref(true);
    let result = reactive({ features: {}, trains: {} });

    onMounted(() => {
      EventBus.$on("output-features-clicked", function(_trains, comps, algo) {
        _trains.forEach(t => {
          result.trains[t] = "#" + Math.floor(Math.random() * 16777215).toString(16);
        });
        useFeatureOutChart().fetch(
          result,
          _trains,
          comps,
          algo,
          loading,
          newborn
        );
      });
    });

    const getMockData = () => {
      result = get_mock_data();
    };

    return {
      loading,
      newborn,
      result
    };
  }
};
</script>
