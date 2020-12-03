import * as useRamsMenu from "@/composables/useRamsMenu";
import * as usePie from "@/composables/usePie";
import forEach from "lodash/forEach";
import echarts from "echarts";
import { ref } from "@/composition";

export class Calendar {
  data;
  pie_data;
  scatterData;
  pieRadius = 30;
  cellSize = [90, 90];
  metric;
  public selectedDay = ref("");

  constructor(data, metric) {
    this.data = data;
    this.metric = metric;

    this.selectedDay.value = Object.keys(this.data)[1];
    this.pie_data = usePie.getValues(
      this.data,
      useRamsMenu.group_fcts[this.metric][0]
    );
    this.scatterData = this.init();
  }

  private init() {
    let boundaries = this.getBoundary();
    var date = +echarts.number.parseDate(boundaries[0]);
    var end = +echarts.number.parseDate(boundaries[1]);
    var dayTime = 3600 * 24 * 1000;
    var result = [];
    for (var time = date; time <= end; time += dayTime) {
      let current_day = this.toLocal(new Date(time));
      result.push([current_day, this.pie_data[current_day]]);
    }
    return result;
  }

  private getBoundary() {
    let timespan = Object.keys(this.data).sort();
    return [timespan[0], timespan[timespan.length - 1]];
  }

  private toLocal(_date) {
    return _date.toISOString().slice(0, 10);
  }

  private getPieData(chart) {
    var _this = this;
    return echarts.util.map(this.scatterData, function(item, index) {
      var center = chart.convertToPixel("calendar", item);
      return {
        id: item[0],
        type: "pie",
        center: center,
        label: {
          normal: {
            formatter: "{c}",
            position: "inside",
          },
        },
        radius: _this.pieRadius,
        data: _this.pie_data[item[0]],
      };
    });
  }

  private getPieDataUpdate(chart) {
    return echarts.util.map(this.scatterData, function(item, index) {
      var center = chart.convertToPixel("calendar", item);
      return {
        id: index + "pie",
        center: center,
      };
    });
  }

  public handleCharts() {
    let boundaries = this.getBoundary();
    var myChart = echarts.init(
      document.getElementById("calendarChart"),
      "customed"
    );

    var calenderKeys = [];

    forEach(this.scatterData, (s) => {
      calenderKeys.push([s[0], -1]);
    });

    let option = {
      legend: {
        bottom: 20,
      },
      calendar: {
        top: "middle",
        left: "center",
        orient: "vertical",
        cellSize: this.cellSize,
        yearLabel: {
          show: true,
          textStyle: {
            fontSize: 30,
          },
        },
        dayLabel: {
          margin: 20,
          firstDay: 1,
          nameMap: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          show: true,
        },
        monthLabel: {
          show: true,
        },
        range: [boundaries[0], boundaries[1]],
      },
      series: [
        {
          id: "label",
          type: "scatter",
          coordinateSystem: "calendar",
          symbolSize: 1,
          label: {
            normal: {
              show: true,
              formatter: function(params) {
                return echarts.format.formatTime("dd", params.value[0]);
              },
              offset: [-this.cellSize[0] / 2 + 10, -this.cellSize[1] / 2 + 10],
              textStyle: {
                fontSize: 14,
              },
            },
          },
          data: calenderKeys,
        },
      ],
    };
    var _this = this;
    if (!myChart.inNode) {
      var pieInitialized;
      setTimeout(function() {
        pieInitialized = true;
        myChart.setOption({
          series: _this.getPieData(myChart),
        });
      }, 10);

      myChart.onresize = function() {
        if (pieInitialized) {
          myChart.setOption({
            series: _this.getPieDataUpdate(myChart),
          });
        }
      };
    }
    myChart.on("click", function(event) {
      _this.selectedDay.value = event.seriesId;
    });
    myChart.setOption(option);
  }
}
