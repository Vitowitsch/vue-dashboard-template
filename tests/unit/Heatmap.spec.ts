import { TableData } from "@/model/TableData";
import { HeatmapFilter } from "@/model/HeatmapFilter";
import { Heatmap } from "@/composables/useHeatmap";
import map from "lodash/map";

let testData = [
  new TableData(
    `60`,
    "origin1",
    "car0",
    "bogie",
    "axis",
    "component",
    "diagid",
    1,
    "mintime"
  ),
  new TableData(
    `60`,
    "origin2",
    "car0",
    "bogie",
    "axis",
    "component",
    "diagid",
    1,
    "mintime"
  ),
  new TableData(
    `60`,
    "origin1",
    "car1",
    "bogie",
    "axis",
    "component",
    "diagid",
    2,
    "maxtime"
  ),
  new TableData(
    `61`,
    "origin2",
    "car2",
    "bogie",
    "axis",
    "component",
    "diagid",
    2
  ),
];

let xs = new Set(map(testData, "objectid"));
let ys = new Set(map(testData, "origin"));

describe("Heatmap", () => {
  test("group", () => {
    let heatmap = new Heatmap(
      testData,
      new HeatmapFilter(false, xs, false, ys)
    );
    expect(heatmap.agg["60,origin1"]["lastResult_HS"]).toEqual(2);
  });

  test("group by x", () => {
    let heatmap = new Heatmap(
      testData,
      new HeatmapFilter(true, new Set(["60"]), false, ys)
    );
    expect(heatmap.agg["60/car0,origin1"]["lastResult_HS"]).toEqual(1);
  });

  test("group by y", () => {
    let heatmap = new Heatmap(
      testData,
      new HeatmapFilter(false, xs, true, new Set(["origin1"]))
    );
    expect(heatmap.agg["60,origin1/bogie/axis"]["lastResult_HS"]).toEqual(2);
  });

  test("get axis labels", () => {
    let heatmap = new Heatmap(
      testData,
      new HeatmapFilter(false, xs, false, ys)
    );
    expect(heatmap.getAxisLabels()["x"]).toEqual(["60", "61"]);
  });

  test("filter", () => {
    let heatmap = new Heatmap(
      testData,
      new HeatmapFilter(true, new Set(["61"]), false, ys)
    );
    // expect(filtered.length).toEqual(1);
  });
});
