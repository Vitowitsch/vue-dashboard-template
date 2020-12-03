import groupBy from "lodash/groupBy";
import * as useGrouping from "@/composables/useGrouping";
import * as useSunburst from "@/composables/useSunburst";

describe("Grouping / recursive construction", () => {
  test("assert first level ", () => {
    let testData = [{ value: 1, op: "op1" }, { value: 7, op: "op2" }];
    let ops = [useGrouping.byHs];
    let result = useSunburst.getData(testData, ops);
    expect(result[0].name).toEqual("available");
    expect(result[0].value).toEqual(1);
  });

  test("assert n -> n+1 ", () => {
    let testData = [
      { value: 1, op: "op1", objectid: "1" },
      { value: 7, op: "op2", objectid: "2" },
    ];
    let ops = [useGrouping.byHs, useGrouping.byOperator, useGrouping.byTrain];
    let result = useSunburst.getData(testData, ops);
    expect(result[0].value).toEqual(1);
    expect(result[1].value).toEqual(1);
    expect(result[0].children[0].name).toEqual("op1");
    expect(result[0].children[0].value).toEqual(1);
    expect(result[0].children[0].children[0].value).toEqual(1);
    expect(result[1].children[0].children[0].value).toEqual(1);
  });

  test("group by day correctness (bug reproduction) ", () => {
    let data = [
      {
        objectid: "462041",
        origin: "EmRailBrake",
        time: "2020-09-14T00:00:00.000+00:00",
        value: 1,
        moved: false,
      },
      {
        objectid: "462073",
        origin: "EmRailBrake",
        time: "2020-09-14T00:00:00.000+00:00",
        value: 1,
        moved: false,
      },
      {
        objectid: "462073",
        origin: "EmRailBrake",
        time: "2020-09-15T00:00:00.000+00:00",
        value: 1,
        moved: false,
      },
    ];

    let ops = [byDay];
    let result = useSunburst.getData(data, ops);
    expect(result[0].name).toEqual("2020-09-14");
    expect(result[0].value).toEqual(2);
    expect(result[1].name).toEqual("2020-09-15");
    expect(result[1].value).toEqual(1);
  });
});

function byDay(data) {
  return groupBy(data, function(o) {
    return o.time.slice(0, 10);
  });
}
