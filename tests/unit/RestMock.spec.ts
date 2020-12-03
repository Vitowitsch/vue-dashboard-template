import { shallowMount } from "@vue/test-utils";
import { axios } from "../../src/api/axios_wrapper.js";


// This sets the mock adapter on the default instance

describe("Test REST Mocking API", () => {
  test("fetch mocked history", () => {
    
    axios
      .get(process.env.VUE_APP_SERVER_PREFIX + "/history", {})
      .then(response => {})
      .catch(error => {
        fail(error);
      });
  });
});

describe("Test REST Mocking API", () => {
  test("fetch time series for features", () => {
    axios
      .get(process.env.VUE_APP_SERVER_PREFIX + "/history_features", {})
      .then(response => {})
      .catch(error => {
        fail(error);
      });
  });
});
