const moment = require("moment");
import { ref } from "@/composition";
import { ConfigProvider } from "@/composables/cfgProvider";
import * as useGrouping from "@/composables/useGrouping";
import * as useDashboardInit from "@/composables/useDashboardInit";
import _map from "lodash/map";
import _uniq from "lodash/uniq";
import _differenceWith from "lodash/differenceWith";
import _isEqual from "lodash/isEqual";
import _xor from "lodash/xor";

export var ignoreOutOfOperation = ref(true);
export var onCarLevel = ref(false);

export const classes = {
  R0: "0%",
  R1: "1%-24%",
  R2: "25%-49%",
  R3: "50%-74%",
  R4: "75%-99%",
  R5: "=100%",
};

export function getMileageRelevantDate(date) {
  // we need the mileage of the previous day. daily closing is usually at 22pm.
  // if it's delayed, we need the mileage two days ago
  let y = new Date();
  if (date.getHours() < 3) {
    y.setDate(date.getDate() - 1);
  } else {
    y.setDate(date.getDate() - 0);
  }
  const zeroPad = (num, places) => String(num).padStart(places, "0");
  return (
    y.getFullYear() +
    "-" +
    zeroPad(y.getMonth() + 1, 2) +
    "-" +
    zeroPad(y.getDate(), 2)
  );
}

export function getClassification(data, day) {
  let all_configured_objects = Object.keys(ConfigProvider.operators);
  let origins: Set<String> = new Set(_uniq(_map(data, "origin")));
  let objects_in_data = _uniq(_map(data, "objectid"));
  let missing_objects = _differenceWith(
    all_configured_objects,
    objects_in_data
  );

  let grouped;
  let expected_outs = ConfigProvider.get_expected_by_object(origins);

  if (onCarLevel.value) {
    grouped = useGrouping.byTrainAndCar(data);
    expected_outs /= 4;
  } else {
    grouped = useGrouping.byTrain(data);
  }

  let result = {};

  missing_objects.forEach((object_id) => {
    grouped[object_id] = [];
  });

  Object.entries(grouped).forEach(async ([x, y], index) => {
    let objectid;
    if (onCarLevel.value) {
      objectid = x.split("/")[0];
    } else {
      objectid = x;
    }
    let elem = { objectid: x, op: ConfigProvider.operators[objectid] };
    var yy: any = y;
    let key = "-1";
    if (ignoreOutOfOperation.value) {
      let moved = useDashboardInit._movements[objectid + " " + day];
      if (!moved) {
        key = classes.R5;
      }
    }
    if ("-1" === key) {
      let rel = yy.length / expected_outs;
      if (rel === 0) {
        key = classes.R0;
      } else if (rel < 0.25) {
        key = classes.R1;
      } else if (rel < 0.5) {
        key = classes.R2;
      } else if (rel < 0.75) {
        key = classes.R3;
      } else if (rel < 0.99) {
        key = classes.R4;
      } else {
        key = classes.R5;
      }
    }
    if (result[key]) {
      result[key].push(elem);
    } else {
      result[key] = [elem];
    }
  });
  return result;
}
