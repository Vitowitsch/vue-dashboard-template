import forEach from "lodash/forEach";
import groupBy from "lodash/groupBy";
import includes from "lodash/includes";
import maxBy from "lodash/maxBy";
import { HeatmapFilter } from "@/model/HeatmapFilter";

export class Heatmap {
  filter: HeatmapFilter;
  data = [];
  public agg = {};
  x_values;
  y_values;
  x_key = "x_key";
  y_key = "y_key";
  axisLabels = { x: [], y: [] };

  constructor(data, filter: HeatmapFilter) {
    this.filter = filter;
    forEach(data, (d) => {
      if (d["lastResultTime"] < filter.getStartDate()) {
        return;
      }
      let copy = Object.assign({}, d);
      copy["objectid"] = copy["objectid"].slice(-2);
      if (this.filter.x.has(copy.objectid) && this.filter.y.has(copy.origin)) {
        this.buildAxisKey(copy, this.x_key, this.filter.getXKey);
        this.buildAxisKey(copy, this.y_key, this.filter.getYKey);
        this.data.push(copy);
      }
    });

    let grouped = groupBy(this.data, (item) => {
      return [item[this.x_key], item[this.y_key]];
    });

    this.agg = this.aggregate(grouped);

    this.setAxisLabels();
  }

  private setAxisLabels() {
    const addCoord = (values, newVal) => {
      if (!includes(values, newVal)) {
        values.push(newVal);
      }
    };

    forEach(Object.keys(this.agg), (key) => {
      let coord = key.split(",");
      addCoord(this.axisLabels.x, coord[0]);
      addCoord(this.axisLabels.y, coord[1]);
    });
  }

  public getAxisLabels() {
    return this.axisLabels;
  }

  private buildAxisKey(d, axis, callback) {
    let filter = callback(this.filter);
    d[axis] = "";
    forEach(filter, (k) => {
      if ("" != d[axis]) {
        d[axis] += "/";
      }
      d[axis] += d[k];
    });
  }

  public getMatrixData() {
    let xy = [];
    this.axisLabels.x.sort().forEach((x) =>
      this.axisLabels.y.sort().forEach((y) => {
        let key = x + "," + y;
        if (this.agg.hasOwnProperty(key)) {
          xy.push([x, y, this.agg[key]["lastResult_HS"]]);
        } else {
          xy.push([x, y, ""]);
        }
      })
    );
    return xy;
  }

  public getEnv(x, y) {
    let key = x + "," + y;
    return this.agg[key];
  }

  private static max(data) {
    return maxBy(data, function(o) {
      return o["lastResult_HS"];
    });
  }

  public aggregate(data) {
    let byMax = {};
    for (const [key, value] of Object.entries(data)) {
      byMax[key] = Heatmap.max(value);
    }
    return byMax;
  }

  public getOptions() {
    let _this = this;
    return {
      tooltip: {
        position: "top",
        formatter: function(params) {
          let env = _this.getEnv(params.value[0], params.value[1]);
          return env["diagid"] + " of " + env["lastResultTime"];
        },
      },
      animation: false,
      grid: {
        height: "80%",
        top: "10%",
      },
      xAxis: {
        type: "category",
        data: this.getAxisLabels().x,
        splitArea: {
          show: true,
        },
      },
      yAxis: {
        type: "category",
        data: this.getAxisLabels().y,
        splitArea: {
          show: true,
        },
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: "horizontal",
        left: "center",
        top: "3%",
        inRange: {
          color: [
            "grey",
            "#238ca6",
            "#238ca6",
            "#238ca6",
            "#2f5991",
            "#2f5991",
            "#2f5991",
            "#a62723",
            "#a62723",
            "#a62723",
            "#ff0000",
          ],
        },
      },
      series: [
        {
          name: "Punch Card",
          type: "heatmap",
          data: this.getMatrixData(),
          label: {
            show: true,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  }
}
