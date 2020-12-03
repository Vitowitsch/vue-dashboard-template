<template>
  <div>
    <div>
      <Datatable
        :table="tableName"
        :tag="tag"
        style="width: 100%; height: 350px"
        :columns="columns"
        :customMenu="false"
        :update_data="update_row_data"
      ></Datatable>
      <ChartTab :tag="tag" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Datatable from "@/components/Datatable";
import { cols } from "@/components/table/columns_by_algo.js";
import ChartTab from "@/views/tables/ChartTab";
import { update_data } from "@/composables/tableData.js";

export default {
  name: "AlgoTable",
  components: {
    Datatable,
    ChartTab,
  },

  setup(props) {
    let tableName = "algotable";
    return {
      update_row_data: update_data,
      selectedStyle: "overflow: hidden;",
      tableName: tableName,
      tag: tableName.concat("-chart"),
      columns: cols,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    };
  },
};
</script>

