import * as usePie from "@/composables/usePie";
import * as useRamsMenu from "@/composables/useRamsMenu";
const moment = require("moment");

import { get as getTestData } from "../data/ramsData";
const data = getTestData(); //require("../data/rams_data.json");

describe("Average", () => {
  test("filter last days", () => {
    let mom = moment();
    let testData = {};
    testData[mom.subtract(1, "day").format("YYYY-MM-DD")] = 1;
    testData[mom.subtract(1, "day").format("YYYY-MM-DD")] = 2;
    testData[mom.subtract(1, "day").format("YYYY-MM-DD")] = 3;
    let lastTwo = usePie.getLastXDays(testData, 2);
    expect(Object.keys(lastTwo).length).toEqual(2);
  });

  // test("get avg", () => {
  //   let mom = moment();
  //   let testData = {};
  //   testData[mom.subtract(1, "day").format("YYYY-MM-DD")] = [
  //     {
  //       name: "x",
  //       value: 2,
  //     },
  //   ];
  //   testData[mom.subtract(1, "day").format("YYYY-MM-DD")] = [
  //     {
  //       name: "x",
  //       value: 2,
  //     },
  //   ];
  //   testData[mom.subtract(1, "day").format("YYYY-MM-DD")] = [
  //     {
  //       name: "x",
  //       value: 1,
  //     },
  //   ];
  //   let lastX = usePie.getLastXDays(testData, 2);
  //   let avg = usePie.getAverage(lastX);
  //   expect(avg[0]["value"]).toEqual(2);
  // });
});
