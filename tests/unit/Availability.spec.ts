import * as useGrouping from "@/composables/useGrouping";

import { get as getTestData } from "../data/ramsData";
const data = getTestData();

describe("Availabilty", () => {
  test("group by availabilty", () => {
    let testData = [{ value: 7 }, { value: 1 }];
    let grouped = useGrouping.byHs(testData);
    expect(grouped["available"].length).toEqual(1);
    expect(grouped["not_available"].length).toEqual(1);
  });


  test("create sunburst data", () => {
    let expected = [
      {
        name: "available",
        children: [
          {
            name: "db",
            children: [
              {
                name: "1",
                children: [
                  { name: "algo 1", value: 1 },
                  { name: "algo 2", value: 1 },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "not_available",
        children: [
          {
            name: "avenio",
            children: [{ name: "2", children: [{ name: "algo 2", value: 1 }] }],
          },
        ],
      },
    ];

    let testData = [
      { op: "db", objectid: "1", origin: "algo 1", value: 2 },
      { op: "db", objectid: "1", origin: "algo 2", value: 5 },
      { op: "avenio", objectid: "2", origin: "algo 2", value: 5 },
    ];

    let byOp = useGrouping.byOperator(testData);

    // expect(byOp.avenio.length).toEqual(3);
  });
});
