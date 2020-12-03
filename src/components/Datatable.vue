<template>
  <ag-grid-vue
    class="ag-theme-balham"
    id="myGrid"
    :gridOptions="gridOptions"
    @grid-ready="onGridReady"
    :columnDefs="columns"
    :defaultColDef="defaultColDef"
    :floatingFilter="true"
    @first-data-rendered="onFirstDataRendered"
    :frameworkComponents="frameworkComponents"
    :rowData="rowData"
    :aggFuncs="aggFuncs"
    :overlayNoRowsTemplate="noRowsTemplate"
    :valueCache="true"
  ></ag-grid-vue>
</template>


<script>
import { EventBus } from "@/api/event-bus.js";
import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import "../../node_modules/ag-grid-community/dist/styles/ag-grid.css";
import "../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";
import GroupRowInnerRenderer from "@/components/table/groupRowInnerRenderer.js";
import useCtxMenu from "@/composables/useCtxMenu";
import { TableChart } from "@/composables/useTableChart.ts";
import { ref } from "@/composition";
import ActionBtnRenderer from "@/components/table/ActionBtnRenderer.vue";
import ReliableCellRenderer from "@/components/table/ReliableCellRenderer.vue";
import PercentageCellRenderer from "@/components/table/PercentageCellRenderer.vue";
import OutOfOperationCellRenderer from "@/components/table/OutOfOperationCellRenderer.vue";
import MileageCellRenderer from "@/components/table/MileageCellRenderer.vue";

export default {
  name: "Datatable",
  props: {
    table: { type: String, required: true },
    tag: { type: String, required: true },
    columns: { type: Array, required: true },
    pivot: { type: Boolean, required: false },
    customMenu: {
      type: Boolean,
      required: false,
      default: false,
    },
    useChart: {
      type: Boolean,
      required: false,
      default: true,
    },
    update_data: {
      type: Function,
      required: true,
    },
    withChart: { type: Boolean, required: false, default: false },
  },
  components: {
    "ag-grid-vue": AgGridVue,
    ReliableCellRenderer,
    PercentageCellRenderer,
    OutOfOperationCellRenderer,
    MileageCellRenderer,
  },
  setup(props) {
    let chartTag = props.tag;
    var tableChart = new TableChart(chartTag);
    let rowData = [];
    let aggFuncs = {
      cnt: cntResults,
    };

    const ctxMenu = props.customMenu
      ? useCtxMenu
      : () => {
          return [];
        };

    return {
      onFirstDataRendered: props.useChart
        ? tableChart.onFirstDataRendered
        : () => {
            return [];
          },
      onRowGroupOpened: props.useChart
        ? tableChart.onRowGroupOpened
        : () => {
            return [];
          },
      rowData,
      ctxMenu,
      chartTag,
      update_data_fct: props.update_data,
      aggFuncs,
      noRowsTemplate: `loading...`,
    };
  },
  data: function () {
    return {};
  },
  beforeMount() {
    this.frameworkComponents = {
      childMessageRenderer: ActionBtnRenderer,
    };
    this.gridOptions = {
      enableRangeSelection: true,
      enableCharts: true,
      animateRows: true,
      onRowGroupOpened: this.onRowGroupOpened,
      components: {
        reliableCellRenderer: ReliableCellRenderer,
        outOfOperationCellRenderer: OutOfOperationCellRenderer,
        percentageCellRenderer: PercentageCellRenderer,
        mileageCellRenderer: MileageCellRenderer,
      },
      suppressAggFuncInHeader: true,
    };
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
    };
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridOptions.enableCharts = true;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  methods: {
    onGridReady(params) {
      const httpRequest = new XMLHttpRequest();
      this.update_data_fct(this);
    },
  },
};

window.cntResults = function cntResults(params) {
  if (params.length == 0) {
    return 1;
  }
  var result = 0;
  params.forEach(function (value) {
    if (typeof value === "number") {
      result += value;
    }
  });
  return result;
};
</script>

