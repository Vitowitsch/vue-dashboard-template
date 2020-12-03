import { ConfigProvider } from "@/composables/cfgProvider";

describe("Grouping / recursive construction", () => {
  test("enrich expected number of computation results", () => {
    let n = ConfigProvider.get_expected_outs(
      "AirSpringSystem",
      "EWA.92.32.MODULE.AIRSPRING"
    );
    expect(n).toBeLessThanOrEqual(1);

    n = ConfigProvider.get_expected_outs(
      "LowFreqBodyMotion",
      "EWA.91-EA.MODULE.ALL"
    );
    expect(n).toBeLessThanOrEqual(1);
  });


  test("test expected result for object", () => {
    let expected_outs = ConfigProvider.get_expected_by_object(
      new Set(["algo1"])
    );
    expect(expected_outs).toBeLessThanOrEqual(
      32 * Object.keys(ConfigProvider.expected_outcome).length
    );
  });

  test("test expected result for car", () => {
    let expected_outs = ConfigProvider.get_expected_by_object(
      new Set(["algo1"])
    );
    expect(expected_outs).toBeLessThanOrEqual(
      32 * Object.keys(ConfigProvider.expected_outcome).length
    );
  });
});
