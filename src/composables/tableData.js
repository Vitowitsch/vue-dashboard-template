const moment = require("moment");
import { get as getTestData } from "@/../tests/data/table_data";
const mock_data = getTestData();
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import _maxBy from "lodash/maxBy";
import _extend from "lodash/extend";
import _remove from "lodash/remove";
import * as useReliability from "@/composables/useReliability";
import * as useMovements from "@/composables/useDashboardInit";

var _data = {};

export var maxResultTime = "";
const upToDateOffset = 1 * 12 * 60 * 60 * 1000;

export function isUpToDate(date) {
  return date.valueOf() >= maxResultTime - upToDateOffset;
}

async function enrich(data) {
  calcMaxTime(data);
  addMovementInfo(data);
}

function calcMaxTime(data) {
  maxResultTime = Math.max(
    ...data.map((o) => {
      if (o.lastResultTime) {
        return new Date(o.lastResultTime).getTime();
      } else {
        return -1;
      }
    })
  );
}

async function addMovementInfo(data) {
  let movements = await useMovements.getAsyncMovements();
  let mileageDate;
  data = _map(data, (o) => {
    mileageDate = useReliability.getMileageRelevantDate(
      new Date(o.lastResultTime)
    );
    let key = o.objectid + " " + mileageDate;
    o["mileage"] = movements[key];
  });
}

async function get() {
  if (_isEmpty(_data)) {
    if ("true" == process.env.VUE_APP_MOCK) {
      console.log("using mock data for tables");
      _data = mock_data;
    } else {
      const response = await fetch(
        process.env.VUE_APP_SERVER_PREFIX + "/overview_full"
      );
      _data = await response.json();
      _remove(_data, function(d) {
        if (null == d["lastResultTime"]) {
          return true;
        }
        return false;
      });
    }
    enrich(_data);
  }
  return new Promise(function(resolve, reject) {
    resolve(_data);
  });
}

async function update_data(_this) {
  _this.rowData = await get();
}

export { update_data, get };
