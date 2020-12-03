import _remove from "lodash/remove";

export class TableChart {
  tag;
  constructor(tag) {
    this.tag = tag;
  }

  public onFirstDataRendered = (params, rowStartIndex, rowEndIndex) => {
    let cols = params.columnApi.getAllGridColumns();
    _remove(cols, function(c) {
      if (c.colDef.hasOwnProperty("chartDataType")) {
        return true;
      }
      return false;
    });
    let chartTag = "#".concat(this.tag);
    console.log(chartTag);
    var createRangeChartParams = {
      cellRange: {
        rowStartIndex,
        rowEndIndex,
        columns: ["ag-Grid-AutoColumn", ...cols],
      },
      chartType: "groupedColumn",
      suppressChartRanges: true,

      chartContainer: document.querySelector(chartTag),
      processChartOptions: function(params) {
        params.options.legend.position = "bottom";
        return params.options;
      },
    };
    params.api.createRangeChart(createRangeChartParams);
  };

  public onRowGroupOpened = (params) => {
    let activeCharts = params.api.chartService.activeCharts;
    activeCharts.forEach((chart) => {
      chart.destroyChart();
    });
    if (params.node.expanded) {
      const childrenCount = params.node.childrenAfterGroup.length;
      const startIndex = params.rowIndex;
      const endIndex = startIndex + childrenCount;
      this.onFirstDataRendered(params, startIndex, endIndex);
    } else {
      this.onFirstDataRendered(params, undefined, undefined);
    }
  };
}
