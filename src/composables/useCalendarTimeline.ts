import { reactive, ref } from "@/composition";
import * as useGrouping from "@/composables/useGrouping";

export class CalendarTimeline {
  data;
  header = ["metric"];
  options = reactive({});
  days = [];
  group_fct;
  public currentDay;

  constructor(data, group_fct) {
    this.data = data;
    this.group_fct = group_fct;
    this.days = Object.keys(this.data).sort();
    this.header.push(...this.days);
    this.currentDay = ref(this.days[this.days.length - 2]);
  }

  private getSeries(dataset) {
    let series = [];
    for (var i = 0; i < dataset.length - 1; i++) {
      series.push({ type: "line", smooth: true, seriesLayoutBy: "row" });
    }
    return series;
  }

  public getDataset() {
    let dataset = [this.header];
    let metricTimeLine = {};
    let timeAggregated = this.getTimeAggregated();
    let allMetrics = new Set();
    Object.values(timeAggregated).forEach((e) => {
      Object.keys(e).forEach((m) => allMetrics.add(m));
    });
    for (var day of this.days) {
      let dayMetric = timeAggregated[day];
      for (var m of allMetrics) {
        let key: any = m;
        if (!metricTimeLine[key]) {
          metricTimeLine[key] = [];
        }
        let value = 0;
        if (m in dayMetric) {
          value = dayMetric[m];
        }
        metricTimeLine[key].push(value);
      }
    }
    let keys = Object.keys(metricTimeLine).sort();
    for (let metric of keys) {
      let _timedata = metricTimeLine[metric] as any;
      let metric_line = [metric, ..._timedata];
      dataset.push(metric_line);
    }
    return dataset;
  }

  private getTimeAggregated() {
    let timeAggregated = {};
    for (const [key, dayData] of Object.entries(this.data)) {
      timeAggregated[key] = this.getDayAggregation(dayData, key);
    }
    return timeAggregated;
  }

  public getOptions() {
    let dataset = this.getDataset();
    this.options = {
      tooltip: {
        trigger: "axis",
        showContent: true,
      },
      dataset: {
        source: dataset,
      },
      xAxis: { type: "category" },
      yAxis: { gridIndex: 0 },
      series: this.getSeries(dataset),
      legend: { position: "bottom" },
    };
    return this.options;
  }

  public updateAxisPointer(params) {
    var xAxisInfo = params.axesInfo[0];
    if (xAxisInfo) {
      this.currentDay.value = this.days[xAxisInfo.value];
    }
  }

  private getDayAggregation(dayData, day) {
    let day_aggregated = {};
    let grouped = this.group_fct(dayData, day);

    Object.entries(grouped).forEach(([x, y], index) => {
      let yy = y as any;
      day_aggregated[x] = useGrouping.getObjects(yy).length;
    });
    return day_aggregated;
  }
}
