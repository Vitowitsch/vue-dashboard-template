<template>
  <div>
    <Datatable
      :table="tableName"
      :tag="tag"
      style="width: 100%; height: 400px"
      :columns="columns"
      :customMenu="false"
      :update_data="data"
    ></Datatable>
    <ChartTab :tag="tag" />
  </div>
</template>

<script>
import Vue from "vue";
import { ref, watchEffect } from "@/composition";
import Datatable from "@/components/Datatable";
import { cols } from "@/components/table/columns_by_train.js";
import ChartTab from "@/views/tables/ChartTab";
import * as useTableData from "@/composables/tableData.js";
import { update_data } from "@/composables/tableData.js";

export default {
  name: "TrainTable",
  components: {
    Datatable,
    ChartTab,
  },

  setup(props) {
    let tableName = "traintable";
    let table_data = ref([]);
    watchEffect(async () => {
      table_data.value = await useTableData.get();
    });

    return {
      data: useTableData.update_data,
      tableName: tableName,
      tag: tableName.concat("-chart"),
      selectedStyle: "overflow: hidden;",
      columns: cols,
    };
  },
};
</script>

