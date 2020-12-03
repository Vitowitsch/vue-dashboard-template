import { ref } from "@/composition";

import {
  get as getTestData,
  getMovements as getTestMovements,
} from "@/../tests/data/ramsData";
const mock_data = getTestData();
import * as prep from "@/composables/useRamsPreprocessing";

var _data = undefined;
export var _movements = undefined;

export var dashboard_data_loaded = ref(false);

export async function getData() {
  if (_data === undefined) {
    if ("true" == process.env.VUE_APP_MOCK) {
      console.log("using mock data for dashboard");
      _data = mock_data;
    } else {
      let answer = await fetch(
        process.env.VUE_APP_SERVER_PREFIX + "/dashboard"
      );
      _data = await answer.json();
    }
    _data = prep.preprocess(_data);
  }
  return new Promise(function(resolve, reject) {
    resolve(_data);
  });
}

export async function getMovements() {
  if (_movements === undefined) {
    if ("true" == process.env.VUE_APP_MOCK) {
      console.log("using mock movement data");
      _movements = getTestMovements();
    } else {
      let answer = await fetch(
        process.env.VUE_APP_SERVER_PREFIX + "/movements"
      );
      _movements = await answer.json();
      console.log("movements loaded");
    }
  }
  return _movements;
}

export async function getAsyncMovements() {
  if (_movements === undefined) {
    if ("true" == process.env.VUE_APP_MOCK) {
      console.log("using mock movement data");
      _movements = getTestMovements();
    } else {
      let answer = await fetch(
        process.env.VUE_APP_SERVER_PREFIX + "/movements"
      );
      _movements = await answer.json();
      console.log("movements loaded");
    }
  }
  return new Promise(function(resolve, reject) {
    resolve(_movements);
  });
}
