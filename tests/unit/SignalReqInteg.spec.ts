import { shallowMount } from "@vue/test-utils";
import { axios } from "../../src/api/axios_wrapper.js";
import { Logger } from "ag-grid-community";

function build_req(_train, _car, _features) {
  return { train: _train, car: _car, signals: _features };
}


describe("Test REST Mocking API", () => {
  test("fetch time series for features", () => {
    axios.defaults.timeout = 180000;
    jest.setTimeout(30000);
    let r = build_req("462019", "EWA", [
      "beta_ayu_21_EN14363_G_negDir",
      "RMSE_ayu_31_Stability_negDir",
    ]);
    //return
     axios
      .post(process.env.VUE_APP_SERVER_PREFIX + "/signals", r)
      .then((response) => {
      })
      .catch((error) => {
        fail(error);
      });
  });
});
