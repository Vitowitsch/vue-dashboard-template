import * as value_getters from "@/components/table/value_getters";

var cols = [
  {
    headerName: "algo",
    field: "origin",
    rowGroup: true,
    colId: "params",
    enableRowGroup: true,
    hide: true,
  },
  {
    headerName: "train",
    field: "objectid",
    sortable: true,
    rowGroup: true,
    hide: true,
    enableRowGroup: true,
  },
  {
    headerName: "car",
    field: "carnumber",
    hide: true,
  },
  {
    headerName: "action",
    field: "value",
    cellRenderer: "childMessageRenderer",
    colId: "params",
    maxWidth: 200,
    filter: false,
  },
  {
    headerName: "time",
    field: "lastResultTime",
    maxWidth: 200,
  },
  {
    headerName: "mileage",
    field: "mileage",
    colId: "mileageCol",
    valueGetter: value_getters.mileageValueGetter,
    cellRendererFramework: "MileageCellRenderer",
    aggFunc: "first",
    maxWidth: 100,
  },
  {
    headerName: "out-of-op",
    field: "origin",
    colId: "outOfOpCol",
    valueGetter: value_getters.outOfOpValueGetter,
    aggFunc: "max",
    cellRendererFramework: "OutOfOperationCellRenderer",
    maxWidth: 100,
  },
  {
    headerName: "available",
    field: "lastResult_HS",
    colId: "available_cnt",
    valueGetter: value_getters.availableValueGetter,
    aggFunc: "sum",
    maxWidth: 100,
  },
  {
    headerName: "expected",
    field: "lastResult_HS",
    colId: "expected_cnt",
    valueGetter: value_getters.expectedValueGetter,
    aggFunc: "sum",
    maxWidth: 100,
  },
  {
    headerName: "%",
    field: "percentage",
    valueGetter: value_getters.percentageValueGetter,
    maxWidth: 150,
    cellRendererFramework: "PercentageCellRenderer",
  },
  {
    headerName: "reliable",
    aggFunc: "min",
    colId: "reliableCol",
    valueGetter: value_getters.reliableValueGetter,
    maxWidth: 150,
    cellRendererFramework: "ReliableCellRenderer",
  },

  {
    headerName: "max(HS)",
    field: "lastResult_HS",
    valueGetter: value_getters.maxHSValueGetter,
    aggFunc: "max",
    maxWidth: 100,
    sortable: true,
  },
];

export { cols };
