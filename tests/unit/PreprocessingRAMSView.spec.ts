require("jest-extended");
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();
import * as prep from "@/composables/useRamsPreprocessing";
import { ConfigProvider } from "@/composables/cfgProvider";
const moment = require("moment");

import { get as getTestData } from "../data/ramsData";
let data = getTestData(); //require("../data/rams_data.json");

let calendarData;

beforeAll(() => {
  var start = window.performance.now();
  calendarData = prep.preprocess(data);
  var end = window.performance.now();
  console.log(`setting up PreprocessingTest took: ${end - start} ms`);
});

describe("RAMS View", () => {
  test("enrich data (in place for performance reasons)", () => {
    expect(data[0].op).toEqual(expect.anything());
  });

  test("filter by date", () => {
    var start = window.performance.now();
    let time_filter = moment().format("YYYY-MM-DD");
    let filtered = prep.filter(data, [prep.time_condition(time_filter)]);
    var end = window.performance.now();
    console.log(`filtering by date  took: ${end - start} ms`);
    expect(filtered[0].time.substring(0, 10) === time_filter).toBeTruthy();
  });

  test("filter by date interval", () => {
    var start = window.performance.now();
    let now = new Date();
    let one_month_ago = new Date();
    one_month_ago.setMonth(now.getMonth() - 1);
    let testData = [
      { time: "2020-01-16" },
      { time: now.toISOString().slice(0, 10) },
    ];
    let filtered = prep.filter(testData, [prep.last_month_condition]);
    var end = window.performance.now();
    console.log(`filtering time interval took: ${end - start} ms`);
    expect(filtered.length).toEqual(1);
    let retrieved = new Date(filtered[0].time);
    expect(retrieved.getTime()).toBeGreaterThanOrEqual(one_month_ago.getTime());
    expect(retrieved.getTime()).toBeLessThanOrEqual(now.getTime());
  });

  test("remove object from array", () => {
    let testObject = [{ a: 1 }, { a: 2 }];
    delete testObject[1];
    expect(testObject.length).toEqual(2);
    expect(testObject[1]).toEqual(undefined);
  });

  test("filter by costs", () => {
    let filtered = prep.filter(data, [prep.cost_condition(prep.costs.cheap)]);
    expect(
      ConfigProvider.costs[filtered[0].origin].cost === prep.costs.cheap
    ).toBeTruthy();
  });

  test("filter maintenance cost expensive", () => {
    let filtered = prep.filter(data, [prep.cost_condition(prep.costs.cheap)]);
    expect(
      ConfigProvider.costs[filtered[0].origin].cost === prep.costs.cheap
    ).toBeTruthy();
  });

  test("filter by health state", () => {
    let filtered = prep.filter(data, [prep.hs_condition]);
    expect(filtered[0].value).toBeLessThan(7);
  });

  test("construct calendar data for availability", () => {
    let expected = [
      { name: "useRamsMenu", value: 1 },
      { name: "expensive", value: 1 },
    ];

    let one_day = prep.filter(data, [
      prep.time_condition(moment().format("YYYY-MM-DD")),
    ]);
    let cheap = prep.filter(data, [prep.cost_condition(prep.costs.cheap)]);
    let expensive = prep.filter(data, [
      prep.cost_condition(prep.costs.expensive),
    ]);

    var start = window.performance.now();
    // let byDay = prep.filterByDate(data, "2020-07-16");
    // expect(filtered[0].time.substring(0, 10) === "2020-07-16").toBeTruthy();
    var end = window.performance.now();
    // console.log(`filtering took: ${end - start} ms`);
  });

  test("construct sunburst maintenance data", () => {
    let expected = [
      { name: "cheap", value: 1 },
      { name: "expensive", value: 1 },
    ];
    let one_day = prep.filter(data, [
      prep.time_condition(moment().format("YYYY-MM-DD")),
    ]);
    let cheap = prep.filter(data, [prep.cost_condition(prep.costs.cheap)]);
    let expensive = prep.filter(data, [
      prep.cost_condition(prep.costs.expensive),
    ]);

    var start = window.performance.now();
    // let byDay = prep.filterByDate(data, "2020-07-16");
    // expect(filtered[0].time.substring(0, 10) === "2020-07-16").toBeTruthy();
    var end = window.performance.now();
    // console.log(`filtering took: ${end - start} ms`);
  });
});

//TODO next:
// - add tests for calendar data and finish calendar view (use a bisect function)
// - generate the JSON for the echarts in a new composable
// - add the view builder logic with tests for maintenance costs first
// - make the latest date the default sunburst
// - add update logic between calendar and maintenance costs
