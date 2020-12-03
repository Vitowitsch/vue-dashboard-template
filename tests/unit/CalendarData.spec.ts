import { get as getTestData } from "../data/ramsData";
import { RamsData } from "@/model/RamsData";
import * as prep from "@/composables/useRamsPreprocessing";

describe("Rams Test Data", () => {
  // test("import test data", () => {
  //   let raw = getTestData();
  //   let grouped_by_day = prep.preprocess(raw);
  //   console.log(grouped_by_day[Object.keys(grouped_by_day)[0]].length);
  //   let firstDayData = grouped_by_day[Object.keys(grouped_by_day)[0]];
  //   let secondDayData = grouped_by_day[Object.keys(grouped_by_day)[1]];
  //   let lastDayData =
  //     grouped_by_day[
  //       Object.keys(grouped_by_day)[Object.keys(grouped_by_day).length - 1]
  //     ];
  //   console.log(lastDayData.length);
  //   expect(firstDayData.length).toEqual(secondDayData.length);
  // });

  // test("reproduce data per day -bug", () => {
  //   let data = getTestData();
  //   expect(data[0]["objectid"]).toEqual("0");
  //   let d = new RamsData("", "", "", 1);
  //   d.disp();
  // });

  test("build timeline data", () => {
    let input = {
      "2020-08-18": [
        {
          objectid: "0",
          origin: "0_origin",
          time: "2020-08-18T07:08:33.699Z",
          value: 1,
          op: "op1",
          cost: "expensive",
          expected: 32,
          system_function: true,
        },
        {
          objectid: "16",
          origin: "16_origin",
          time: "2020-08-18T09:52:02.026Z",
          value: 4,
          op: "op1",
          cost: "expensive",
          expected: 32,
          system_function: true,
        },
      ],
      "2020-08-19": [
        {
          objectid: "1",
          origin: "0_origin",
          time: "2020-08-18T07:08:33.699Z",
          value: 1,
          op: "op1",
          cost: "expensive",
          expected: 32,
          system_function: true,
        },
        {
          objectid: "6",
          origin: "16_origin",
          time: "2020-08-18T09:52:02.026Z",
          value: 4,
          op: "op1",
          cost: "expensive",
          expected: 32,
          system_function: true,
        },
      ],
    };
    let data = getTestData();
    expect(data[0]["objectid"]).toEqual("460");
    let d = new RamsData("", "", "", "", 1);
    d.disp();
  });
});
