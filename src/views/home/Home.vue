<template>
  <div>
    <TrainTable></TrainTable>
    <AlgoTable></AlgoTable>
    <Heatmap></Heatmap>
    <Metrics></Metrics>
  </div>
</template>
<script>
import Vue from "vue";
import Metrics from "@/views/metrics/Metrics";
import Heatmap from "@/views/heatmap/Heatmap";
import AlgoTable from "@/views/tables/AlgoTable";
import TrainTable from "@/views/tables/TrainTable";

export default {
  components: {
    Metrics,
    Heatmap,
    AlgoTable,
    TrainTable,
  },
};
</script>